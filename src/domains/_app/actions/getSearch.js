import axios from "axios";

export default async function getSearch(searchBar) {
    let res = { data: undefined, error: undefined };
    if (searchBar) {
        try {
            const { data } = await axios.get(`/api/search/searchbar`, {
                params: {
                    str: searchBar,
                },
            });
            res.data = data;
        } catch (error) {
            res.error = error;
        }
    }
    return res;
}
