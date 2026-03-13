export const isEmptyVariable=(variable : any) : boolean=>{
    return variable === undefined || variable === null || variable === "" || variable === 'undefined';
}

export const isEmptyArray = (array: []):boolean =>{
    return isEmptyVariable(array) === true || Array.isArray(array) === false || array.length === 0;
}