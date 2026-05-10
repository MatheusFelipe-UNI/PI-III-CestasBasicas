const { getFornecedorById,
    getAllFornecedores,
    getAllActiveFornecedores,
    getAllInactiveFornecedores,
    getAllActiveFornecedoresByFilterAndOrderBy,
    changeFornecedorestatus,
    createFornecedor,
    updateFornecedor,
    getFornecedorByCNPJ,
    findAllFornecedoresForSelect,
} = require("../repositories/FornecedoresRepository");
const ExistsDataError = require("../classes/ExistsDataError");
const NotFoundError = require("../classes/NotFoundError");
const { removeAllAcentsForString, setCnpjMask } = require("../utils/DataFormatUtil.js");


async function getAllFornecedoresService() {
    const allFornecedores = await getAllFornecedores();
    return allFornecedores;
}

async function getAllActiveFornecedoresService() {
    const allActiveFornecedores = await getAllActiveFornecedores();
    let formattedData = JSON.parse(JSON.stringify(allActiveFornecedores));
    const activeFornecedoresWithCnpjMask = setCnpjMask(formattedData);

    return activeFornecedoresWithCnpjMask;
}

async function getAllInactiveFornecedoresService() {
    const allInactiveFornecedores = await getAllInactiveFornecedores();
    let formattedData = JSON.parse(JSON.stringify(allInactiveFornecedores));
    const inactiveFornecedoresWithCnpjMask = setCnpjMask(formattedData);
    
    return inactiveFornecedoresWithCnpjMask;
}

async function getAllActiveFornecedoresByFilterAndOrderByService(orderBy, filterOptions) {
    let filters = {};
    if (filterOptions) {
        try {
            filters = typeof filterOptions === 'string' ? JSON.parse(filterOptions) : filterOptions;
        } catch (error) {
            filters = {};
        }
    }

    const allowedOrderFields = ['id', 'nome_fornecedor', 'cnpj', 'created_at', 'updated_at'];
    const validOrderBy = allowedOrderFields.includes(orderBy) ? orderBy : 'id';


    return await getAllActiveFornecedoresByFilterAndOrderBy(filters, validOrderBy);
}

async function getAllFornecedoresForSelectService() {
    const allFornecedores = await findAllFornecedoresForSelect();
    return allFornecedores;
}

async function getFornecedorByIdService(idFornecedor) {
    const Fornecedor = await getFornecedorById(idFornecedor);
    return Fornecedor
}

async function changeFornecedorStatusService(idFornecedor, newStatus) {
    const fornecedor = await getFornecedorByIdService(idFornecedor);
    const formattedNewStatus = newStatus.toUpperCase();

    if (!fornecedor) {
        throw new NotFoundError("Fornecedor não localizado!");
    }

    if (formattedNewStatus !== "ATIVO" && formattedNewStatus !== "INATIVO") {
        throw new ExistsDataError("Utilize ATIVO ou INATIVO");
    }

    const statusAtual = fornecedor.status;
    if (formattedNewStatus == statusAtual) {
        throw new ExistsDataError(`Este Fornecedor já se encontra com o status: ${formattedNewStatus}`);
    }

    const updateFornecedorestatus = await changeFornecedorestatus(idFornecedor, formattedNewStatus);
    return updateFornecedorestatus;
}

async function createFornecedorService(fornecedorData) {
    const { nome_fornecedor, cnpj, status } = fornecedorData
    const formattedDoc = cnpj && String(cnpj).replace(/\D/g, '').trim();
    const formattedFornecedor = nome_fornecedor && String(removeAllAcentsForString(nome_fornecedor)).trim();
    const existFornecedor = await getFornecedorByCNPJ(formattedDoc);

    if (existFornecedor) {
        throw new ExistsDataError("Já existe um fornecedor com este CNPJ")
    }

    const newFornecedor = await createFornecedor({
        nome_fornecedor: formattedFornecedor,
        status: "ATIVO",
        cnpj: formattedDoc,
    });
    
    return newFornecedor;
}


async function updateFornecedorService(id, FornecedoresData) {
    const fornecedor = await getFornecedorByIdService(id);
    
    const { nome_fornecedor, cnpj} = FornecedoresData;
    
    if (!fornecedor) {
        throw new NotFoundError("Fornecedores não localizado!")
    }

    const formattedFornecedor = nome_fornecedor && String(removeAllAcentsForString(nome_fornecedor)).trim();
    if(cnpj) {  
        const formattedDoc = cnpj && String(cnpj).replace(/\D/g, '').trim();
        const existFornecedor = await getFornecedorByCNPJ(formattedDoc);

        if (existFornecedor && existFornecedor.id !== id) {
            throw new ExistsDataError("Já existe um Fornecedor com este CNPJ")
        }
    }  

    const updateFields = {};
    if (nome_fornecedor !== undefined) updateFields.nome_fornecedor = formattedFornecedor
    if (cnpj !== undefined) updateFields.cnpj = formattedDoc

    return await updateFornecedor(id, updateFields);
}

module.exports = {
    getAllFornecedoresService,
    getAllActiveFornecedoresService,
    getAllInactiveFornecedoresService,
    getAllFornecedoresForSelectService,
    getFornecedorByIdService,
    getAllActiveFornecedoresByFilterAndOrderByService,
    changeFornecedorStatusService,
    createFornecedorService,
    updateFornecedorService
}