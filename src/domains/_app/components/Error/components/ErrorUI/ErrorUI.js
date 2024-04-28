import standardStyles from "./ErrorUI.module.css";

//////////////////////////////
// ERROR COMPONENT
//////////////////////////////
export default function ErrorUI(props) {
    let styles = props.styles || standardStyles;
    props.error && console.error("ErrorUI: ", props.error);

    return (
        <div className={styles.err}>
            <span>{props.error}</span>
        </div>
    );
}
