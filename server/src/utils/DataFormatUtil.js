function setFirstLetterToUpperCase(text) {
   const lowerCaseText = text.toLowerCase();
   const formattedText = lowerCaseText.replace(/^./, lowerCaseText[0].toUpperCase());
   return formattedText;
}

function removeAllAcentsForString(text) {
   const formattedtext = (text.normalize('NFD').replace(/[\u0300-\u036f]/g, "")).toLowerCase();
   return formattedtext;
}

function setCnpjMask(dataCollection) {
   let newDataCollection;
   if(!Array.isArray(dataCollection)) {
      newDataCollection = Array(dataCollection);
   } else {
      newDataCollection = dataCollection
   }

   const dataWithCnpjMask = newDataCollection.map((item) => {
      const maskCnpj = String(item.cnpj).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5');
      return {
         ...item,
         cnpj: maskCnpj
      }
   })

   return dataWithCnpjMask;
}

function setCpfOrCnpjMask(dataCollection) {
   let newDataCollection;
   if(!Array.isArray(dataCollection)) {
      newDataCollection = Array(dataCollection);
   } else {
      newDataCollection = dataCollection
   }

   const dataWithCpfOrCnpjMask = newDataCollection.map((item) => {
      const { tipo_cliente } = item;
      let valueWithMask;

      if(tipo_cliente === "PESSOA_FISICA") {
         valueWithMask = String(item.cpf_cnpj).replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
            '$1.$2.$3-$4'
         );
      } else {
         valueWithMask = String(item.cpf_cnpj).replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
         );
      }
      return {
         ...item,
         cpf_cnpj: valueWithMask
      }
   })

   return dataWithCpfOrCnpjMask;   
}

module.exports = {
   setFirstLetterToUpperCase, 
   removeAllAcentsForString,
   setCnpjMask,
   setCpfOrCnpjMask
};