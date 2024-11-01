import Head from "next/head";
import { useEffect, useState } from "react";

// import Footer from "@/src/domains/_app/constants/components/Footer/Footer";

import { shallowEqual, useDispatch } from "react-redux";
import fetchS3SettingsFile from "@/src/domains/_app/actions/fetchS3SettingsFile.js";
import {
    changeSettings,
    restoreDefaultSettings,
} from "@/src/application/redux/slices/appSettingsSlice.js";

import AuthModal from "@/src/domains/_app/components/Auth/AuthModal.js";
import { useSelector } from "react-redux";
import { selectUserState } from "@/src/application/redux/slices/userSlice.js";

import {
    activateLoadingItem,
    clearItem,
    selectItemIsLoading,
} from "@/src/application/redux/slices/itemSlice";
import AppBlur from "@/src/domains/_app/constants/components/AppBlur/AppBlur";
import SideNavMenu from "./components/SideNavMenu/SideNavMenu";

import {
    closeForm,
    openForm,
    resetFormStore,
    selectIsFormOpen,
} from "@/src/application/redux/slices/formSlice";
import DataFormWrap from "./components/SideNavMenu/components/DataFormWrap";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import { Drawer, Header, Modal, Tooltip, WidgetsUI } from "zephyrus-components";
import getRandomMovie from "@/src/domains/_app/actions/getRandomMovie";
import {
    deleteSessionPlaylist,
    getSessionPlaylist,
    removeFromSessionPlaylist,
    selectSessionPlaylist,
    shuffleSessionPlaylist,
    updateSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";
import { useRouter } from "next/router";

export default function Layout({ children }) {
    //================================================================================
    // State
    //================================================================================
    const dispatch = useDispatch();
    const router = useRouter();
    let isItemFormOpen = useSelector(selectIsFormOpen, shallowEqual);
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);
    let userInfo = useSelector(selectUserState);
    let itemIsLoading = useSelector(selectItemIsLoading, shallowEqual);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(true);
    const [renderingApp, setRenderingApp] = useState(true); // forse si potrebbe spostare in redux
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipProps, setTooltipProps] = useState({
        title: "",
        text: "",
        position: { x: 0, y: 0 },
    });

    //================================================================================
    // Functions
    //================================================================================
    const fetchAppSettings = async (objectURL) => {
        const res = await fetchS3SettingsFile(objectURL);
        if (res.status === 200) {
            if (res.data) {
                dispatch(changeSettings(res.data));
            } else {
                dispatch(restoreDefaultSettings());
            }
        } else {
            // showBoundary({
            //     code: res.status,
            //     message: res.message,
            // }); // not working here // layout is parent of errorboundary
        }
    };

    const authCheck = () => {
        if (process.env.NODE_ENV === "development") {
            /*
            setShowAuthModal(false);
            dispatch(
                userLogin({ id: 3, name: "Admin", email: "someemail@live.it" })
            ); // setting user to enable API requests in DEV 🟠🔶🟧
            */
            setShowAuthModal(true); // previous condition not needed with this approach 🧠
        } else if (process.env.NODE_ENV === "production") {
            setShowAuthModal(true);
        }
    };

    const openDrawer = (e, invoker) => {
        e.stopPropagation();
        !isDrawerOpen && setIsDrawerOpen(true);
    };
    const closeDrawer = (e, invoker) => {
        e.stopPropagation();
        setTimeout(() => {
            isDrawerOpen && setIsDrawerOpen(false);
        }, 150);
    };

    const showTooltip = (title, text, e) => {
        setTooltipProps({
            title,
            text,
            position: { x: e.clientX, y: e.clientY },
        });
        setTooltipVisible(true);
    };

    const hideTooltip = () => {
        setTooltipVisible(false);
    };

    //================================================================================
    // UseEffects
    //================================================================================
    useEffect(() => {
        authCheck();
    }, []);

    // useEffect(() => {
    //     // NOT WORKING: BUT WHY?!?!? APP CRASH MAYBE?
    //     appError && console.log("error changes 🌸🌸🌸: ", appError);
    // }, [appError]);

    useEffect(() => {
        if (!renderingApp) {
            const delay = itemIsLoading ? 0 : 0.6;

            const timer = setTimeout(() => {
                setShowLoadingScreen(itemIsLoading);
            }, delay * 1000);

            return () => clearTimeout(timer);
        }
        setRenderingApp(false);
    }, [itemIsLoading]);

    useEffect(() => {
        // setUser(userInfo);
        userInfo?.token ? setShowAuthModal(false) : setShowAuthModal(true);
    }, [userInfo]);

    useEffect(() => {
        if (process.env.CUSTOM_SETTINGS) {
            fetchAppSettings(process.env.CUSTOM_SETTINGS);
        } else {
            dispatch(restoreDefaultSettings());
        }
    }, [process.env.CUSTOM_SETTINGS]);

    const setLoadingItem = () => {
        dispatch(activateLoadingItem());
    };

    const handleRandomMovie = async () => {
        setLoadingItem();
        const res = await getRandomMovie();
        if (res.status === 200 && res.data) {
            router.push(`/el/movie/${res.data}`);
        } else if (res.error) {
            // TODO: error handling
        }
    };

    // FIX: COMPLETARE 👇🔴 APPROCCIO CORRETTO 👍
    const widgetsConfig = [
        // 🧠 Creare dynamic button component
        // 🧠🧠 credo che noi dovremmo passare a WidgetsUI solo la lista dei components (e forse height&width? + qualche info tipo label)
        // 🧠🧠 Gli imports poi saranno gestiti dentro WidgetsUI xk sono disponibili solo i widget dentro library folder
        {
            type: "SessionPlaylist", //"Playlist", //"SessionPlaylist",
            label: "Session Playlist",
            maxHeight: "650px",
        },
        {
            type: "RandomNumbersGenerator",
            label: "Roll the dice",
            maxHeight: "100%",
            minHeight: "570px",
        },
        {
            type: "UserNotes",
            label: "Notes",
            maxHeight: "100%",
            minHeight: "570px",
        },
    ];

    //================================================================================
    // SessionPlaylist logic
    //================================================================================
    // useEffect(() => {
    //     dispatch(getSessionPlaylist());
    // }, [open]); // 🔴🔴🔴☝️ FIX: Needs to be triggered inside "WidgetsUI" 🔴🔴🔴

    const getPlaylist = () => {
        dispatch(getSessionPlaylist());
    };

    const openAddNew = () => {
        dispatch(resetFormStore()); // cleanup formState
        dispatch(openForm({ formLabel: "movie" })); // open Form UI
    };

    const removeFromPlaylist = (i) => {
        dispatch(removeFromSessionPlaylist(i));
    };
    const overridePlaylist = (playlist) => {
        dispatch(updateSessionPlaylist(playlist));
    };
    const clearPreviousItem = (url) => {
        const idPattern = /\/\d+$/;
        // if (id.toString() !== router.query.id) {
        if (idPattern.test(url)) {
            dispatch(clearItem());
            dispatch(activateLoadingItem());
        } else {
            dispatch(clearItem());
        }
    };
    const deletePlaylist = () => {
        dispatch(deleteSessionPlaylist());
    };
    const shufflePlaylist = () => {
        dispatch(shuffleSessionPlaylist());
    };

    // Maybe move this logic inside "WidgetsUI" to solve issue 👇🧠
    const handleParentUI = (uiElement, status) => {
        if (uiElement === "ADD_NEW") {
            status && openAddNew();
        } else if (uiElement === "WIDGET") {
            // !status && closeWidget(); // 🔴🔴🔴 We do this inside WidgetsUI now , delete
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

            {/* NOT RENDERING FOR SOME REASON */}
            {/* {appError ? <ErrorApp error={appError} /> : <></>} */}

            {showAuthModal ? (
                <AuthModal />
            ) : (
                <div
                    id={"Layout"}
                    onMouseMove={(e) => {
                        if (tooltipVisible) {
                            setTooltipProps((prev) => ({
                                ...prev,
                                position: { x: e.clientX, y: e.clientY },
                            }));
                        }
                    }}
                >
                    {showLoadingScreen && <AppBlur visible={itemIsLoading} />}

                    <Header
                        isDrawerOpen={isDrawerOpen}
                        openDrawer={openDrawer}
                        closeDrawer={closeDrawer}
                        handleRandomMovie={handleRandomMovie}
                        customStyles={customStyles}
                        // showTooltip={showTooltip}
                        // hideTooltip={hideTooltip}
                    />
                    <Modal
                        isOpen={isItemFormOpen}
                        onClose={() => dispatch(closeForm())}
                        customStyles={customStyles}
                    >
                        <DataFormWrap />
                    </Modal>
                    <Drawer
                        isOpen={isDrawerOpen}
                        onClose={closeDrawer}
                        title={"Menu"}
                        customStyles={customStyles}
                        showCloseButton={false}
                        top={"52px"}
                    >
                        <SideNavMenu onClose={closeDrawer} />
                    </Drawer>
                    {children({ showTooltip })}
                    {/* <Footer /> */}

                    <Tooltip
                        {...tooltipProps}
                        visible={tooltipVisible}
                        customStyles={customStyles}
                    />
                    <WidgetsUI
                        widgetsConfig={widgetsConfig}
                        playlist={sessionPlaylist}
                        playlistCounter={sessionPlaylist?.length}
                        handleParentUI={handleParentUI}
                        openAppModal={openAddNew}
                        getPlaylist={getPlaylist}
                        removeFromPlaylist={removeFromPlaylist}
                        overridePlaylist={overridePlaylist}
                        deletePlaylist={deletePlaylist}
                        shufflePlaylist={shufflePlaylist}
                        hasPlaylistWidget={true}
                        customStyles={customStyles}
                        // showTooltip={showTooltip}
                        // hideTooltip={hideTooltip}
                    />
                </div>
            )}
        </>
    );
}

/*
Fare action per formSlice che puo essere chiamata ovunque
inoltre accetta parametro per capire quale tipo di form ci serve (AddData - AddMovie - Edit Item)

In Layout (o App) apriremo un Modal contenente il tipo di ItemForm richiesto

Do the same for Items
*/
