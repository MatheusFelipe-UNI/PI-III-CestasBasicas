const { getAllCestas,
    getAllActiveCestas,
    getAllInactiveCestas,
    getCestaById,
    getAllActiveCestasByFilterAndOrderBy,
    createCesta,
    changeCestaStatus,
    updateCesta,
    //Itens cestas
    getAllCestasItens,
    getAllCestasItensByCestaId,
    getCestaItemById,
    findAllCestasForSelect,
} = require("../repositories/CestasRepository.js");
const { getProdutoByIdService, } = require("../services/ProdutosServices.js");
const { getAllActiveLotesProdutosByProdutoOrderByValidade } = require("../repositories/LotesProdutosRepository.js");
const { Op } = require("sequelize");
const { Cestas, sequelize, Itens_cestas, Produtos, Lotes_produtos } = require("../models");
const NotFoundError = require("../classes/NotFoundError.js");
const ExistsDataError = require("../classes/ExistsDataError.js");


async function getAllCestasService() {
    const allCestas = await getAllCestas();
    return allCestas;
}

async function getAllActiveCestasService() {
    const allActiveCestas = await getAllActiveCestas();
    return allActiveCestas;
}

async function getAllInactiveCestasService() {
    const allInactiveCestas = await getAllInactiveCestas();
    return allInactiveCestas;
}

async function getAllActiveCestasByFilterAndOrderByService(filterParams) {
    const {
        nome_cesta,
        preco_min,
        preco_max,
        order_by = "created_at",
        order_direction = "DESC"
    } = filterParams;

    const whereClause = {
        status: "ATIVO"
    };

    // Filtro com base no nome da cesta
    if (nome_cesta) {
        whereClause.nome_cesta = {
            [Op.like]: `%${nome_cesta}%`
        };
    }

    // Filtro baseado nos valores da cesta, o usuário deve escolher o valor minimo e o valor máximo
    if (preco_min || preco_max) {
        whereClause.preco = {};
        if (preco_min) whereClause.preco[Op.gte] = preco_min;
        if (preco_max) whereClause.preco[Op.lte] = preco_max;

    }

    const allowedOrderFields = ['id', 'nome_cesta', 'preco', 'quantidade', 'created_at', 'updated_at'];
    const orderField = allowedOrderFields.includes(order_by) ? order_by : 'id';
    const orderDir = order_direction.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const orderFilters = [[orderField, orderDir]];

    const attributesFilters = [
        "id",
        "nome_cesta",
        "preco",
        "quantidade",
        "status",
        [
            sequelize.fn("DATE_FORMAT", sequelize.col("Cestas.created_at"), "%d-%m-%Y %H:%i:%s"),
            "created_at",
        ],
        [
            sequelize.fn("DATE_FORMAT", sequelize.col("Cestas.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
        ],
    ];

    const filteredCestas = await getAllActiveCestasByFilterAndOrderBy(whereClause, orderFilters, attributesFilters);
    return filteredCestas;
}

async function getAllCestasForSelectService(idExcludes) {
    const allCestas = await findAllCestasForSelect(idExcludes);
    return allCestas;
}

async function getCestaByIdService(idCesta) {
    const cestaID = await getCestaById(idCesta);
    return cestaID
}

/*
============================================================================
                     Atualiza a tabela produtos e Lotes_produtos 
                            conforme uso em cestas
============================================================================
*/


async function attEstoqueProduto(produtoid, quantidade, transaction) {
    if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
        throw new Error("Erro de cálculo")
    }
    const produto = await Produtos.findOne({ where: { id: produtoid, status: "ATIVO" }, transaction });

    if (!produto) {
        throw new NotFoundError("Produto não localizado")
    }
    if (produto.quantidade_estoque < quantidade) {
        throw new Error(`Estoque insuficiente do produto: ${produto.nome_produto}`)
    }

    const lotes = await getAllActiveLotesProdutosByProdutoOrderByValidade(produtoid, transaction);

    let quantidadeProdutoCesta = quantidade;
    for (const lote of lotes) {
        if (quantidadeProdutoCesta <= 0) break;

        const debito = Math.min(lote.qtd_disponivel, quantidadeProdutoCesta);
        const newQtd = lote.qtd_disponivel - debito;

        await lote.update({ qtd_disponivel: newQtd }, { transaction });
        quantidadeProdutoCesta -= debito;

        if (newQtd === 0) {
            await lote.update({ status: "INATIVO" }, { transaction });
        }
    }

    const currentEstoque = await Lotes_produtos.sum('qtd_disponivel', {
        where: {
            fk_id_produto: produtoid,
            status: "ATIVO"
        },
        transaction
    });
    await produto.update({ quantidade_estoque: currentEstoque }, { transaction });
}

async function devolveEstoqueProduto(produtoid, quantidade, transaction) {
    if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
        throw new Error("Erro de cálculo");
    }
    const produto = await Produtos.findOne({ where: { id: produtoid, status: "ATIVO" }, transaction });
    if (!produto) {
        throw new NotFoundError("Produto não localizado para devolução");
    }

    const newEstoque = produto.quantidade_estoque + quantidade;
    await produto.update({ quantidade_estoque: newEstoque }, { transaction });
}


