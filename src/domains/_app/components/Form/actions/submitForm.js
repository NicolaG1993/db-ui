import createItem from "@/src/domains/_app/actions/createItem";
import uploadImage from "@/src/domains/_app/actions/uploadImage";

const submitForm = async ({ formState, newImage, formSettings, propsData }) => {
    let finalRes;

    const birthday = formState.birthday === "" ? null : formState.birthday;

    //questa parte é cosí perché utilizzo archivio locale su pc per questo progetto
    //qui se no dovrei fare upload img su db e salvare quel link
    if (newImage) {
        // user added a new image
        const imgRes = await uploadImage(newImage.file, formSettings.group);

        // Use the public URL returned from the API
        const picUrl = imgRes.data?.publicUrl;

        let newState = {
            ...formState,
            pic: picUrl, // AWS: imgRes.data[0].Location,
            birthday,
        };
        console.log("Creating item with data:", {
            newState,
            pic: picUrl,
        });
        finalRes = await createItem({
            formState: newState,
            formSettings,
            propsData,
        });
    } else {
        // user doesnt want to use any image or nothing changed
        finalRes = await createItem({
            formState: {
                ...formState,
                birthday,
            },
            formSettings,
            propsData,
        });
    }

    return { data: finalRes, code: 200 };
};

export default submitForm;
