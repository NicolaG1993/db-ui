import axios from "axios";
import { useEffect, useState } from "react";
import { sortByObjDate } from "@/utils/orderData";
import ShortList from "@/src/lib/domains/_app/components/ShortList/ShortList";
import HomeHeading from "@/src/lib/domains/home/components/HomeHeading";
import HomeSearchbar from "@/src/lib/domains/home/components/HomeSearchBar";

export default function Home() {
    //================================================================================
    // Component State
    //================================================================================
    const [groupA, setGroupA] = useState();
    const [groupB, setGroupB] = useState();

    //================================================================================
    // Initial Fetch
    //================================================================================
    const fetchData = async () => {
        try {
            let groupAResp;
            let groupBResp;

            let { data } = await axios.get(`/api/home`);
            if (data) {
                if (data.groupA) {
                    groupAResp = sortByObjDate(
                        data.groupA,
                        "created_at",
                        "asc"
                    );
                    setGroupA(groupAResp.reverse().slice(0, 6));
                }
                if (data.groupB) {
                    groupBResp = sortByObjDate(
                        data.groupB,
                        "created_at",
                        "desc"
                    );
                    setGroupB(groupBResp.slice(0, 6));
                }
            }
        } catch (error) {
            console.error("❤❤❤ FETCH ERROR: ", error);
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
