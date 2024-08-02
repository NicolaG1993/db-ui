import { useState } from "react";
import LoginForm from "@/src/domains/_app/components/Auth/components/LoginForm.js";
import RegistrationForm from "@/src/domains/_app/components/Auth/components/RegistrationForm.js";
import PasswordRecoveryForm from "./components/PasswordRecoveryForm";
import PasswordResetForm from "./components/PasswordResetForm";

export default function AuthModal() {
    const [tab, setTab] = useState("login");

    const handleTab = (str) => setTab(str);

    const renderAuthView = ({ handleTab, tab }) => {
        if (tab === "login") {
            return <LoginForm handleTab={handleTab} />;
        } else if (tab === "signin") {
            return <RegistrationForm handleTab={handleTab} />;
        } else if (tab === "recovery") {
            return <PasswordRecoveryForm handleTab={handleTab} />;
        } else if (tab === "pswReset") {
            return <PasswordResetForm handleTab={handleTab} />;
        }
    };

    // Can we use the Form component here? 🧠
    return <main id={"HomeMain"}>{renderAuthView({ handleTab, tab })}</main>;
}
