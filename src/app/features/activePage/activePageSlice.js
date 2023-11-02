import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activePage: "",
    subTotal: 0,
}
export const activePageSlice = createSlice({
    name: 'activePage',
    initialState,
    reducers: {
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setSubtotal: (state, action) => {
            const {total} = action.payload;
            state.subTotal += (+(total));
        }

    },
})

export const {setActivePage, setSubtotal} = activePageSlice.actions;
export default activePageSlice.reducer;