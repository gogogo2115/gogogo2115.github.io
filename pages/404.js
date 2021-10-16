import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function Error404(){

    const [ isRedirect ] = useState(true);
    const redirectPath = "/";
    const router = useRouter();

    useEffect(() => {
        if(isRedirect === true){
            router.push(redirectPath);
        }
    }, []);

    return((isRedirect === false)
    ? <>존재하지 않는 페이지 입니다.</>
    : null);
}
export default Error404;