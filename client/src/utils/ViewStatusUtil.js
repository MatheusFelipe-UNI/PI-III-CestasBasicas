const STORAGE_KEY = "screenViewStatus";
const DEFAULT_STATUS = {
   produtos: "ATIVO",
   loteProdutos: "ATIVO",
   // RECEBIDO | CANCELADO
   entradaProdutos: "RECEBIDO",
   cestas: "ATIVO",
   // CADASTRO | PENDENTE | CONCLUIDA | CANCELADA
   vendasCestas: "CADASTRO",
   fornecedores: "ATIVO",
   clientes: "ATIVO"

}

export function getScreenViewStatus() {
   const storedData = localStorage.getItem(STORAGE_KEY);
   if(!storedData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATUS));
      return DEFAULT_STATUS
   }

   return JSON.parse(storedData);
}

export function getScreenViewStatusByKey(key) {
   const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

   if(!storedData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATUS));

      return DEFAULT_STATUS[key];
   }
   
   return storedData[key];
}

export function setScreenViewStatusByKey(key, newValue) {
   const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
   const newStoredData = {
      ...storedData,
      [key]: newValue
   }
   localStorage.setItem(STORAGE_KEY, JSON.stringify(newStoredData));
}
