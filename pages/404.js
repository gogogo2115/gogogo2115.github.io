import { useEffect } from "react";
import { useRouter } from "next/router";

const Error404 = () => {

    const isRedirect = false;
    const redirectPath = "/";
    const router = useRouter();

    useEffect(() => {
        if(isRedirect === true){
            router.push(redirectPath);
        }
    }, []);

    return((isRedirect === false)
    ? <>Error404</>
    : null);;
}
export default Error404;