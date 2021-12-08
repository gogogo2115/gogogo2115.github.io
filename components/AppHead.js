import Head from 'next/head';

console.log(`   ██╗   ██╗███████╗██╗     ██╗      ██████╗   ██╗
   ██║   ██║██╔════╝██║     ██║     ██╔═══██╗  ██║
   ████████║█████╗  ██║     ██║     ██║   ██║  ██║
   ██╔═══██║██╔══╝  ██║     ██║     ██║   ██║  ╚═╝
   ██║   ██║███████╗███████╗███████╗╚██████╔╝  ██╗
   ╚═╝   ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝.
███╗   ██╗███████╗██╗  ██╗████████╗    █████╗███████╗
████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝    ╚══██║██╔════╝
██╔██╗ ██║█████╗   ╚███╔╝    ██║          ██║███████╗
██║╚██╗██║██╔══╝   ██╔██╗    ██║     ██   ██║╚════██║
██║ ╚████║███████╗██╔╝ ██╗   ██║ ██╗ ╚█████╔╝███████║
╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝ ╚═╝  ╚════╝ ╚══════╝.
                                        안녕! next.js`);

export default function AppHead(){
                                                                                         
    return(
    <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="theme-color" content="#fff" />
        <meta name="robots" content="noindex,nofollow" />

        <link rel="manifest" href="/manifest.json" />
        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        <link href="/style.css" rel="stylesheet" type="text/css" />
    </Head>);

}
