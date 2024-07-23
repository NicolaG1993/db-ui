const createOrderOptions = (data, rawIndex) =>
    data.map((el, i) => {
        return (
            <option key={`order option: ${i + 1} ${rawIndex + 1}`} value={i}>
                {i + 1}
            </option>
        );
    });
export default createOrderOptions;
