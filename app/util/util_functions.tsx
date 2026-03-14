export const isEmptyVariable=(variable : any) : boolean=>{
    return variable === undefined || variable === null || variable === "" || variable === 'undefined';
}

export const isEmptyArray = (array: []):boolean =>{
    return isEmptyVariable(array) === true || Array.isArray(array) === false || array.length === 0;
}

export const isEmptyObject = (object:{}): boolean=>{
    return isEmptyVariable(object) === true || Object.values(object).length === 0
}

export const isValidateEmail = (email:string):boolean=>{
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}