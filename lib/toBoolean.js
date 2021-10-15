export default function toBoolean(str,option=false){

    str = String(str).toLowerCase().trim();

    if (option === true) {
        return /^(true|on|yes|y|1)$/i.test(str);
    }
    return /^(true|1)$/i.test(str);
}