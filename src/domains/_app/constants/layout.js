import Head from "next/head";
import { useEffect, useState } from "react";

import { keepTheme } from "@/src/domains/_app/constants/actions/themes";
import Header from "@/src/domains/_app/constants/components/Header/Header";
import Footer from "@/src/domains/_app/constants/components/Footer/Footer";
import Widgets from "@/src/domains/_app/constants/components/Widgets/Widgets";
import SessionPlaylist from "@/src/domains/_app/constants/components/SessionPlaylist/SessionPlaylist";

import { shallowEqual, useDispatch } from "react-redux";
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
import { selectItemIsLoading } from "@/src/application/redux/slices/itemSlice";
import AppBlur from "./components/AppBlur/AppBlur";

export default function Layout({ children }) {
    //================================================================================
    // State
    //================================================================================
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(true);
    const [renderingApp, setRenderingApp] = useState(true); // forse si potrebbe spostare in redux
    let userInfo = useSelector(selectUserState);
    let itemIsLoading = useSelector(selectItemIsLoading, shallowEqual);

    useEffect(() => {
        keepTheme();
        authCheck();
    }, []);

    useEffect(() => {
        if (!renderingApp) {
            const delay = itemIsLoading ? 0 : 1.5;

            const timer = setTimeout(() => {
                setShowLoadingScreen(itemIsLoading);
            }, delay * 1000);

            return () => clearTimeout(timer);
        }
        setRenderingApp(false);
    }, [itemIsLoading]);

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
                    {showLoadingScreen && <AppBlur visible={itemIsLoading} />}
                    <Header />
                    {children}
                    <Widgets />
                    <Footer />
                </>
            )}
        </>
    );
}
