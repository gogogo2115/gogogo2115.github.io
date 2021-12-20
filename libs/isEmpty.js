export default function isEmpty(value, strOpt=false){

    if (value === null) return true;
    if (value === undefined || typeof value === 'undefined') return true;
    if (typeof value === 'string' && value === '') return true;
    if (Array.isArray(value) && value.length < 1) return true;
    if (typeof value === 'object' && Object.keys(value).length < 1) return true;
    if(strOpt === true){
        const valueTrim = value.trim();
        if ( typeof value === 'string' && /^null$/i.test(valueTrim) ) return true;
        if ( typeof value === 'string' && /^undefined$/i.test(valueTrim) ) return true;
        if ( typeof value === 'string' && /^\{(\s*)\}$/g.test(valueTrim) ) return true;
        if ( typeof value === 'string' && /^\[(\s*)\]$/g.test(valueTrim) ) return true;
    }
    return false;
}