import axiosAuthInstance from "@/src/application/utils/axiosAuthInstance";

export default async function storeNewItemsFromUrls(
    newElements,
    sessionPlaylist
) {
    let newPlaylist = sessionPlaylist;
    // create items in db for newElements
    let { data } = await axiosAuthInstance.post("/api/movie/new-list", {
        newElements,
    });
    console.log("data: ", data);
    console.log("sessionPlaylist: ", sessionPlaylist);
    if (data) {
        // replace in sessionPlaylist the element keeping the same indexes
        let acc = 0;
        newPlaylist = sessionPlaylist.map((el) => {
            if (el.url) {
                let newEl = { id: data[acc].id, title: data[acc].title };
                acc++;
                return newEl;
            } else {
                return el;
            }
        });
    }
    console.log("newPlaylist: ", newPlaylist);
    // return the new playlist
    return newPlaylist;
}
