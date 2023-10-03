import { parseFormProps } from "./formParsers";

export default function formHydrate(formState, emptyState, propsData) {
    if (Array.isArray(propsData)) {
        return { ...form.emptyState, ids: propsData };
    } else if (typeof propsData === "object") {
        let obj = {};
        Object.entries(propsData).map(([key, value], i) => {
            if (value) {
                let parsedValue = parseFormProps(key, value);
                obj[key] = parsedValue;
            }
        });
        return { ...formState, ...obj };
    }
}
