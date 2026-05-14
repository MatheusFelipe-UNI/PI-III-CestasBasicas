const CannotCreateError = require("../classes/CannotCreateError");
const ExistsDataError = require("../classes/ExistsDataError");
const CannotupdateError = require("../classes/CannotUpdateError");
const {
    getAllLotesProdutos,
    getAllActiveLotesProdutos,
    getAllInactiveLotesProdutos,
    getAllActiveLotesProdutosByFilterAndOrderBy,
    getAllLotesProdutosByFornecedor,
    getLoteProdutoById,
    getAllLotesProdutosByProduto,
    getAllActiveLotesProdutosByProduto,
    getAllInactiveLotesProdutosByProduto,
    getAllActiveLotesProdutosByProdutoWithFilterAndOrderBy,
    createLoteProduto,
    updateLoteProduto,
    changeLoteProdutoStatus,
    incrementProdutoEstoque,
    decrementProdutoEstoque,
} = require("../repositories/LotesProdutosRepository");
const { createEntradaProdutoService } = require ("../services/EntradasServices")
const FieldUndefinedError = require("../classes/FieldUndefinedError");
const { sequelize } = require("../models");

async function getAllLotesProdutosService() {
    const allLotesProdutos = await getAllLotesProdutos();
    return allLotesProdutos;
}

async function getAllActiveLotesProdutosService() {
    const allActiveLotesProdutos = await getAllActiveLotesProdutos();
    return allActiveLotesProdutos;
}

async function getAllInactiveLotesProdutosService() {
    const allInactiveLotesProdutos = await getAllInactiveLotesProdutos();
    return allInactiveLotesProdutos;
}

async function getAllActiveLotesProdutosByFilterAndOrderByService(orderBy, filterOptions) {
    let filters = {};
    if (filterOptions) {
        try {
            filters = typeof filterOptions === 'string' ? JSON.parse(filterOptions) : filterOptions;
        } catch (error) {
            filters = {};
        }
    }

    const allowedOrderFields = ['id', 'produtos', 'fk_id_fornecedor', 'valor_unitario', 'qtd_disponivel', 'data_validade', 'created_at', 'updated_at'];
    const validOrderBy = allowedOrderFields.includes(orderBy) ? orderBy : 'created_at';

    return await getAllActiveLotesProdutosByFilterAndOrderBy(filters, validOrderBy);
}

async function getAllLotesProdutosByFornecedorService(idFornecedor) {
    const lotesByFornecedor = await getAllLotesProdutosByFornecedor(idFornecedor);
    return lotesByFornecedor
}

async function getLoteProdutoByIdService(idLoteProduto) {
    const idLote = await getLoteProdutoById(idLoteProduto);
    return idLote
}

async function getAllLotesProdutosByProdutoService(idProduto) {
    const lotesByProduto = await getAllLotesProdutosByProduto(idProduto);
    return lotesByProduto
}

async function getAllActiveLotesProdutosByProdutoService(idProduto) {
    const activeLotesByProduto = await getAllActiveLotesProdutosByProduto(idProduto);
    let formattedData = JSON.parse(JSON.stringify(activeLotesByProduto));
    const newActiveLotesByProduto = formattedData.map(lote => ({
        id: lote.id,
        nome_produto: lote.nome_produto,
        nome_fornecedor: lote.nome_fornecedor,
        tipo_unidade: lote.tipo_unidade,
        qtd_disponivel: lote.qtd_disponivel,
        valor_unitario: lote.valor_unitario,
        is_vencido: lote.is_vencido,
        data_vencimento: lote.data_vencimento,
        data_criacao: lote.data_criacao,
        data_alteracao: lote.data_alteracao
    }));
    return newActiveLotesByProduto
}

async function getAllInactiveLotesProdutosByProdutoService(idProduto) {
    const inactiveLotesByProduto = await getAllInactiveLotesProdutosByProduto(idProduto);
    let formattedData = JSON.parse(JSON.stringify(inactiveLotesByProduto));
    const newInactiveLotesByProduto = formattedData.map(lote => ({
        id: lote.id,
        nome_produto: lote.nome_produto,
        nome_fornecedor: lote.nome_fornecedor,
        tipo_unidade: lote.tipo_unidade,
        qtd_disponivel: lote.qtd_disponivel,
        valor_unitario: lote.valor_unitario,
        is_vencido: lote.is_vencido,
        data_vencimento: lote.data_vencimento,
        data_criacao: lote.data_criacao,
        data_alteracao: lote.data_alteracao
    }));
    return newInactiveLotesByProduto
}

async function getAllActiveLotesProdutosByProdutoWithFilterAndOrderByService(idProduto, { orderBy, filterOptions }) {
    let filters = {};
    if (filterOptions) {
        try {
            filters = typeof filterOptions === 'string' ? JSON.parse(filterOptions) : filterOptions;
        } catch (error) {
            filters = {};
        }
    }

    const allowedOrderFields = ['id', 'fk_id_fornecedor', 'valor_unitario', 'qtd_disponivel', 'data_validade', 'created_at', 'updated_at'];
    const validOrderBy = allowedOrderFields.includes(orderBy) ? orderBy : 'created_at';

    return await getAllActiveLotesProdutosByProdutoWithFilterAndOrderBy(idProduto, filters, validOrderBy);
}

