const CannotDeleteError = require("../classes/CannotDeleteError");
const ExistsDataError = require("../classes/ExistsDataError");
const FieldUndefinedError = require("../classes/FieldUndefinedError");
const NotFoundError = require("../classes/NotFoundError");
const {
    getAllVendasCestas,
    getAllPendingVendasCestas,
    getAllFinishedVendasCestas,
    getAllCanceledVendasCestas,
    getAllFinishedVendasCestasByFilterAndOrderBy,
    getVendaCestaById,
    changeVendaCestaStatus,
    createVendaCesta,
    deleteVendaCesta,
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
    const venda = await getVendaCestaById(id)
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

async function createVendaCestaService(idUser, vendaCestaCollection) {
    const vendaCestaWithStatus = vendaCestaCollection.map(venda => ({ 
        ...venda, 
        status: "PENDENTE", 
        fk_id_user: idUser,
        quantidade: venda.quantidade_solicitada
    }));

    const createdVenda = await createVendaCesta(vendaCestaWithStatus);
    return createdVenda;
}

async function deleteVendaCestaService(idUser) {
    const existsVenda = await getVendaCestaById(idUser);

    if(!existsVenda) {
        throw new NotFoundError("Venda de Cesta não encontrada!", {
            id: idUser
        });
    }

    const deletedVenda = await deleteVendaCesta(idUser);

    return deletedVenda;
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
    deleteVendaCestaService
}