export default function isNotEmpty(value){
    if (value !== null || value !== undefined ) return true;
    if (typeof value === 'string' && value !== '') return true;
    if (Array.isArray(value) && value.length > 1) return true;
    if (typeof value === 'object'){
        if(value.constructor.name === 'Object' && Object.keys(value).length > 1) return true;
        if(value.constructor.name === 'String' && Object.keys(value).length > 1) return true; //new String()
    }
    return false;
}