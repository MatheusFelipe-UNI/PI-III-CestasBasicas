const { Vendas, sequelize } = require("../models");
const { Op } = require("sequelize");

async function getAllVendasCestas() {
    const vendas = await Vendas.findAll();
    return vendas;
}

async function getAllPendingVendasCestas() {
    const allPendingVendas = await Vendas.findAll({
        include: [
            {
                association: "cliente_venda",
                attributes: []
            },
            {
                association: "user_venda",
                attributes: []
            },
            {
                association: "cesta_venda",
                attributes: []
            }
        ],
        attributes: [
            "id",
            [sequelize.col("cliente_venda.nome_cliente"), "nome_cliente"],
            [sequelize.col("cesta_venda.nome_cesta"), "nome_cesta"],
            "quantidade",
            "valor_total",
            [sequelize.col("user_venda.usuario"), "nome_usuario"],
            [sequelize.fn("DATE_FORMAT", sequelize.col("Vendas.data_venda"), "%d-%m-%Y"), "data_pedido",],
        ],
        where: {
            status: "PENDENTE"
        },
        order: [["data_venda", "DESC"]]
    });
    return allPendingVendas;
}

async function getAllFinishedVendasCestas() {
    const allFinishedVendas = await Vendas.findAll({
        include: [
            {
                association: "cliente_venda",
                attributes: []
            },
            {
                association: "user_venda",
                attributes: []
            },
            {
                association: "cesta_venda",
                attributes: []
            }
        ],
        attributes: [
            "id",
            [sequelize.col("cliente_venda.nome_cliente"), "nome_cliente"],
            [sequelize.col("cesta_venda.nome_cesta"), "nome_cesta"],
            "quantidade",
            "valor_total",
            [sequelize.col("user_venda.usuario"), "nome_usuario"],
            [sequelize.fn("DATE_FORMAT", sequelize.col("Vendas.data_venda"), "%d-%m-%Y"), "data_pedido",],
        ],
        where: {
            status: "CONCLUIDA"
        },
        order: [["data_venda", "DESC"]]
    });
    return allFinishedVendas;
}

async function getAllCanceledVendasCestas() {
    const allCanceledVendas = await Vendas.findAll({
        include: [
            {
                association: "cliente_venda",
                attributes: []
            },
            {
                association: "user_venda",
                attributes: []
            },
            {
                association: "cesta_venda",
                attributes: []
            }
        ],
        attributes: [
            "id",
            [sequelize.col("cliente_venda.nome_cliente"), "nome_cliente"],
            [sequelize.col("cesta_venda.nome_cesta"), "nome_cesta"],
            "quantidade",
            "valor_total",
            [sequelize.col("user_venda.usuario"), "nome_usuario"],
            [sequelize.fn("DATE_FORMAT", sequelize.col("Vendas.data_venda"), "%d-%m-%Y"), "data_pedido",],
        ],
        where: {
            status: "CANCELADA"
        },
        order: [["data_venda", "DESC"]]
    });
    return allCanceledVendas;
}

async function getAllFinishedVendasCestasByFilterAndOrderBy(filters, orderBy) {
    const finishedVendas = { status: "CONCLUIDA" };

    const include = [
        {
            association: "cliente_venda",
            attributes: []
        },
        {
            association: "user_venda",
            attributes: []
        },
        {
            association: "cesta_venda",
            attributes: ["nome_cesta"]
        }
    ];

    for (const selectFilter in filters) {
        const value = filters[selectFilter];
        if (value == undefined || value == null || value == "") continue;

        /*
        =============================================
       
                           VENDAS
       
        =============================================
        */
        // Exibe vendas realizadas em um periodo de dias determinado pelo usuário
        else if (selectFilter == 'periodo_venda') {
            const hoje = new Date();
            const dataFim = new Date();
            dataFim.setDate(hoje.getDate() - Number(value));
            finishedVendas.data_venda = { [Op.gte]: dataFim };
        }

        /*
        =============================================
       
                           CLIENTE
       
        =============================================
        */

        // Procura uma cesta vendida com base no nome do cliente
        else if (selectFilter == 'nome_cliente') {
            include[0].where = {
                nome_cliente: { [Op.like]: `%${value}%` }
            };
            include[0].required = true;
        }

        // Procura uma cesta vendida com base no nome do documento do cliente (cpf/cnpj)
        else if (selectFilter == 'documento') {
            include[0].where = {
                cpf_cnpj: { [Op.like]: `%${value}%` }
            };
            include[0].required = true;
        }

        /*
         =============================================
        
                            USUARIO
        
         =============================================
         */
        // Procura uma cesta vendida com base no nome do usuario
        else if (selectFilter == 'usuario') {
            include[1].where = {
                usuario: { [Op.like]: `%${value}%` }
            };
            include[1].required = true;
        }

        /*
         =============================================
        
                            CESTA
        
         =============================================
         */

        else if (selectFilter == 'nome_cesta') {
            include[2].where = {
                nome_cesta: { [Op.like]: `%${value}%` }
            };
            include[2].required = true;
        }
    }

    const orderDirection = filters.order_direction?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    let order;
    if (orderBy === 'nome_cliente') {
        order = [[sequelize.col('cliente_venda.nome_cliente'), orderDirection]];

    } else if (orderBy === 'usuario') {
        order = [[sequelize.col('user_venda.usuario'), orderDirection]];

    } else if (orderBy === 'nome_cesta') {
        order = [[sequelize.col('cesta_venda.nome_cesta'), orderDirection]];

    } else if (orderBy) {
        order = [[orderBy, orderDirection]];
    }

    const result = await Vendas.findAll({
        where: finishedVendas,
        attributes: [
            "id",
            "fk_id_cesta",
            "quantidade",
            "valor_total",
            "data_venda",
            "valor_unitario",
            "status",
            [sequelize.fn("DATE_FORMAT", sequelize.col("Vendas.data_venda"), "%d-%m-%Y"), "data_venda",],
            [sequelize.col("user_venda.usuario"), "vendedor"],
            [sequelize.col("cliente_venda.nome_cliente"), "cliente"],
        ],
        include,
        order,
        raw: true,
        nest: true
    });

    return result;
}

async function getVendaCestaById(idCestaVenda) {
    const vendas = await Vendas.findByPk(idCestaVenda);
    return vendas
}

async function changeVendaCestaStatus(id, newStatus) {
    const updateVendaStatus = await Vendas.update({ status: newStatus }, {
        where: { id: id }
    });
    return updateVendaStatus;
}

async function createVendaCesta(vendaCestaCollection) {
    const createdVenda = await Vendas.bulkCreate(vendaCestaCollection)
    return createdVenda;
}

async function deleteVendaCesta(id) {
    const deletedVenda = await Vendas.destroy({
        where: { id }
    });
    return deletedVenda;
}

module.exports = {
    getAllVendasCestas,
    getAllPendingVendasCestas,
    getAllFinishedVendasCestas,
    getAllCanceledVendasCestas,
    getAllFinishedVendasCestasByFilterAndOrderBy,
    getVendaCestaById,
    changeVendaCestaStatus,
    createVendaCesta,
    deleteVendaCesta
}