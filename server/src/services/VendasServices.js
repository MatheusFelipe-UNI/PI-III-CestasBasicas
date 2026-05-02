const ExistsDataError = require("../classes/ExistsDataError");
const FieldUndefinedError = require("../classes/FieldUndefinedError");
const { changeLoteProdutoStatus } = require("../repositories/LotesProdutosRepository");
const {
    getAllVendasCestas,
    getAllPendingVendasCestas,
    getAllFinishedVendasCestas,
    getAllCanceledVendasCestas,
    getAllFinishedVendasCestasByFilterAndOrderBy,
    getVendaCestaById,
    changeVendaCestaStatus,
    createVendaCesta,
} = require("../repositories/VendasRepository")

async function getAllVendasCestasService() {
    const vendas = await getAllVendasCestas();
    return vendas;
}

async function getAllPendingVendasCestasService() {
    const allPendingVendas = await getAllPendingVendasCestas();
    return allPendingVendas;
}

async function getAllFinishedVendasCestasService() {
    const allFinishedVendas = await getAllFinishedVendasCestas();
    return allFinishedVendas;
}

async function getAllCanceledVendasCestasService() {
    const allCanceledVendas = await getAllCanceledVendasCestas();
    return allCanceledVendas;
}

async function getAllFinishedVendasCestasByFilterAndOrderByService(orderBy, filterOptions) {
    let filters = {};
    if (filterOptions) {
        try {
            filters = typeof filterOptions === 'string' ? JSON.parse(filterOptions) : filterOptions;
        } catch (error) {
            filters = {};
        }
    }

    const allowedOrderFields = ['id', 'nome_cliente', 'usuario', 'nome_cesta', 'quantidade', 'valor_total', 'data_venda', 'valor_unitario'];
    const validOrderBy = allowedOrderFields.includes(orderBy) ? orderBy : 'id';

    return await getAllFinishedVendasCestasByFilterAndOrderBy(filters, validOrderBy);
}

async function getVendaCestaByIdService(idCestaVenda) {
    const vendas = await getVendaCestaById(idCestaVenda);
    return vendas
}

async function changeVendaCestaStatusService(id, newStatus) {
    const venda = await getVendaCestaByIdService(id)
    const formattedNewStatus = newStatus.toUpperCase();

    if (!venda){
        throw new FieldUndefinedError ("Venda não localizada!")
    }

    if (formattedNewStatus !== "CONCLUIDA" && formattedNewStatus !== "PENDENTE" && formattedNewStatus !== "CANCELADA"){
        throw new FieldUndefinedError ("Utilize CONCLUIDA, PENDENTE ou CANCELADA")
    }

    const statusAtual = venda.status;
    if (formattedNewStatus == statusAtual){
        throw new ExistsDataError (`Esta venda já se encontra com o status: ${formattedNewStatus}`);
    }

    const updateVendaStatus = await changeVendaCestaStatus (id, formattedNewStatus);
    return updateVendaStatus;
}

async function createVendaCestaService(vendaCestaData) {
    const createdVenda = await createVendaCesta(vendaCestaData);
    return createdVenda
}

module.exports = {
    getAllVendasCestasService,
    getAllPendingVendasCestasService,
    getAllFinishedVendasCestasService,
    getAllCanceledVendasCestasService,
    getAllFinishedVendasCestasByFilterAndOrderByService,
    getVendaCestaByIdService,
    changeVendaCestaStatusService,
    createVendaCestaService,
}