const ExistsDataError = require("../classes/ExistsDataError");
const NotFoundError = require("../classes/NotFoundError");
const { getProdutoById,
    getAllProdutos,
    getAllActiveProdutos,
    getAllInactiveProdutos,
    getAllActiveProdutosByFilterAndOrderBy,
    changeProdutoStatus,
    createProduto,
    updateProduto,
} = require("../repositories/ProdutosRepository");


async function getAllProdutosService() {
    const allProducts = await getAllProdutos();
    return allProducts;
}

async function getAllActiveProdutosService() {
    const allActiveProdutos = await getAllActiveProdutos();
    return allActiveProdutos;
}

async function getAllInactiveProdutosService() {
    const allInactiveProdutos = await getAllInactiveProdutos();
    return allInactiveProdutos;
}

async function getProdutoByIdService(idProduto) {
    const produto = await getProdutoById(idProduto);
    return produto
}

async function getAllActiveProdutosByFilterAndOrderByService(orderBy, filterOptions) {
    let filters = {};
    if (filterOptions) {
        try {
            filters = typeof filterOptions === 'string' ? JSON.parse(filterOptions) : filterOptions;
        } catch (error) {
            filters = {};
        }
    }

    const allowedOrderFields = ['id', 'nome_produto', 'tipo_unidade', 'quantidade_estoque', 'estoque_minimo', 'created_at', 'updated_at'];
    const validOrderBy = allowedOrderFields.includes(orderBy) ? orderBy : 'id';


    return await getAllActiveProdutosByFilterAndOrderBy(filters, validOrderBy);
}

async function changeProdutoStatusService(idProduto, newStatus) {
    const produto = await getProdutoByIdService(idProduto);
    const formattedNewStatus = newStatus.toUpperCase();

    if (!produto) {
        throw new NotFoundError("Produto não localizado!");
    }

    if (formattedNewStatus !== "ATIVO" && formattedNewStatus !== "INATIVO") {
        throw new ExistsDataError("Utilize ATIVO ou INATIVO");
    }

    const statusAtual = produto.status;
    if (formattedNewStatus == statusAtual) {
        throw new ExistsDataError(`Este produto já se encontra com o status: ${formattedNewStatus}`);
    }

    const updateProdutoStatus = await changeProdutoStatus(idProduto, formattedNewStatus);
    return updateProdutoStatus;
}

async function createProdutoService(produtoData) {
    const newProduto = await createProduto(produtoData);
    return newProduto;
}

async function updateProdutoService(id, produtoData) {
    const { nome_produto, tipo_unidade, quantidade_estoque, estoque_minimo} = produtoData
    const produto = await getProdutoByIdService(id);
    
    if (!produto) {
        throw new NotFoundError("Produto não localizado!");
    }

    const updateFields = {};
    if (nome_produto !== undefined) updateFields.nome_produto = nome_produto
    if (tipo_unidade !== undefined) updateFields.tipo_unidade = tipo_unidade
    if (quantidade_estoque !== undefined && quantidade_estoque !== "") updateFields.quantidade_estoque = quantidade_estoque
    if (estoque_minimo !== undefined && estoque_minimo !== "") updateFields.estoque_minimo = estoque_minimo

    return await updateProduto(id, updateFields);
}

module.exports = {
    getAllProdutosService,
    getAllActiveProdutosService,
    getAllInactiveProdutosService,
    getProdutoByIdService,
    getAllActiveProdutosByFilterAndOrderByService,
    changeProdutoStatusService,
    createProdutoService,
    updateProdutoService,
}