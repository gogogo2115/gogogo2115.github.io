export default function isBoolean(str, option=false){

    const strictBooleans = ['true', 'false', '1', '0'];
    const looseBooleans = [...strictBooleans, 'yes', 'no', 'on', 'off'];

    str = String(str).toLowerCase().trim();
    
    if(option === true){
        return looseBooleans.includes(str);
    }
    return strictBooleans.includes(str);
}