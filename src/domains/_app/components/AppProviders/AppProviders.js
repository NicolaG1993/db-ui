import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "@/src/application/redux/store";
import { ErrorBoundary } from "react-error-boundary";
// import ErrorBoundary from "@/src/domains/_app/components/Error/components/ErrorApp/ErrorBoundary";
import ErrorApp from "@/src/domains/_app/components/Error/components/ErrorApp/ErrorApp";
import { TooltipProvider } from "@/src/domains/_app/contexts/TooltipContext";
import { SettingsProvider } from "@/src/domains/_app/contexts/SettingsContext";
import GlobalStyles from "@/src/domains/_app/components/GlobalStyles/GlobalStyles";

export default function AppProviders({ children }) {
    function logError(error, info) {
        // Use your preferred error logging service
        // console.error("🔴 Caught an error:", error, info);
        // Do something with the error, e.g. log to an external API
        // <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    }

    // const userId = 3; // 🔴 Replace with actual user ID logic

    return (
        <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Provider store={store}>
                <SettingsProvider>
                    <TooltipProvider>
                        <ErrorBoundary
                            FallbackComponent={ErrorApp}
                            onError={logError}
                        >
                            <GlobalStyles />
                            {children}
                        </ErrorBoundary>
                    </TooltipProvider>
                </SettingsProvider>
            </Provider>
        </SnackbarProvider>
    );
}
