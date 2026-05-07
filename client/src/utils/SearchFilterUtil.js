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
