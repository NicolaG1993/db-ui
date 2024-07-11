import isBrowser from "@/src/application/utils/isBrowser";
import Cookies from "js-cookie";

// Function to get data from sessionStorage
// sessionStorage is not shared between tabs
function getStoredData(name) {
    let storedData;
    if (isBrowser() && sessionStorage.getItem(name)) {
        storedData = sessionStorage.getItem(name);
    }
    return storedData ? JSON.parse(storedData) : [];
}

function getStoredPersistenData(name) {
    let storedData;
    if (isBrowser() && localStorage.getItem(name)) {
        storedData = localStorage.getItem(name);
    }
    return storedData ? JSON.parse(storedData) : [];
}

function getStoredCookie(name) {
    return Cookies.get(name) ? JSON.parse(Cookies.get(name)) : [];
}

function getStoredSettings() {
    return Cookies.get("tournamentSettings")
        ? JSON.parse(Cookies.get("tournamentSettings"))
        : { contendersPerMatch: 2, totContenders: undefined, order: "index" };
}

export {
    getStoredData,
    getStoredPersistenData,
    getStoredCookie,
    getStoredSettings,
};
