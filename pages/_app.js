import Head from "next/head";
import toBoolean from "lib/toBoolean";
import Maintence from "components/Maintenance";

function NextApp({ Component, pageProps }) {

    const isMaintenance = toBoolean(process.env.NEXT_PUBLIC_MAINTENANCE_MODE, true);

    return (<>
    <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width" />
        <title>ssss</title>
    </Head>
    {(isMaintenance === true) 
    ? (<Maintence />) 
    : (<Component {...pageProps} />)} 
    </>);
}
export default NextApp;