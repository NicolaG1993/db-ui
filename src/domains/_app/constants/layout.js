import Head from "next/head";
import { useEffect } from "react";

import { keepTheme } from "@/src/lib/domains/_app/constants/actions/themes";
import Header from "@/src/lib/domains/_app/constants/components/Header/Header";
import Footer from "@/src/lib/domains/_app/constants/components/Footer/Footer";
import SessionUI from "@/src/lib/domains/_app/constants/components/SessionUI/SessionUI";

export default function Layout({ children, getRandomMovie }) {
    useEffect(() => {
        keepTheme();
    }, []);

    return (
        <>
            <Head>
                <meta name="theme-color" content="#ffffff" />
                <link rel="icon" href="/favicon.svg" />
                <link rel="manifest" href="/manifest.json" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="author" content="NGD • Nicola Gaioni Design" />
                <meta charSet="UTF-8" />
            </Head>
            <Header getRandomMovie={getRandomMovie} />
            {children}
            <SessionUI />
            <Footer />
        </>
    );
}
