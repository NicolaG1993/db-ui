import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import "@/src/application/styles/globals.css";
import store from "@/src/application/redux/store";
// import { getRandomMovieID } from "@/src/domains/_app/actions/customFetchers";
import Layout from "@/src/domains/_app/constants/layout";

import { ErrorBoundary } from "react-error-boundary";
// import ErrorBoundary from "@/src/domains/_app/components/Error/components/ErrorApp/ErrorBoundary";
import ErrorApp from "@/src/domains/_app/components/Error/components/ErrorApp/ErrorApp";

export default function App({ Component, pageProps }) {
    //================================================================================
    // Layout Functions
    //================================================================================
    // const router = useRouter(); // non si puó usare dentro utils (non components)

    /*const getRandomMovie = async () => {
        const id = await getRandomMovieID();
        router.push(`/el/movie/${id}`);
    }; // non si puó importare axios e fare fetch dentro Persistent Component come Layout o Header (non vere pages)
*/

    function logError(error, info) {
        // Use your preferred error logging service
        console.error("Caught an error:", error, info);
        // Do something with the error, e.g. log to an external API
        // <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    }

    //================================================================================
    // Render APP
    //================================================================================
    return (
        <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Provider store={store}>
                <ErrorBoundary FallbackComponent={ErrorApp} onError={logError}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ErrorBoundary>
            </Provider>
        </SnackbarProvider>
    );
}
