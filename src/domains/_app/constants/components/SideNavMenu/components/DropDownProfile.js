import { useSelector } from "react-redux";
import { selectUserState } from "@/src/application/redux/slices/userSlice";
import styles from "@/src/domains/_app/constants/components/SideNavMenu/SideNavMenu.module.css";

export default function DropDownProfile() {
    // USER
    // keep using redux and cookies - or create userContext ? 🧠
    let userInfo = useSelector(selectUserState);
    console.log("userInfo: ", userInfo);

    return (
        <div className={styles.dropDown} id={styles.Profile}>
            <div className={styles.profilePic}></div>
            <div className={styles.profileInfo}>
                <div>
                    {/* <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p> */}
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    {/* Add "is admin", only if admin */}
                </div>
                <div>
                    <p>Edit Profile</p>
                </div>
                {/* 
                            • Database Seguiti
                            • I miei Database 
                */}
            </div>
        </div>
    );
}
