export default function isEmpty(value, strOpt=false){

    if (value === null) return true;
    if (value === undefined || typeof value === 'undefined') return true;
    if (typeof value === 'string' && value === '') return true;
    if (Array.isArray(value) && value.length < 1) return true;
    if (typeof value === 'object' && Object.keys(value).length < 1) return true;
    if(strOpt === true && typeof value === 'string'){
        const valueTrim = value.trim();
        if ( /^null$/i.test(valueTrim) || /^("|')null("|')$/i.test(valueTrim) ) return true;
        if ( /^undefined$/i.test(valueTrim) || /^("|')undefined("|')$/i.test(valueTrim)) return true;
        if ( /^\{(\s*)\}$/g.test(valueTrim) || /^("|')\{(\s*)\}("|')$/g.test(valueTrim) ) return true;
        if ( /^\[(\s*)\]$/g.test(valueTrim) || /^("|')\[(\s*)\]("|')$/g.test(valueTrim) ) return true;
    }
    return false;
}