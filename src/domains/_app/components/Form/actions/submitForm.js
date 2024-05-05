import createItem from "@/src/domains/_app/actions/createItem";
import uploadImage from "@/src/domains/_app/actions/uploadImage";

const submitForm = async ({ formState, newImage, form, propsData }) => {
    if (formState.birthday === "") {
        formState.birthday = null;
    }
    //questa parte é cosí perché utilizzo archivio locale su pc per questo progetto
    //qui se no dovrei fare upload img su db e salvare quel link
    if (newImage) {
        // user added a new image
        const imgRes = await uploadImage(newImage.file, form.group);
        let newState = {
            ...formState,
            pic: imgRes.data[0].Location,
        };
        return createItem(newState, form, formState, propsData);
    } else {
        // user doesnt want to use any image or nothing changed
        return createItem(formState, form, formState, propsData);
    }
};

export default submitForm;
