// Produtos
import { ModalAddProduto } from "../Components/Modals/Produtos/ModalAddProduto/ModalAddProduto";
import { ModalAddEntradaProdutos } from "../Components/Modals/Produtos/Entrada/ModalAddEntradaProdutos/ModalAddEntradaProdutos";
import { ModalEditProduto } from "../Components/Modals/Produtos/ModalEditProduto/ModalEditProduto";
// Fornecedor
import { ModalAddFornecedor } from "../Components/Modals/Fornecedores/ModalAddFornecedor/ModalAddFornecedor";
import { ModalEditFornecedor } from "../Components/Modals/Fornecedores/ModalEditFornecedor/ModalEditFornecedor";
// Cliente
import { ModalAddCliente } from "../Components/Modals/Clientes/ModalAddCliente/ModalAddCliente";
import { ModalEditCliente } from "../Components/Modals/Clientes/ModalEditCliente/ModalEditCliente";
// Usuario
import { ModalAddUser } from "../Components/Modals/Administrador/ModalAddUser";
// Cesta
import { ModalAddCesta } from "../Components/Modals/Cestas/ModalAddCesta/ModalAddCesta";

export const modalCollection = [
   // Produtos
   {
      name: "addProduto",
      title: "Adicionar Novo Produto",
      modalContent: <ModalAddProduto />,
   },
   {
      name: "editProduto",
      title: "Editar Produto",
      modalContent: <ModalEditProduto/>
   },
   {
      name: "addEntradaProdutos",
      title: "Cadastrar Entrada de Produtos",
      modalContent: <ModalAddEntradaProdutos />,
   },
   //Fornecedores
   {
      name: "addFornecedor",
      title: "Adicionar Novo Fornecedor",
      modalContent: <ModalAddFornecedor />,
   },
   {
      name: "editFornecedor",
      title: "Editar Fornecedor",
      modalContent: <ModalEditFornecedor />,
   },
   //Clientes
   {
      name: "addCliente",
      title: "Adicionar Novo Cliente",
      modalContent: <ModalAddCliente />,
   },
   {
      name: "editCliente",
      title: "Editar Cliente",
      modalContent: <ModalEditCliente/>
   },
   //Admin
   {
      name: "addAdmin",
      title: "Adicionar novo Usuário",
      modalContent: <ModalAddUser />,
   },
   //Cestas
   {
      name: "addCesta",
      title: "Montar Cesta Básica",
      modalContent: <ModalAddCesta />,
   },
];
