import { useEffect, useState } from "react";
// import ShortList from "@/src/domains/_app/components/ShortList/ShortList";
import HomeHeading from "@/src/domains/home/components/HomeHeading";
import HomeSearchbar from "@/src/domains/home/components/HomeSearchBar";
import { useErrorBoundary } from "react-error-boundary";
import getHomeData from "@/src/domains/home/actions/getHomeData";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
    activateLoadingItem,
    clearItem,
} from "@/src/application/redux/slices/itemSlice";
import { useAppContext } from "@/src/domains/_app/contexts/AppContext";
import { ShortList } from "zephyrus-components";
import customStyles from "@/src/application/styles/Zephyrus.module.css";
import dataStructureGroups from "@/src/application/settings/dataStructureGroups";
import {
    addToSessionPlaylist,
    removeElementFromSessionPlaylist,
    selectSessionPlaylist,
} from "@/src/application/redux/slices/sessionPlaylistSlice";

export default function Home() {
    //================================================================================
    // Component State
    //================================================================================
    const [groupA, setGroupA] = useState();
    const [groupB, setGroupB] = useState();
    const { showBoundary } = useErrorBoundary();

    //================================================================================
    // Initial Fetch
    //================================================================================
    const fetchData = async () => {
        const res = await getHomeData();
        if (res.status === 200 && res.data) {
            if (res.data.groupAResp) {
                setGroupA(res.data.groupAResp);
            }
            if (res.data.groupBResp) {
                setGroupB(res.data.groupBResp);
            }
        } else if (res.error) {
            showBoundary({
                code: res.status,
                message: res.message,
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    ////// CHANGES AFTER REFACTORING COMPONENTS LIBRARY
    // they have to be passed down to ShortList then to Card
    // I should create a Wrapper inside App for this? yes but after in case
    const router = useRouter();
    const dispatch = useDispatch();
    const { showTooltip, hideTooltip } = useAppContext();
    let sessionPlaylist = useSelector(selectSessionPlaylist, shallowEqual);

    const clearPreviousItem = () => {
        dispatch(clearItem());
        dispatch(activateLoadingItem());
    };

    const onMouseOver = (title, description, e) => {
        showTooltip(title, description, e);
    };
    const onMouseOut = () => {
        hideTooltip();
    };

    const onClickLink = ({ itemGroup }) => {
        clearPreviousItem();
        router.push(`/all/${itemGroup}`);
    };

    const onClickCard = ({ id, label }) => {
        clearPreviousItem();
        router.push(`/el/${label}/${id}`);
    };

    const addToPlaylist = (obj) => {
        dispatch(addToSessionPlaylist(obj));
    };
    const removeFromPlaylist = (obj) => {
        dispatch(removeElementFromSessionPlaylist(obj));
    };

    console.log("HOME PAGE: ", { groupA, groupB });

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main id={"HomeMain"}>
            <HomeHeading />
            <HomeSearchbar />

            <ShortList
                data={groupA}
                table={dataStructureGroups["actors"]}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClickCard={onClickCard}
                onClickLink={() => onClickLink({ itemGroup: "actors" })}
                customStyles={customStyles}
            />
            <ShortList
                data={groupB}
                table={dataStructureGroups["movies"]}
                cardHasOverlay={true}
                currentPlaylist={sessionPlaylist}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClickCard={onClickCard}
                onClickLink={() => onClickLink({ itemGroup: "movies" })}
                onAddItem={addToPlaylist}
                onRemoveItem={removeFromPlaylist}
                customStyles={customStyles}
            />
        </main>
    );
}
