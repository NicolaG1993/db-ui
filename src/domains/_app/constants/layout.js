import Head from "next/head";
import { useEffect, useState } from "react";

import { keepTheme } from "@/src/domains/_app/constants/actions/themes";
import Header from "@/src/domains/_app/constants/components/Header/Header";
import Footer from "@/src/domains/_app/constants/components/Footer/Footer";
import Widgets from "@/src/domains/_app/constants/components/Widgets/Widgets";
import SessionPlaylist from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist";

import { useDispatch } from "react-redux";
import fetchS3SettingsFile from "@/src/domains/_app/actions/fetchS3SettingsFile.js";
import {
    changeSettings,
    restoreDefaultSettings,
} from "@/src/application/redux/slices/appSettingsSlice.js";

import AuthModal from "@/src/domains/_app/components/Auth/AuthModal.js";
import { useSelector } from "react-redux";
import {
    selectUserState,
    userLogin,
} from "@/src/application/redux/slices/userSlice.js";
import styles from "@/src/application/styles/Layout.module.css";
import RandomNumberButton from "./components/Widgets/RandomNumberButton";
import SessionPlaylistButton from "./components/Widgets/SessionPlaylistButton";

export default function Layout({ children, getRandomMovie }) {
    //================================================================================
    // State
    //================================================================================
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [showAuthModal, setShowAuthModal] = useState(true);
    let userInfo = useSelector(selectUserState);

    useEffect(() => {
        keepTheme();
        authCheck();
    }, []);

    useEffect(() => {
        setUser(userInfo);
        userInfo && setShowAuthModal(false);
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

    const authCheck = () => {
        if (process.env.NODE_ENV === "development") {
            setShowAuthModal(false);
            dispatch(userLogin({ id: 3 })); // setting id to enable API requests in DEV
        } else if (process.env.NODE_ENV === "production") {
            setShowAuthModal(true);
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
            {showAuthModal ? (
                <AuthModal />
            ) : (
                <>
                    <Header getRandomMovie={getRandomMovie} />
                    {children}
                    <Widgets />
                    <Footer />
                </>
            )}
        </>
    );
}
