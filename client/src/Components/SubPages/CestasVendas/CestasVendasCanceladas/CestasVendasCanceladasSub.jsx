import TableDefault from "../../../Table/TableDefault/TableDefault";

export function CestasVendasCanceladasSub() {
   const fieldCollection = [
      "ID",
      "Cliente",
      "Cesta Solicitada",
      "Qtd. Solicitada",
      "Valor Total",
      "Cadastrado por",
      "Data Pedido",
   ];

   const tempDataCollection = [
      {
         id: 1,
         cliente: "José Augusto Ferreira",
         cesta_solicitada: "Cesta 1",
         qtd_solicitada: 50,
         valor_total: "R$150.00",
         usuario: "Claudio Pereira",
         data_pedido: "01-04-2026",
      },
      {
         id: 2,
         cliente: "Marcus Vinicius Amaral Rodrigues",
         cesta_solicitada: "Cesta 2",
         qtd_solicitada: 20,
         valor_total: "R$1900.00",
         usuario: "Admin",
         data_pedido: "20-04-2026",
      },
   ];

   return (
      <>
         <div>
            <input type="text" />
         </div>
         <TableDefault
            fieldCollection={fieldCollection}
            dataCollection={tempDataCollection}
         />
      </>
   );
}