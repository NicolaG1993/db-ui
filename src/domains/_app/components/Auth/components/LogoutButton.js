import { userLogout } from "@/src/application/redux/slices/userSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(userLogout());
        setTimeout(() => router.push("/"), 3000); // Redirect to login page
    };

    return (
        <button onClick={() => handleLogout()} className="button-standard">
            Logout
        </button>
    );
};

export default LogoutButton;
