import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux"; // Assuming you're using Redux
import {
    activateLoadingItem,
    clearItem,
} from "@/src/application/redux/slices/itemSlice";

const RouteChangeContext = createContext();

export const RouteChangeProvider = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        // Function to handle route change before navigation
        const handleRouteChangeStart = (url) => {
            // Get the last part of the URL path
            const urlParts = url.split("/");
            const lastPart = urlParts[urlParts.length - 1];

            // Check if the last part of the URL is a number (ID)
            const isId = /^\d+$/.test(lastPart); // Matches if the last part is only digits

            dispatch(clearItem());

            if (isId) {
                // Dispatch action for pages with ID (e.g., /el/146)
                dispatch(activateLoadingItem());
            }
        };

        // Listen to 'routeChangeStart' event (before the route changes)
        router.events.on("routeChangeStart", handleRouteChangeStart);

        // Cleanup listener on component unmount
        return () => {
            router.events.off("routeChangeStart", handleRouteChangeStart);
        };
    }, [router, dispatch]);

    return (
        <RouteChangeContext.Provider value={{}}>
            {children}
        </RouteChangeContext.Provider>
    );
};

// Custom hook to use the RouteChangeContext, in case you want to expose other functionality
export const useRouteChange = () => useContext(RouteChangeContext);
