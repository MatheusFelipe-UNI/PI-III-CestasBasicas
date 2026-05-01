// Produtos
import { ModalAddProduto } from "../Components/Modals/Produtos/ModalAddProduto/ModalAddProduto";
import { ModalAddFornecedor } from "../Components/Modals/Fornecedores/ModalAddFornecedor/ModalAddFornecedor";
import { ModalAddCliente } from "../Components/Modals/Clientes/ModalAddCliente";

export const modalCollection = [
   // Produtos
   {
      name: "addProduto",
      title: "Adicionar Novo Produto",
      modalContent: <ModalAddProduto/>
   },
   //Fornecedores
   {
      name: "addFornecedor",
      title: "Adicionar Novo Fornecedor",
      modalContent: <ModalAddFornecedor/>
   },
   //Clientes
   {
      name: "addCliente",
      title: "Adiciona Novo Cliente",
      modalContent: <ModalAddCliente/>
   }
];