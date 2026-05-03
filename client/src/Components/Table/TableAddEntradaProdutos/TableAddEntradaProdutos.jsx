import { TBodyAddEntradaProduto } from "../TableComponents/TBody/TBodyAddEntradaProduto";

export function TableAddEntradaProdutos({ dataCollection = [], register = {}, errors, removeProduto }) {
   const fieldCollection = [
      "Produto", 
      "Fornecedor",
      "Tipo de Unidade", 
      "Quantidade Atual",  
      "Qtd. Recebida", 
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
                        const registerQtdEntrada = register(`produtos.${index}.quantidade_adquirida`, {
                           required: "Campo Obrigatório!",
                           valueAsNumber: true,
                           min: { value: 1, message: "Insira um valor maior que 0" },
                        });
                        return (
                           <TBodyAddEntradaProduto
                              key={data.id}
                              produtoData={data}
                              register={register}
                              errors={errors}
                              index={index}
                              registerQtdEntrada={registerQtdEntrada}
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