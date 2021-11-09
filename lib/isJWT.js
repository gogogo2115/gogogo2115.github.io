export default function isJWT(str){

    const isChkString = (typeof str) === "string" || str instanceof String;
    if(!isChkString){
        return false;
    }

    const dotSplit = str.split('.');
    const len = dotSplit.length;
    const safeBase64 = /^[A-Z0-9_\-]*$/i;

    if (len > 3 || len < 2) {
        return false;
    }

    return dotSplit.reduce((acc, currElem) => { return acc && safeBase64.test(currElem); }, true);

}