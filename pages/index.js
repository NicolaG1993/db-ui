import { useEffect, useState } from "react";
import ShortList from "@/src/domains/_app/components/ShortList/ShortList";
import HomeHeading from "@/src/domains/home/components/HomeHeading";
import HomeSearchbar from "@/src/domains/home/components/HomeSearchBar";
import { useErrorBoundary } from "react-error-boundary";
import { getError } from "@/src/application/utils/error";
import getHomeData from "@/src/domains/home/actions/getHomeData";

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
                message: getError(res.error),
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main id={"HomeMain"}>
            <HomeHeading />
            <HomeSearchbar />
            <ShortList data={groupA} tableName={"actors"} />
            <ShortList data={groupB} tableName={"movies"} />
        </main>
    );
}
