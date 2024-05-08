import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

// we want to eventually store the data we fetch while the form is open
// we dont want to fetch it every time
// there will be a button to refresh the list, if the user want

// list not fetched are not going to be stored untill fetched
// the empty state keys will be generated from the settings file
