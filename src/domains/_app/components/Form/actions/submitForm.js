import createItem from "@/src/domains/_app/actions/createItem";
import uploadImage from "@/src/domains/_app/actions/uploadImage";

const submitForm = async ({ formState, newImage, form, propsData }) => {
    console.log("submitForm: ", { formState, newImage, form, propsData });
    let finalRes;

    // if (formState.birthday === "") {
    //     birthday = null;
    // }

    const birthday = formState.birthday === "" ? null : formState.birthday;

    //questa parte é cosí perché utilizzo archivio locale su pc per questo progetto
    //qui se no dovrei fare upload img su db e salvare quel link
    if (newImage) {
        // user added a new image
        const imgRes = await uploadImage(newImage.file, form.group);
        let newState = {
            ...formState,
            pic: imgRes.data[0].Location,
            birthday,
        };
        finalRes = await createItem({ formState: newState, form, propsData });
    } else {
        // user doesnt want to use any image or nothing changed
        finalRes = await createItem({
            formState: {
                ...formState,
                birthday,
            },
            form,
            propsData,
        });
    }

    return { data: finalRes, code: 200 };
};

export default submitForm;
