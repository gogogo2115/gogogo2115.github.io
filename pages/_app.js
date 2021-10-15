import Head from "next/head";
import Maintence from "components/Maintenance";

function NextApp({ Component, pageProps }) {

    const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE;

    return (<>
    <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width" />
        <title>ssss</title>
    </Head>
    {(isMaintenance === "true") 
    ? (<Maintence />) 
    : (<Component {...pageProps} />)} 
    </>);
}
export default NextApp;