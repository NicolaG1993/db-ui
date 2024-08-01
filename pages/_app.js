import "@/src/application/styles/globals.css";
import AppProviders from "@/src/domains/_app/components/AppProviders/AppProviders";
import Layout from "@/src/domains/_app/constants/layout";

export default function App({ Component, pageProps }) {
    //================================================================================
    // Layout Functions
    //================================================================================
    // NB:
    // const router = useRouter(); // non si puó usare dentro utils (non components)
    // non si puó importare axios e fare fetch dentro Persistent Component come Layout o Header (non vere pages)

    //================================================================================
    // Render APP
    //================================================================================
    return (
        <AppProviders>
            <Layout>
                {({ showTooltip, hideTooltip }) => (
                    <Component
                        {...pageProps}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                    /> // do we use pageProps? 🔴 why can we pass showTooltip and hideTooltip inside it directly? 🔴
                )}
            </Layout>
        </AppProviders>
    );
}
