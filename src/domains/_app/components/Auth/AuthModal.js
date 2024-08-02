import { useEffect, useState } from "react";
import LoginForm from "@/src/domains/_app/components/Auth/components/LoginForm.js";
import RegistrationForm from "@/src/domains/_app/components/Auth/components/RegistrationForm.js";
import PasswordRecoveryForm from "./components/PasswordRecoveryForm";
import PasswordResetForm from "./components/PasswordResetForm";
import { useRouter } from "next/router";

export default function AuthModal() {
    const router = useRouter();
    const { token } = router.query;

    const [tab, setTab] = useState("login");

    useEffect(() => {
        if (token) {
            console.log("token: ", token);
            setTab("pswReset");
        }
    }, [token]);

    const handleTab = (str) => setTab(str);

    const renderAuthView = ({ handleTab, tab }) => {
        if (tab === "login") {
            return <LoginForm handleTab={handleTab} />;
        } else if (tab === "signin") {
            return <RegistrationForm handleTab={handleTab} />;
        } else if (tab === "recovery") {
            return <PasswordRecoveryForm handleTab={handleTab} />;
        } else if (tab === "pswReset") {
            return <PasswordResetForm handleTab={handleTab} token={token} />;
        }
    };

    // Can we use the Form component here? 🧠
    return <main id={"HomeMain"}>{renderAuthView({ handleTab, tab })}</main>;
}
