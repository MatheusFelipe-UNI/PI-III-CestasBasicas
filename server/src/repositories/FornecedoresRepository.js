const { Fornecedores, sequelize } = require("../models");
const { Op } = require("sequelize")

async function getAllFornecedores() {
    const allFornecedores = await Fornecedores.findAll();
    return allFornecedores
}

async function getAllActiveFornecedores() {
    const allActiveFornecedores = await Fornecedores.findAll({
        where: {
            status: "ATIVO"
        },
        attributes: [
            "id",
            "nome_fornecedor",
            "cnpj",
            [sequelize.fn("DATE_FORMAT", sequelize.col("Fornecedores.created_at"), "%d-%m-%Y %H:%i:%s"), "created_at",],
            [sequelize.fn("DATE_FORMAT", sequelize.col("Fornecedores.updated_at"), "%d-%m-%Y %H:%i:%s"), "updated_at",],
        ],
    });
    return allActiveFornecedores
}

async function getAllInactiveFornecedores() {
    const allInactiveFornecedores = await Fornecedores.findAll({
        where: {
            status: "INATIVO"
        },
        attributes: [
            "id",
            "nome_fornecedor",
            "cnpj",
            [sequelize.fn("DATE_FORMAT", sequelize.col("Fornecedores.created_at"), "%d-%m-%Y %H:%i:%s"), "created_at",],
            [sequelize.fn("DATE_FORMAT", sequelize.col("Fornecedores.updated_at"), "%d-%m-%Y %H:%i:%s"), "updated_at",],
        ],
    });
    return allInactiveFornecedores
}

async function getAllActiveFornecedoresByFilterAndOrderBy(filters, validOrderBy) {
    const whereClause = { status: "ATIVO" };

    const { nome_fornecedor, cnpj, order_direction = "DESC" } = filters;

    // Filtra com base no nome do Fornecedor
    if (nome_fornecedor) {
        whereClause.nome_fornecedor = {
            [Op.like]: `%${nome_fornecedor}%`
        };
    }

    // Filtra com base no cnpj do fornecedor
    if (cnpj) {
        whereClause.cnpj = {
            [Op.like]: `%${cnpj}%`
        };
    }

    const orderDir = (order_direction).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const orderFilters = [[validOrderBy, orderDir]];

    const attributesFilters = [
        "id",
        "nome_fornecedor",
        "cnpj",
        [sequelize.fn("DATE_FORMAT", sequelize.col("Fornecedores.created_at"), "%d-%m-%Y %H:%i:%s"), "created_at",],
        [sequelize.fn("DATE_FORMAT", sequelize.col("Fornecedores.updated_at"), "%d-%m-%Y %H:%i:%s"), "updated_at",],
    ];

    const filteredFornecedores = await Fornecedores.findAll({
        where: whereClause,
        attributes: attributesFilters,
        order: orderFilters
    });

    return filteredFornecedores;
}

async function getFornecedorById(idFornecedor) {
    const Fornecedor = await Fornecedores.findByPk(idFornecedor);
    return Fornecedor;
}

async function changeFornecedorestatus(idFornecedor, newStatus) {
    const rowAffected = await Fornecedores.update({ status: newStatus }, {
        where: {
            id: idFornecedor
        }
    });
    return rowAffected;
}

async function createFornecedor(fornecedorData) {
    const newFornecedor = Fornecedores.create(fornecedorData);
    return newFornecedor;
}

async function getFornecedorByCNPJ(cnpj) {
    const fornecedor = await Fornecedores.findOne({
        where: { 
            cnpj: cnpj
        }
    });
    return fornecedor;
}

async function updateFornecedor(id, updateFields) {
    const rowAffected = await Fornecedores.update(updateFields, {
        where: {
            id: id
        }
    });
    return rowAffected;
}

module.exports = {
    getAllFornecedores,
    getAllActiveFornecedores,
    getAllInactiveFornecedores,
    getAllActiveFornecedoresByFilterAndOrderBy,
    getFornecedorById,
    getFornecedorByCNPJ,
    changeFornecedorestatus,
    createFornecedor,
    updateFornecedor,
}