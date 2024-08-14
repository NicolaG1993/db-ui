import { useEffect, useState } from "react";
import ShortList from "@/src/domains/_app/components/ShortList/ShortList";
import HomeHeading from "@/src/domains/home/components/HomeHeading";
import HomeSearchbar from "@/src/domains/home/components/HomeSearchBar";
import { useErrorBoundary } from "react-error-boundary";
import getHomeData from "@/src/domains/home/actions/getHomeData";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
    activateLoadingItem,
    clearItem,
} from "@/src/application/redux/slices/itemSlice";
import { useAppContext } from "../../contexts/AppContext";

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
    const router = useRouter();
    const dispatch = useDispatch();
    const { showTooltip, hideTooltip } = useAppContext();

    const clearPreviousItem = () => {
        dispatch(clearItem());
        dispatch(activateLoadingItem());
    };

    const onCardClick = ({ id, label }) => {
        clearPreviousItem();
        router.push(`/el/${itemLabel}/${obj.id}`);
    };

    const onMouseOver = (title, description, e) => {
        showTooltip(obj[nameType], "", e);
    };
    const onMouseOut = () => {
        hideTooltip();
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main id={"HomeMain"}>
            <HomeHeading />
            <HomeSearchbar />
            <ShortList
                data={groupA}
                tableName={"actors"}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onCardClick={onCardClick}
            />
            <ShortList data={groupB} tableName={"movies"} />
        </main>
    );
}
