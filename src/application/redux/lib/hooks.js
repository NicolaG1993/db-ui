import { useDispatch, useSelector, useStore } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector = useSelector; // useSelector.withTypes(); // withTypes ??? for typescript types maybe ?
export const useAppDispatch = useDispatch; // useDispatch.withTypes();
// 🔴🧠🔴🧠 non sto usando useAppDispatch perché non so come farlo funzionare adesso che é un callback
export const useAppStore = useStore; // a cosa serve?
