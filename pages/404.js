import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NotFound from "components/NotFound";

function Error404(){

    const [ isRedirect ] = useState(false);
    const redirectPath = "/";
    const router = useRouter();

    useEffect(() => {
        if(isRedirect === true){
            router.push(redirectPath);
        }
    }, []);

    return((isRedirect === false)
    ? <NotFound />
    : null);
}
export default Error404;