export default function isEmpty(value, strNullOpt=false){
    if (value === null) return true;
    if (value === undefined || typeof value === 'undefined') return true;
    if (typeof value === 'string' && value === '') return true;
    if (Array.isArray(value) && value.length < 1) return true;
    if (typeof value === 'object' && Object.keys(value).length < 1) return true;
    if(strNullOpt === true){
        if (typeof value === 'string' && value.trim() === 'null') return true;
        if (typeof value === 'string' && value.trim() === 'undefined') return true;

    }
    return false;
}