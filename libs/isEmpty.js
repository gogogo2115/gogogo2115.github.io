export default function isEmpty(value){
    if (value === null) return true;
    if (value === undefined || typeof value === 'undefined') return true;
    if (typeof value === 'string' && value === '') return true;
    // if (typeof value === 'string' && value === 'null') return true;
    // if (typeof value === 'string' && value === 'undefined') return true;
    if (Array.isArray(value) && value.length < 1) return true;
    if (typeof value === 'object' && Object.keys(value).length < 1) return true;
    return false;
}