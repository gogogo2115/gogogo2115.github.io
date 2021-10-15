export default function toBoolean(str,option=false){

    str = String(str).toLowerCase().trim();

    if (option === true) {
        return /^(true|1|yes|y|on)$/i.test(str);
    }
    return /^(true|1)$/i.test(str);
}