import { TBodyAddEntradaProduto } from "../TableComponents/TBody/TBodyAddEntradaProduto";
import { TBodyCesta } from "../TableComponents/TBody/TBodyCesta";

export function TableCesta({ dataCollection = [], register = {}, errors, removeProduto }) {
   const fieldCollection = [
      "Produto", 
      "Tipo de Unidade", 
      "Quantidade Atual",  
      "Quantidade Solicitada", 
      "Ações"
   ];

   return (
      <>
         {dataCollection.length > 0 ? (
            <div className="tableContainer" style={{marginBottom: "20px"}}>
               <table>
                  <thead>
                     <tr style={errors?.supply ? {
                  backgroundColor: "var(--bg-red)",
                  color: "var(--colorText-for-bg-red)"
               } : {}}>
                        {fieldCollection.map((field, index) => (
                           <th key={index}>{field}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {dataCollection.map((data, index) => {
                        const registerQtdSolicitada = register(`cesta_itens.${index}.quantidade_solicitada`, {
                           required: "Campo Obrigatório!",
                           valueAsNumber: true,
                           min: { value: 1, message: "Insira um valor maior que 0" },
                        });
                        return (
                           <TBodyCesta
                              key={data.id}
                              produtoData={data}
                              register={register}
                              errors={errors}
                              index={index}
                              registerQtdSolicitada={registerQtdSolicitada}
                              removeProduto={removeProduto}
                           />
                        );
                     })}
                  </tbody>
               </table>
            </div>
         ) : (
            <p className="textInfoNotAvaliable">Nenhum Suprimento Selecionado</p>
         )}
      </>
   );
}