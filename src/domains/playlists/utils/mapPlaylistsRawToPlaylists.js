export default function mapPlaylistsRawToPlaylists(rawPlaylists) {
    return rawPlaylists.map((rawPlaylist) => ({
        id: rawPlaylist.id,
        title: rawPlaylist.title,
        user: rawPlaylist.userid,
        createdAt: rawPlaylist.created_at,
        movies: rawPlaylist.movies.map((movie) => ({
            id: movie.movie_id,
            title: movie.movie_title,
            pic: movie.movie_pic,
            actors: movie.movie_actors.map((actor) => ({
                id: actor.actor_id,
                name: actor.actor_name,
            })),
        })),
    }));
}
