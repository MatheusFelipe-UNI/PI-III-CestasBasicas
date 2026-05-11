import { TBodyCestaVendas } from "../TableComponents/TBody/TBodyCestaVendas";

export function TableCestaVendas({
   dataCollection = [],
   register = {},
   watch,
   setValue,
   errors,
   removeCesta
}) {
   const fieldCollection = [
      "Cesta",
      "Valor unitário",
      "Qtd. Atual",
      "Qtd. Solicitada",
      "Valor Total",
      "Ações"
   ];
   
   return (
      <>
         {dataCollection.length > 0 ? (
            <div className="tableContainer" style={{ marginBottom: "20px" }}>
               <table>
                  <thead>
                     <tr
                        style={
                           errors?.cestas
                              ? {
                                   backgroundColor: "var(--bg-red)",
                                   color: "var(--colorText-for-bg-red)",
                                }
                              : {}
                        }
                     >
                        {fieldCollection.map((field, index) => (
                           <th key={index}>{field}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {dataCollection.map((data, index) => {
                        const inputValorTotalName = `cestas.${index}.quantidade_solicitada`;
                        const registerQtdSolicitada = register(
                           `cestas.${index}.quantidade_solicitada`,
                           {
                              required: "Campo Obrigatório!",
                              valueAsNumber: true,
                              min: { value: 1, message: "Insira um valor maior que 0" },
                              validate: (value) => {
                                 if(value > data.quantidade) {
                                    return "Quantidade Solicitada maior que a quantidade de cestas disponíveis";
                                 }
                                 return true;
                              }
                           },
                        );
                        const watchQtdSolicitada = watch(`cestas.${index}.quantidade_solicitada`)
                        const registerValorTotal = register(`cestas.${index}.valor_total`, {
                           valueAsNumber: true,
                           min: { value: 0, message: "O valor deve ser maior ou igual a 0" }
                        });
                        return (
                           <TBodyCestaVendas
                              key={index}
                              vendaData={data}
                              setValue={setValue}
                              errors={errors}
                              watchQtdSolicitada={watchQtdSolicitada}
                              index={index}
                              registerQtdSolicitada={registerQtdSolicitada}
                              registerValorTotal={registerValorTotal}
                              removeCesta={removeCesta}
                           />
                        );
                     })}
                  </tbody>
               </table>
            </div>
         ) : (
            <p className="textInfoNotAvaliable">Nenhuma Cesta Selecionada</p>
         )}
      </>
   );
}
