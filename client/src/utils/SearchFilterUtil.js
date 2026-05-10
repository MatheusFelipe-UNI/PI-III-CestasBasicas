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

export function customSearchFilterEntradaProdutos(dataCollection, searchValue, fieldsParams) {
   if (!searchValue) {
      return dataCollection;
   }

   const searchTerm = searchValue.toLowerCase();

   // Função auxiliar recursiva que verifica se um valor (ou seus descendentes) contém o termo de busca
   function valueContainsSearch(value, term) {
      if (value == null) return false;

      // Se for string ou número, converte e compara
      if (typeof value === 'string' || typeof value === 'number') {
         return String(value).toLowerCase().includes(term);
      }

      // Se for array, verifica cada elemento recursivamente
      if (Array.isArray(value)) {
         return value.some(item => valueContainsSearch(item, term));
      }

      // Se for objeto, verifica todas as suas propriedades recursivamente
      if (typeof value === 'object') {
         return Object.values(value).some(propValue => valueContainsSearch(propValue, term));
      }

      return false;
   }

   const filteredData = dataCollection.filter((item) => {
      return fieldsParams.some((keyField) => {
         const fieldValue = item[keyField];
         // Verifica se o campo existe e se, recursivamente, contém o termo
         return fieldValue !== null && valueContainsSearch(fieldValue, searchTerm);
      });
   });

   return filteredData;
}