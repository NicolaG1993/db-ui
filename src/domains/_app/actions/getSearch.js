import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

export default async function getSearch(searchBar) {
    let res = { data: undefined, error: undefined };
    if (searchBar) {
        try {
            const { data } = await axiosAuthInstance.get(
                `/api/search/searchbar`,
                {
                    params: {
                        str: searchBar,
                    },
                }
            );
            res.data = data;
        } catch (error) {
            res.error = error;
        }
    }
    return res;
}
