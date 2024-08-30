import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/src/domains/_app/constants/components/SideNavMenu/SideNavMenu.module.css";
import {
    openForm,
    resetFormStore,
} from "@/src/application/redux/slices/formSlice";
// import DropDownProfile from "./components/DropDownProfile";
import DropDownPreferences from "./components/DropDownPreferences";
import {
    selectUserState,
    userLogout,
} from "@/src/application/redux/slices/userSlice";
import LogoutButton from "../../../components/Auth/components/LogoutButton";
import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";
import { Button, UserCard } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";

export default function SideNavMenu({ onClose }) {
    const dispatch = useDispatch();
    let userInfo = useSelector(selectUserState);

    // ??? They should not be handled here (Layout or Redux)

    // const [appSettings, setAppSettings] = useState(false);
    const [dropDown, setDropDown] = useState();

    // Should not be handled here
    const addTest = async (e) => {
        e.preventDefault();
        console.log("💛💛💛 TEST STARTING NOW");

        try {
            const resp = await axiosAuthInstance.post(`/api/test/new`, {
                // ...obj,
                // tags,
                // nationality,
            });
            // console.log("💚💚💚 TEST COMPLETED: ", resp);
        } catch (err) {
            console.log("🧡🧡🧡 ERROR: ", err);
        }
    };

    return (
        <div id={styles.SideNavMenu}>
            <div className={styles.dropdownsWrap}>
                <div
                    className={styles.dropdownHead}
                    onClick={() =>
                        setDropDown((prev) =>
                            prev === "profile" ? "" : "profile"
                        )
                    }
                >
                    <p>Profile</p>
                </div>

                {dropDown === "profile" && (
                    <UserCard
                        user={userInfo}
                        // onEditProfile={onEditProfile}
                        customStyles={customStyles}
                    />
                )}
                {/* {dropDown === "profile" && <DropDownProfile />} */}

                <div
                    className={styles.dropdownHead}
                    onClick={() =>
                        setDropDown((prev) => (prev === "admin" ? "" : "admin"))
                    }
                >
                    <p>Admin area</p>
                </div>

                {dropDown === "admin" && (
                    <div className={styles.dropDown}>
                        {/* <div>
                            <p>{"Admin Area"}</p>
                        </div> */}
                        <div>
                            <p>{"🚧 Work in progress..."}</p>
                        </div>
                    </div>
                )}

                <div
                    className={styles.dropdownHead}
                    onClick={() =>
                        setDropDown((prev) =>
                            prev === "settings" ? "" : "settings"
                        )
                    }
                >
                    <p>App Settings</p>
                </div>

                {dropDown === "settings" && (
                    <div className={styles.dropDown}>
                        {/* <div>
                            <p>{"App Settings"}</p>
                        </div> */}
                        <div>
                            <p>{"🚧 Work in progress..."}</p>
                        </div>
                    </div>
                )}

                <div
                    className={styles.dropdownHead}
                    onClick={() =>
                        setDropDown((prev) =>
                            prev === "preferences" ? "" : "preferences"
                        )
                    }
                >
                    <p>User Preferences</p>
                </div>

                {dropDown === "preferences" && (
                    <DropDownPreferences userId={userInfo.id} />
                )}
            </div>

            <div className={styles.content}>
                <Button
                    size="medium"
                    type="button"
                    label={"+ Add Data"}
                    customStyles={customStyles}
                    onClick={(e) => {
                        dispatch(resetFormStore()); // cleanup formState
                        dispatch(openForm()); // open Form UI
                        // setAddForm(true);
                        onClose(e);
                    }}
                />
                <Button
                    size="medium"
                    type="button"
                    label={"RUN TEST"}
                    customStyles={customStyles}
                    onClick={(e) => addTest(e)}
                    disabled={true}
                />
                <Button
                    size="medium"
                    type="button"
                    label={"TEST AREA"}
                    customStyles={customStyles}
                    onClick={(e) => {}}
                    disabled={true}
                />
                <Button
                    size="medium"
                    type="button"
                    label={"Clear Session Data"}
                    customStyles={customStyles}
                    onClick={(e) => {}}
                    disabled={true}
                />
                <Button
                    size="medium"
                    type="button"
                    label={"Data Migration"}
                    customStyles={customStyles}
                    onClick={(e) => {}}
                    disabled={true}
                />
                <LogoutButton />
            </div>
        </div>
    );
}
