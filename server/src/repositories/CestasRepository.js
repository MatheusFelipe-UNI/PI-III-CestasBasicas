const { Association, Op } = require("sequelize");
const { Cestas, sequelize, Itens_cestas, Produtos } = require("../models");

async function getAllCestas() {
    const allCestas = await Cestas.findAll();
    return allCestas;
}

async function getAllActiveCestas() {
    const allActiveCestas = await Cestas.findAll({
        where: {
            status: "ATIVO"
        },
        attributes: [
            "id",
            "nome_cesta",
            "status",
            "quantidade",
            "preco",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Cestas.created_at"), "%d-%m-%Y %H:%i:%s"),
                "created_at",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Cestas.updated_at"), "%d-%m-%Y %H:%i:%s"),
                "updated_at",
            ],
        ]
    })
    return allActiveCestas;
}

async function getAllInactiveCestas() {
    const allInactiveCestas = await Cestas.findAll({
        where: {
            status: "INATIVO"
        },
        attributes: [
            "id",
            "nome_cesta",
            "status",
            "quantidade",
            "preco",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Cestas.created_at"), "%d-%m-%Y %H:%i:%s"),
                "created_at",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Cestas.updated_at"), "%d-%m-%Y %H:%i:%s"),
                "updated_at",
            ],
        ]
    })
    return allInactiveCestas;
}

async function getAllActiveCestasByFilterAndOrderBy(whereClause, orderFilters, attributesFilters) {
    const cesta = await Cestas.findAll({
        where: whereClause,
        attributes: attributesFilters,
        order: orderFilters
    });
    return cesta;
}


async function findAllCestasForSelect(idExcludesCollection = []) {
    const cesta = await Cestas.findAll({
        attributes: [
            [sequelize.col("id"), "value"],
            [sequelize.col("nome_cesta"), "label"]
        ],
        where: {
            status: "ATIVO",
            id: {
                [Op.notIn]: idExcludesCollection
            }
        }
    });

    return cesta;
}

async function getCestaById(idCesta) {
    const cestaID = await Cestas.findByPk(idCesta, {
        include: [{
            association: "itens_cesta",
            include: {
                association: "produtos_cesta",
                attributes: []
            },
            attributes: [
                [sequelize.literal("`itens_cesta->produtos_cesta`.`nome_produto`"), "nome_produto"],
                [sequelize.literal("`itens_cesta->produtos_cesta`.`tipo_unidade`"), "tipo_unidade"],
                [sequelize.literal("`itens_cesta->produtos_cesta`.`quantidade_estoque`"), "quantidade_estoque"],
                "quantidade_solicitada"
            ]
        }]
    });
    return cestaID;
}

async function createCesta(cestaData) {
    const t = await sequelize.transaction();

    try {
        const newCesta = await Cestas.create({
            nome_cesta: cestaData.nome_cesta,
            preco: cestaData.preco,
            quantidade: cestaData.quantidade,
            itens_cesta: cestaData.itens_cesta,
            status: "ATIVO"
        }, {
            include: [{
                association: "itens_cesta"
            }],
            transaction: t
        });

        await t.commit();
        return newCesta;

    } catch (error) {
        console.log(error);
        await t.rollback();
    }
}

async function changeCestaStatus(idCesta, newStatus) {
    const updateCesta = await Cestas.update({ status: newStatus }, {
        where: {
            id: idCesta
        }
    });
    return updateCesta
}

async function updateCesta(id, updateFields, itens_cesta) {
    const t = await sequelize.transaction();

    try {
        if (Object.keys(updateFields).length > 0) {
            await Cestas.update(updateFields, {
                where: { id: id },
                transaction: t
            });
        }

        if (itens_cesta && itens_cesta.length > 0) {
            await Itens_cestas.destroy({
                where: { fk_id_cesta: id },
                transaction: t
            });

            const newItens = itens_cesta.map((item) => {
                return {
                    fk_id_cesta: id,
                    fk_id_produto: item.fk_id_produto,
                    quantidade: item.quantidade
                };
            });
            await Itens_cestas.bulkCreate(newItens, { transaction: t });
        }

        await t.commit();
        return [1];

    } catch (error) {
        console.log(error);
        await t.rollback();
    }
}

/*
========================================================
                     Itens Cestas
========================================================
*/

async function getAllCestasItens(idItens) {
    const allCestasItens = await Cestas.findAll({
        include: [{
            association: "itens_cesta"
        }]
    });
    return allCestasItens;
}

async function getAllCestasItensByCestaId(idCesta) {
    const allCestas = await Itens_cestas.findAll({
        where: { fk_id_cesta: idCesta }
    });
    return allCestas
}

async function getCestaItemById(idItem) {
    const itensCesta = await Itens_cestas.findByPk(idItem);
    return itensCesta;
}

module.exports = {
    getAllCestas,
    getAllActiveCestas,
    getAllInactiveCestas,
    getCestaById,
    getAllActiveCestasByFilterAndOrderBy,
    findAllCestasForSelect,
    createCesta,
    changeCestaStatus,
    updateCesta,
    // Itens cesta
    getAllCestasItens,
    getAllCestasItensByCestaId,
    getCestaItemById,
}