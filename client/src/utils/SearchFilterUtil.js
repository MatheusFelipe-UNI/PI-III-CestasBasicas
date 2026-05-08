export function searchFilterData(dataCollection, searchValue, fieldsParams) {
   if (!searchValue) {
      return dataCollection;
   }

   const searchTerm = searchValue.toLowerCase();

   const filteredData = dataCollection.filter((item) => {
      return fieldsParams.some((keyField) => {
         const fieldValue = item[keyField];
         // Verifica se o campo existe e pode ser convertido para string
         return fieldValue !== null && String(fieldValue).toLowerCase().includes(searchTerm);
      });
   });

   return filteredData; 
}

export function customSearchFilterFornecedor(dataCollection, searchValue, fieldsParams) {
   if (!searchValue) {
      return dataCollection;
   }

   const searchTerm = searchValue.toLowerCase();

   const filteredData = dataCollection.filter((item) => {
      return fieldsParams.some((keyField) => {
         const fieldValue = item[keyField];
         if(keyField === "cnpj" && fieldValue !== null) {
            const cnpjClear = fieldValue.toString().replace(/\D/g, '');
            return cnpjClear.toLowerCase().includes(searchTerm) || fieldValue.toLowerCase().includes(searchTerm);
         }
         // Verifica se o campo existe e pode ser convertido para string
         return fieldValue !== null && String(fieldValue).toLowerCase().includes(searchTerm);
      });
   });

   return filteredData;    
}

export function customSearchFilterCliente(dataCollection, searchValue, fieldsParams) {
   if (!searchValue) {
      return dataCollection;
   }

   const searchTerm = searchValue.toLowerCase();

   const filteredData = dataCollection.filter((item) => {
      return fieldsParams.some((keyField) => {
         const fieldValue = item[keyField];
         if(keyField === "cpf_cnpj" && fieldValue !== null) {
            const fieldClear = fieldValue.toString().replace(/\D/g, "");
            return fieldClear.toLowerCase().includes(searchTerm) || fieldValue.toLowerCase().includes(searchTerm);
         
         }
         if(keyField === "tipo_cliente" && fieldValue !== null) {
            const fieldClear = fieldValue.toString().replace(/_/g, ' ');
            return fieldClear.toLowerCase().includes(searchTerm) || fieldValue.toLowerCase().includes(searchTerm);
         }
         // Verifica se o campo existe e pode ser convertido para string
         return fieldValue !== null && String(fieldValue).toLowerCase().includes(searchTerm);
      });
   });

   return filteredData;    
}