/*
============================================================================
                     Atualiza a tabela produtos e Lotes_produtos 
                            conforme uso em cestas
============================================================================
*/


async function createCestaService(cestaData) {
    const t = await sequelize.transaction();

    try {

        const newCesta = await createCesta(cestaData, t);

        for (const item of cestaData.itens_cesta) {
            const qtdItem = item.quantidade_solicitada || item.quantidade;
            const quantidadeTotal = item.quantidade_solicitada * cestaData.quantidade;
            await attEstoqueProduto(item.fk_id_produto, quantidadeTotal, t);
        }
        await t.commit();
        return newCesta;
    } catch (error) {
        console.log(error);
        await t.rollback();
    }
}


async function changeCestaStatusService(idCesta, newStatus) {
    const formattedNewStatus = newStatus.toUpperCase();
    const cesta = await getCestaByIdService(idCesta);

    if (!cesta) {
        throw new NotFoundError("Cesta não localizada!");
    }

    if (formattedNewStatus !== "ATIVO" && formattedNewStatus !== "INATIVO") {
        throw new ExistsDataError("Utilize ATIVO ou INATIVO")
    }

    const statusAtual = cesta.status;
    if (formattedNewStatus == statusAtual) {
        throw new ExistsDataError(`Esta cesta já está: ${formattedNewStatus}`);
    }

    const changeStatus = await changeCestaStatus(idCesta, formattedNewStatus);
    return changeStatus
}

async function updateCestaService(id, cestaData) {
    const { nome_cesta, preco, quantidade, itens_cesta } = cestaData;
    const cesta = await getCestaByIdService(id);

    if (!cesta) {
        throw new NotFoundError("Cesta não localizado!");
    }

    const currentItens = await getAllCestasItensByCestaId(id);
    const t = await sequelize.transaction();

    try {
        if (quantidade !== undefined && quantidade !== cesta.quantidade) {
            const diffCestas = quantidade - cesta.quantidade;

            for (const item of currentItens) {
                const qtdItemCesta = item.quantidade_solicitada || item.quantidade;
                const diffItens = Math.abs(diffCestas) * qtdItemCesta;


                if (diffCestas > 0) {
                    await attEstoqueProduto(item.fk_id_produto, diffItens, t);
                } else {
                    await devolveEstoqueProduto(item.fk_id_produto, diffItens, t);
                }
            }
        }

        const updateFields = {};
        if (nome_cesta !== undefined) updateFields.nome_cesta = nome_cesta;
        if (preco !== undefined) updateFields.preco = preco;
        if (quantidade !== undefined && quantidade !== "") updateFields.quantidade = quantidade;

        const result = await updateCesta(id, updateFields, itens_cesta, t);
        await t.commit();
        return result;

    } catch (error) {
        if (t && !t.finished) {
            await t.rollback();
        }
        throw error;
    }
}

/*
========================================================
                     Itens Cestas
========================================================
*/

async function getAllCestasItensService(idCesta) {
    const allCestasItens = await getAllCestasItens(idCesta);
    return allCestasItens;
}

async function getAllCestasItensByCestaIdService(idCesta) {
    const itensByCesta = await getAllCestasItensByCestaId(idCesta);
    return itensByCesta;
}

async function getCestaItemByIdService(idItem) {
    const cestaItem = await getCestaItemById(idItem);
    return cestaItem;
}

module.exports = {
    getAllCestasService,
    getAllActiveCestasService,
    getAllInactiveCestasService,
    getCestaByIdService,
    getAllActiveCestasByFilterAndOrderByService,
    getAllCestasForSelectService,
    createCestaService,
    changeCestaStatusService,
    updateCestaService,
    //Itens cestas
    getAllCestasItensService,
    getAllCestasItensByCestaIdService,
    getCestaItemByIdService,
}