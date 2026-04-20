import TBodyProdutos from "../TableComponents/TBody/TBodyProdutos";
import THeadGeneral from "../TableComponents/THead/THeadGeneral";
import TableDefault from "../TableDefault/TableDefault";
import { FaEdit as IconEdit, FaTrashAlt as IconDel } from "react-icons/fa";

export function TableProdutos({ 
   title = "",
   dataCollection = [], 
   isModalChildren = false 
}) {
   const fieldCollection = [
      "ID",
      "Nome Produto",
      "Tipo Unidade",
      "Qtd. Estoque",
      "Qtd. Estoque Mínimo",
      "Status Estoque",
      "Última Atualização",
   ];

   const tempDataCollection = [
      {
         id: 1,
         nome_produto: "Arroz",
         tipo_unidade: "KG",
         qtd_estoque: 100,
         estoque_minimo: 20,
         status_estoque: "Em Estoque",
         ultima_atualizacao: "2024-06-01",
      },
      {
         id: 2,
         nome_produto: "Feijão",
         tipo_unidade: "KG",
         qtd_estoque: 10,
         estoque_minimo: 10,
         status_estoque: "Pouco Estoque",
         ultima_atualizacao: "2024-06-01",
      },
   ];

   const btnCollection = [
      {
         id: 1,
         infoView: "Visualizar Lote",
         handleAction: () => null,
         className: "alternateGreenBtn",
      },
      {
         id: 2,
         infoView: <IconDel />,
         handleAction: () => null,
         className: "delBtn",
         toolTipsText: "Inativar Produto",
      },
   ];

   return (
      <>
         {tempDataCollection.length > 0 ? (
            <div className={`tableContainer ${!isModalChildren ? "fadeIn" : ""}`}>
               <table>
                  <thead>
                     <THeadGeneral
                        title={title}
                        fieldCollection={fieldCollection}
                        hasActionBtn={btnCollection.length > 0}
                     />
                  </thead>
                  <tbody>
                     {tempDataCollection.map((data) => (
                        <TBodyProdutos
                           key={data.id}
                           dataInfo={data}
                           btnInfoCollection={btnCollection}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <p className="textInfoNotAvaliable textMargin">Nenhum Registro Encontrado</p>
         )}
      </>
   );
}
