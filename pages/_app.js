import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import "@/src/application/styles/globals.css";
import store from "@/src/application/redux/store";
import { getRandomMovieID } from "@/src/application/utils/customFetches";
import Layout from "@/src/domains/_app/constants/layout";

export default function App({ Component, pageProps }) {
    //================================================================================
    // Layout Functions
    //================================================================================
    const router = useRouter(); // non si puó usare dentro utils (non components)
    const getRandomMovie = async () => {
        const id = await getRandomMovieID();
        router.push(`/el/movie/${id}`);
    }; // non si puó importare axios e fare fetch dentro Persistent Component come Layout o Header (non vere pages)

    //================================================================================
    // Render APP
    //================================================================================
    return (
        <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Provider store={store}>
                <Layout getRandomMovie={getRandomMovie}>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </SnackbarProvider>
    );
}
