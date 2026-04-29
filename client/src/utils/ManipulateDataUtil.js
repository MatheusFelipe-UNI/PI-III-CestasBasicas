/**
 * Busca pelos dados da coleção do componente Select
 * @param {string} valueRef informação a ser procurada
 * @param {Array} optionsCollection coleção que alimenta o Select
 * @returns retorna a informação (em forma de objeto) solicitada
 */
export function findOptionValue(valueRef, optionsCollection) {
  if(!Array.isArray(optionsCollection)) {
    return null;
  }
    return(optionsCollection.find(option => option.value === valueRef || option.label.toLowerCase() === valueRef.toLowerCase()));
}


export function getElementIdTable(e) {
    const idValue = e.target.closest("tr").id;
    return idValue;
}

export function getElementIdCard(e) {
    const idValue = e.target.closest("article").id;
    return idValue; 
}

export function getItemsDirtyData(dirtyFields, values) {
    const dirtyValues = Object.keys(dirtyFields).reduce((prev, key) => {
      if (!dirtyFields[key]) return prev;
  
      return {
        ...prev,
        [key]:
          typeof dirtyFields[key] === 'object'
            ? getItemsDirtyData(dirtyFields[key], values[key])
            : values[key],
      };
    }, {});
  
    return dirtyValues;
}

export function stringToArray(text) {
  if(text.includes(",")) {
    const replacedText = text.replace(/\s/g, ' ');
    return replacedText.split(",");

  } else if(text.includes("\n")) {
    return text.split("\n");

  }
  return text.split(" ");
}

export function convertAllObjectValueOfArrayFromStringToArray(arrCollection, field) {
  const newArrCollection = arrCollection.map(supply => {
    const content = Object.entries(supply);
    return content.reduce((acc, [key, value]) => {
      if(key === field) {
        acc[key] = stringToArray(value)
      } else {
        acc[key] = value
      }
      return acc
    }, {})
  });
  return newArrCollection
}