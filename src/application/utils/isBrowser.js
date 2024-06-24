// utility function to check for the presence of sessionStorage.
const isBrowser = () =>
    typeof window !== "undefined" &&
    typeof window.sessionStorage !== "undefined";

export default isBrowser;
