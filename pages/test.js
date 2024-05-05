import { getError } from "@/src/application/utils/error";
import TestComponent from "@/src/domains/_test/components/TestComponent";
import { useEffect, useState } from "react";

// export default function Test() {
//     const [formState, setFormState] = useState({ name: "" });

//     const updateState = (str, tag) => {
//         console.log("updateState activated:", str);
//         setFormState({ ...formState, [tag]: str });
//     };

//     useEffect(() => {
//         console.log("formState changed:", formState);
//     }, [formState]);

//     return (
//         <main>
//             <h1>Test Area</h1>
//             <TestComponent formState={formState} updateState={updateState} />
//         </main>
//     );
// }

// 🧠 THIS SHOWS HOW TO HANDLE ERRORS PROPERLY
// ALSO IN A CHAIN OF ASYNC FNs 🧠
export default function Test() {
    const formObject = { name: "Test Item", pic: "/some-url.com" };
    const [error, setError] = useState();

    const confirmChanges = (e) => {
        e.preventDefault();
        setError();

        submitForm(formObject)
            .then((res) => {
                console.log("💦 RES: ", { res, formObject });

                if (res?.code === 200) {
                    console.log("🟢 confirmChanges finished correctly!", res);
                }
            })
            .catch((error) => {
                console.log("🌸 error: ", getError(error));
                setError(getError(error));
            });
    };

    return (
        <main>
            <h1>Test Area</h1>
            <button onClick={(e) => confirmChanges(e)}>Create item</button>

            {error && <div className="form-error">{error}</div>}
        </main>
    );
}

const submitForm = async (obj) => {
    let finalRes;

    if (obj.pic) {
        const imageRes = await uploadImage(obj);
        console.log("imageRes: ", imageRes);

        if (imageRes?.code === 200) {
            finalRes = await createItem(imageRes.data);
            return { data: finalRes, code: 200 };
        } else {
            // ? throw error
            // try delete this and throw error here
            throw new Error("Error in imageRes 🔥");
        }
    } else {
        finalRes = await createItem(obj);
        return { data: finalRes, code: 200 };
    }
};

const createItem = async (obj) => {
    const res = await fakeApiRequest({
        obj,
        name: "createItem",
        broken: false,
    });
    return res;
};

const uploadImage = async (obj) => {
    const res = await fakeApiRequest({
        obj,
        name: "uploadImage",
        broken: false,
    });
    return res;
};

const fakeApiRequest = ({ obj, name, broken }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!broken) {
                console.log(name + " done ✅", obj);
                resolve({ data: obj, code: 200 });
            } else {
                reject(new Error(name + " error 🔴"));
            }
        }, 2000);
    });
};
