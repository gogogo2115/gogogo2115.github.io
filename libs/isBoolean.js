export default function isBoolean(str, option=false){

    str = String(str).trim().toLowerCase();

    const strictBooleans = ['true', 'false', '1', '0'];
    const looseBooleans = [...strictBooleans, 'yes', 'no', 'y', 'n','on', 'off'];

    if(option === true){
        return looseBooleans.includes(str);
    }
    return strictBooleans.includes(str);
}