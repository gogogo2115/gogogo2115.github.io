export default function isNotEmpty(value){
    if (value === null) return false;
    if (value === undefined || typeof value === 'undefined') return false;
    if (typeof value === 'string' && value === '') return false;
    // if (typeof value === 'string' && value === 'null') return false;
    // if (typeof value === 'string' && value === 'undefined') return false;
    if (Array.isArray(value) && value.length < 1) return false;
    if (typeof value === 'object' && Object.keys(value).length < 1) return false;
    return true;
}