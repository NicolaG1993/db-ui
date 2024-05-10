import { useDispatch, useSelector, useStore } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch; // useDispatch.withTypes();
export const useAppSelector = useSelector;
export const useAppStore = useStore;
