import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo') ?? null),
    serverMessage: null,
    serverStatus: null,
    loading: false,
    error: null,
    orders: []
};

export const userSlice = createSlice({
    reducers: {
        setUserOrders: (state, { payload }) => {
            console.log({ payload });
            state.orders = payload;
            state.loading = false;
            state.error = null;
        },
        verificationEmail: state => {
            console.log({ state });
            state.userInfo.active = true;
            state.loading = false;
            state.error = null;
        },
        userLogin: (state, { payload }) => {
            state.userInfo = payload;
            state.loading = false;
            state.error = null;
        },
        stateReset: state => {
            state.serverMessage = null;
            state.loading = false;
            state.error = null;
        },
        setServerResponseMessage: (state, { payload }) => {
            state.serverMessage = payload;
            state.loading = false;
        },
        setServerResponseStatus: (state, { payload }) => {
            state.serverStatus = payload;
            state.loading = false;
        },
        userLogout: state => {
            state.loading = false;
            state.userInfo = null;
            state.error = null;
        },
        setError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        setLoading: state => {
            state.loading = true;
        }
    },
    name: 'user',
    initialState
});

export const {
    setServerResponseMessage,
    setServerResponseStatus,
    verificationEmail,
    setUserOrders,
    setLoading,
    userLogout,
    stateReset,
    userLogin,
    setError
} = userSlice.actions;

export default userSlice.reducer;
