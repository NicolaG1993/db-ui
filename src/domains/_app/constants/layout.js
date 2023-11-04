import Head from "next/head";
import { useEffect, useState } from "react";

import { keepTheme } from "@/src/domains/_app/constants/actions/themes";
import Header from "@/src/domains/_app/constants/components/Header/Header";
import Footer from "@/src/domains/_app/constants/components/Footer/Footer";
import SessionPlaylist from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist";

import { useDispatch } from "react-redux";
import fetchS3SettingsFile from "@/src/domains/_app/actions/fetchS3SettingsFile.js";
import {
    changeSettings,
    restoreDefaultSettings,
} from "@/src/application/redux/slices/appSettingsSlice.js";

import AuthModal from "@/src/domains/_app/components/Auth/AuthModal.js";
import { useSelector } from "react-redux";
import { selectUserState } from "@/src/application/redux/slices/userSlice.js";

export default function Layout({ children, getRandomMovie }) {
    //================================================================================
    // State
    //================================================================================
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    let userInfo = useSelector(selectUserState);

    useEffect(() => {
        keepTheme();
    }, []);

    useEffect(() => {
        setUser(userInfo);
    }, [userInfo]);

    useEffect(() => {
        if (process.env.CUSTOM_SETTINGS) {
            fetchAppSettings(process.env.CUSTOM_SETTINGS);
        } else {
            dispatch(restoreDefaultSettings());
        }
    }, [process.env.CUSTOM_SETTINGS]);

    //================================================================================
    // Functions
    //================================================================================
    const fetchAppSettings = async (objectURL) => {
        const customSettings = await fetchS3SettingsFile(objectURL);
        if (customSettings) {
            dispatch(changeSettings(customSettings));
        } else {
            dispatch(restoreDefaultSettings());
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
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
            {!user ? (
                <AuthModal />
            ) : (
                <>
                    <Header getRandomMovie={getRandomMovie} />
                    {children}
                    <SessionPlaylist />
                    <Footer />
                </>
            )}
        </>
    );
}
