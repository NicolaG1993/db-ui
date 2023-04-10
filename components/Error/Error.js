import standardStyles from "./Error.module.css";

//////////////////////////////
// ERROR COMPONENT
//////////////////////////////
export default function Error(props) {
    let styles = props.styles || standardStyles;
    props.error && console.error("Error: ", props.error);

    return (
        <div className={styles.err}>
            <span>{props.error}</span>
        </div>
    );
}