async function createLoteProdutoService(loteProdutoData) {
    const { id_user, fk_id_produto, fk_id_fornecedor, valor_unitario, qtd_disponivel, data_validade} = loteProdutoData
    const hoje = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const dataValidade = new Date(loteProdutoData.data_validade);
    const dataHoje = new Date(hoje);

    if(dataValidade <= dataHoje) {
        throw new CannotCreateError ("O lote não pode ser criado com prazo de validade igual ou inferior ao dia de hoje");
    }
    
    const t = await sequelize.transaction();
    try {
        const createdLote = await createLoteProduto({
            fk_id_produto,
            fk_id_fornecedor,
            valor_unitario,
            qtd_disponivel,
            data_validade,
            status: "ATIVO",
            is_vencido:0
        }, t);

        await incrementProdutoEstoque(fk_id_produto, qtd_disponivel, t);

        await createEntradaProdutoService({
            fk_id_user: id_user,
            itens_entrada:[{
                fk_id_produto,
                fk_id_fornecedor,
                quantidade_adquirida:qtd_disponivel
            }]
        }, t);

        await t.commit();
        return createdLote;
    } catch (error) {
        await t.rollback();
        console.log(error);
    }
}

async function updateLoteProdutoService(id, lotesData) {
    const { id_fornecedor, valor_unitario, qtd_disponivel, data_validade, is_vencido } = lotesData
    const lote = await getLoteProdutoByIdService(id);
    const hoje = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' });

    if (!lote) {
        throw new ExistsDataError ("Lote não localizado!")
    }

    if(data_validade && data_validade <= hoje) {
        throw new CannotupdateError ("O lote não pode ser editado usando um prazo de validade inferior ao dia de hoje");
    }

    const statusAtual = lote.status;
    let newStatus = statusAtual;
     if (Number(is_vencido) === 1) {
        newStatus = "INATIVO";
    }

    const idProduto = lote.fk_id_produto;
    const currentQtd = lote.qtd_disponivel;

    if (statusAtual == "ATIVO" && newStatus == "INATIVO"){
        await decrementProdutoEstoque(idProduto, currentQtd);
    }

    if (statusAtual === "ATIVO" && newStatus === "ATIVO") {
        const newQtd = qtd_disponivel !== undefined ? Number(qtd_disponivel) : currentQtd;
        if (newQtd !== currentQtd) {
            const diff = newQtd - currentQtd;
            if (diff > 0) {
                await incrementProdutoEstoque(idProduto, diff);
            } else if (diff < 0) {
                await decrementProdutoEstoque(idProduto, Math.abs(diff));
            }
        }
    }

    const updateFields = {};
    if (is_vencido !== undefined) updateFields.is_vencido = is_vencido;
    if (id_fornecedor !== undefined) updateFields.fk_id_fornecedor = id_fornecedor;
    if (valor_unitario !== undefined) updateFields.valor_unitario = valor_unitario;
    if (qtd_disponivel !== undefined) updateFields.qtd_disponivel = Number(qtd_disponivel);
    if (data_validade !== undefined) updateFields.data_validade = data_validade;

    if (newStatus !== statusAtual) {
        updateFields.status = newStatus;
    }

    return await updateLoteProduto(id, updateFields)
}

async function changeLoteProdutoStatusService(id, newStatus) {
    const lote = await getLoteProdutoByIdService(id)
    const formattedNewStatus = newStatus.toUpperCase();

    if (!lote){
        throw new ExistsDataError("Lote de Produto não localizado!")
    }

    if (formattedNewStatus !== "ATIVO" && formattedNewStatus !== "INATIVO") {
        throw new FieldUndefinedError ("Utilize ATIVO ou INATIVO")
    }

        const statusAtual = lote.status;
    if (formattedNewStatus == statusAtual) {
        throw new ExistsDataError(`Este lote já se encontra com o status: ${formattedNewStatus}`);
    }

    if (statusAtual == "ATIVO" && formattedNewStatus == "INATIVO"){
        await decrementProdutoEstoque(lote.fk_id_produto, lote.qtd_disponivel);
    } else if (statusAtual == "INATIVO" && formattedNewStatus == "ATIVO") {
        await incrementProdutoEstoque(lote.fk_id_produto, lote.qtd_disponivel);
    }

    const updateStatus = await changeLoteProdutoStatus (id, formattedNewStatus);
    return updateStatus;
}

module.exports = {
    getAllLotesProdutosService,
    getAllActiveLotesProdutosService,
    getAllInactiveLotesProdutosService,
    getAllActiveLotesProdutosByFilterAndOrderByService,
    getAllLotesProdutosByFornecedorService,
    getLoteProdutoByIdService,
    getAllLotesProdutosByProdutoService,
    getAllActiveLotesProdutosByProdutoService,
    getAllInactiveLotesProdutosByProdutoService,
    getAllActiveLotesProdutosByProdutoWithFilterAndOrderByService,
    createLoteProdutoService,
    updateLoteProdutoService,
    changeLoteProdutoStatusService,
}