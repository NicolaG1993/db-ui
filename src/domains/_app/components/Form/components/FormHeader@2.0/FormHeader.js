export default function FormHeader({ formLabel, propsData }) {
    let message = "";

    if (propsData) {
        message = `Edit ${propsData.name || propsData.title}`;
    } else {
        message = `Create ${
            formLabel.charAt(0).toUpperCase() + formLabel.slice(1)
        }`;
    }

    return (
        <div>
            <h2>{message}</h2>
        </div>
    );
}
