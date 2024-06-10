import axios from 'axios';

import { clearCart } from '../slices/cart';
import { verificationEmail, setUserOrders } from '../slices/user';
import { setServerResponseMessage, setServerResponseStatus } from '../slices/user';
import { setLoading, stateReset, userLogout, userLogin, setError } from '../slices/user';

export const signUp = (name, email, password) => async dispatch => {
    dispatch(setLoading());

    try {
        const { data } = await axios.post(
            '/api/users/sign-up',
            { password, email, name },
            { headers: { 'Content-Type': 'application/json' } }
        );

        dispatch(userLogin(data));

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch(
            setError(
                error?.response && error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : 'An expected error has occurred. Please try again later'
            )
        );
    }
};

export const login = (email, password) => async dispatch => {
    dispatch(setLoading());

    try {
        const { data } = await axios.post(
            '/api/users/login',
            { password, email },
            { headers: { 'Content-Type': 'application/json' } }
        );

        dispatch(userLogin(data));

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch(
            setError(
                error?.response && error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : 'An expected error has occurred. Please try again later'
            )
        );
    }
};

export const verifyEmail = token => async dispatch => {
    dispatch(setLoading());

    try {
        await axios.get('/api/users/verify-email', {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        });

        dispatch(verificationEmail());

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userInfo.active = true;

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
        dispatch(
            setError(
                error?.response && error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : 'An expected error has occurred. Please try again later'
            )
        );
    }
};

export const sendResetEmail = email => async dispatch => {
    dispatch(setLoading());

    console.log({ email });

    try {
        const { status, data } = await axios.post(
            '/api/users/password-reset-request',
            { email },
            { headers: { 'Content-Type': 'application/json' } }
        );

        dispatch(setServerResponseMessage(data));
        dispatch(setServerResponseStatus(status));
    } catch (error) {
        console.log({ error });
        dispatch(
            setError(
                error?.response && error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : 'An expected error has occurred. Please try again later'
            )
        );
    }
};

export const resetPassword = (password, token) => async dispatch => {
    dispatch(setLoading());

    try {
        const { status, data } = await axios.post(
            '/api/users/password-reset',
            { password },
            { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
        );

        dispatch(setServerResponseMessage(data, status));
        dispatch(setServerResponseStatus(status));
    } catch (error) {
        dispatch(
            setError(
                error?.response && error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : 'An expected error has occurred. Please try again later'
            )
        );
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('userInfo');

    dispatch(userLogout());
    dispatch(clearCart());
};

export const resetState = () => async dispatch => {
    dispatch(stateReset());
};

export const googleLogin = (googleId, email, name, googleImage) => async dispatch => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post(
            '/api/users/google-login',
            { googleImage, googleId, email, name },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        dispatch(userLogin(data));

        localStorage.setItem('userInfo', data);
    } catch (error) {
        dispatch(
            setError(
                error?.response && error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : 'An expected error has occurred. Please try again later'
            )
        );
    }
};

export const getUserOrders = () => async (dispatch, getState) => {
    dispatch(setLoading());

    const {
        user: { userInfo }
    } = getState();

    try {
        const { data } = await axios.get(`/api/users/${userInfo._id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch(setUserOrders(data));
    } catch (error) {
        dispatch(
            setError(
                error?.response && error?.response?.data?.message
                    ? error.response.data.message
                    : error.message
                    ? error.message
                    : 'An expected error has occurred. Please try again later'
            )
        );
    }
};
