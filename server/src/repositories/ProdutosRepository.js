const { Produtos, sequelize } = require("../models");
const { Op } = require("sequelize")

async function getAllProdutos() {
    const allProducts = await Produtos.findAll();
    return allProducts
}

async function getAllActiveProdutos() {
    const allActiveProdutos = await Produtos.findAll({
        where: {
            status: "ATIVO"
        },
        attributes: [
            "id",
            "nome_produto",
            "tipo_unidade",
            "quantidade_estoque",
            "estoque_minimo",
            [sequelize.fn("DATE_FORMAT", sequelize.col("Produtos.created_at"), "%d-%m-%Y %H:%i:%s"), "created_at",],
            [sequelize.fn("DATE_FORMAT", sequelize.col("Produtos.updated_at"), "%d-%m-%Y %H:%i:%s"), "updated_at",],
        ],
    });
    return allActiveProdutos
}

async function getAllInactiveProdutos() {
    const allInactiveProdutos = await Produtos.findAll({
        where: {
            status: "INATIVO"
        },
        attributes: [
            "id",
            "nome_produto",
            "tipo_unidade",
            "quantidade_estoque",
            "estoque_minimo",
            [sequelize.fn("DATE_FORMAT", sequelize.col("Produtos.created_at"), "%d-%m-%Y %H:%i:%s"), "created_at",],
            [sequelize.fn("DATE_FORMAT", sequelize.col("Produtos.updated_at"), "%d-%m-%Y %H:%i:%s"), "updated_at",],
        ],
    });
    return allInactiveProdutos
}

async function getAllActiveProdutosByFilterAndOrderBy(filters, validOrderBy) {
    const whereClause = { status: "ATIVO" };
    
    const { nome_produto, order_direction = "DESC" } = filters;

    // Filtra com base no nome do produto
    if (nome_produto) {
        whereClause.nome_produto = {
            [Op.like]: `%${nome_produto}%`
        };
    }

    const orderDir = (order_direction).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const orderFilters = [[validOrderBy, orderDir]];

    const attributesFilters = [
        "id",
        "nome_produto",
        "tipo_unidade",
        "quantidade_estoque",
        "estoque_minimo",
        [sequelize.fn("DATE_FORMAT", sequelize.col("Produtos.created_at"), "%d-%m-%Y %H:%i:%s"), "created_at"],
        [sequelize.fn("DATE_FORMAT", sequelize.col("Produtos.updated_at"), "%d-%m-%Y %H:%i:%s"), "updated_at"],
    ];

    const produtos = await Produtos.findAll({
        where: whereClause,
        attributes: attributesFilters,
        order: orderFilters
    });
    
    return produtos;
}

async function findAllProdutosForSelect(idExcludesCollection = []) {
    const produtos = await Produtos.findAll({
        attributes: [
            [sequelize.col("id"), "value"], 
            [sequelize.col("nome_produto"), "label"]
        ],
        where: {
            status: "ATIVO",
            id: {
                [Op.notIn]: idExcludesCollection
            }
        }
    });

    return produtos;
}

async function getProdutoById(idProduto) {
    const produto = await Produtos.findByPk(idProduto);
    return produto;
}

async function changeProdutoStatus(idProduto, newStatus) {
    const rowAffected = await Produtos.update({ status: newStatus}, {
        where: {
            id: idProduto
        }
    });
    return rowAffected;
}

async function createProduto(produtoData) {
    const newProduto = Produtos.create(produtoData);
    return newProduto;
}

async function updateProduto(id, updateFields) {
    const rowAffected = await Produtos.update(updateFields, {
        where: {
            id: id
        }
    });
    return rowAffected;
}

module.exports = {
    getAllProdutos,
    getAllActiveProdutos,
    getAllInactiveProdutos,
    getAllActiveProdutosByFilterAndOrderBy,
    findAllProdutosForSelect,
    getProdutoById,
    changeProdutoStatus,
    createProduto,
    updateProduto,
}