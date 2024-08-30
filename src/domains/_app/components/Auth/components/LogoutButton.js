import { userLogout } from "@/src/application/redux/slices/userSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Button } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

const LogoutButton = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userLogout());
        setTimeout(() => router.push("/"), 3000); // Redirect to login page
    };

    return (
        <Button
            type="button"
            size="medium"
            label="Logout"
            customStyles={customStyles}
            onClick={() => handleLogout()}
        />
    );
};

export default LogoutButton;
