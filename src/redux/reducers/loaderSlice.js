import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading: false,
    },
    reducers: {
        changeLoading: (state, action) => {
            state.isLoading = action.payload
        },
    }
})

export const { changeLoading } = loaderSlice.actions

export default loaderSlice.reducer