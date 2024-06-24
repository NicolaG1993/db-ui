const getCurrentMatchLoser = (contenders, winner) => {
    return Object.values(contenders).find((cont) => cont.id !== winner.id);
};

export default getCurrentMatchLoser;
