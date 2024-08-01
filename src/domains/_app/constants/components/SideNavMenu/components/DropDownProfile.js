import styles from "@/src/domains/_app/constants/components/SideNavMenu/SideNavMenu.module.css";

export default function DropDownProfile() {
    return (
        <div className={styles.dropDown} id={styles.Profile}>
            <div className={styles.profilePic}></div>
            <div className={styles.profileInfo}>
                <div>
                    {/* <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p> */}
                    <p>Name: {"Nicola Gaioni"}</p>
                    <p>Email: {"n.i.k.93@live.it"}</p>
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
