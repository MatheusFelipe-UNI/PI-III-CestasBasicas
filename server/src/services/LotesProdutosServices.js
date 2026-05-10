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
} = require("../repositories/LotesProdutosRepository");
const FieldUndefinedError = require("../classes/FieldUndefinedError");

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

    const hoje = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const dataValidade = new Date(loteProdutoData.data_validade);
    const dataHoje = new Date(hoje);

    if(dataValidade <= dataHoje) {
        throw new CannotCreateError ("O lote não pode ser criado com prazo de validade igual ou inferior ao dia de hoje");
    }
    
    const createdLote = await createLoteProduto({
        ...loteProdutoData,
        status: "ATIVO",
        is_vencido: 0,
    });
    return createdLote
}

async function updateLoteProdutoService(id, lotesData) {
    const { fk_id_fornecedor, valor_unitario, qtd_disponivel, data_validade, is_vencido } = lotesData
    const lote = await getLoteProdutoByIdService(id);
    const hoje = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    if (!lote) {
        throw new ExistsDataError ("Lote não localizado!")
    }

    if(data_validade && data_validade <= hoje) {
        throw new CannotupdateError ("O lote não pode ser editado usando um prazo de validade igual ou inferior ao dia de hoje");
    }

    const updateFields = {};
    if (is_vencido !== undefined) updateFields.is_vencido = is_vencido;
    if (fk_id_fornecedor !== undefined) updateFields.fk_id_fornecedor = fk_id_fornecedor;
    if (valor_unitario !== undefined) updateFields.valor_unitario = valor_unitario;
    if (qtd_disponivel !== undefined) updateFields.qtd_disponivel = qtd_disponivel;
    if (data_validade !== undefined) updateFields.data_validade = data_validade;

    if (Number(is_vencido) === 1) {
        updateFields.status = "INATIVO";
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