export default function isNotEmpty(value){
    if (value === null || value === undefined ) return false;
    if (typeof value === 'string' && value === '') return false;
    if (Array.isArray(value) && value.length < 1) return false;
    if (typeof value === 'object'){
        if(value.constructor.name === 'Object' && Object.keys(value).length < 1) return false;
        if(value.constructor.name === 'String' && Object.keys(value).length < 1) return false; //new String()
    }
    return true;
}