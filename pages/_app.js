import { SnackbarProvider } from "notistack";
import Layout from "@/constants/layout";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { getRandomMovieID } from "@/utils/custom/customFetches";
import { Provider } from "react-redux";
import store from "@/redux/store";

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
