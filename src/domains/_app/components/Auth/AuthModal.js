import { useState } from "react";
import LoginForm from "@/src/domains/_app/components/Auth/components/LoginForm.js";
import RegistrationForm from "@/src/domains/_app/components/Auth/components/RegistrationForm.js";

export default function AuthModal() {
    const [tab, setTab] = useState("login");

    const handleTab = (str) => setTab(str);

    return (
        <main id={"HomeMain"}>
            {tab === "login" ? (
                <LoginForm handleTab={handleTab} />
            ) : (
                <RegistrationForm handleTab={handleTab} />
            )}
        </main>
    );
}
