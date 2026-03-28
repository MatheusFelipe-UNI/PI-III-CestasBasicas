const { Router } = require("express");
const entradasController = require("../../controllers/EntradasController.js");

const router = Router();

router
   .route("/")
   .get(entradasController.getAllEntradasProdutos)
   .post(entradasController.createEntradaProduto);

router
   .route("/recebidas")
   .get(entradasController.getAllReceivedEntradasProdutos)

router
   .route("/canceladas")
   .get(entradasController.getAllCanceledEntradasProdutos)

router
   .route("/recebidas/filter")
   .get(entradasController.getAllReceivedEntradasProdutosByFilterAndOrderBy)

router
   .route("/canceladas/filter")
   .get(entradasController.getAllCanceledEntradasProdutosByFilterAndOrderBy)

router
   .route("/:id/status")
   .patch(entradasController.changeEntradaProdutoStatus)

router
   .route("/:id")
   .get(entradasController.getCestaById)

module.exports = router;