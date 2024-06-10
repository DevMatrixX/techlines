import axios from 'axios';

import { orderDelete, resetError, userDelete, getUsers } from '../slices/admin';
import { setDeliveredFlag, setLoading, getOrders, setError } from '../slices/admin';
import { setProductUpdateFlag, setReviewRemovalFlag, setProducts } from '../slices/product';

export const getAllUsers = () => async (dispatch, getState) => {
    dispatch(setLoading());

    const {
        user: { userInfo }
    } = getState();

    console.log({ config: { headers: { Authorization: `Bearer ${userInfo.token}` } } });

    try {
        const { data } = await axios.get('/api/users', { headers: { Authorization: `Bearer ${userInfo.token}` } });

        dispatch(getUsers(data));
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

export const deleteUser = id => async (dispatch, getState) => {
    dispatch(setLoading());

    const {
        user: { userInfo }
    } = getState();

    try {
        const { data } = await axios.delete(`/api/users/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch(userDelete(data));
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

export const getAllOrders = () => async (dispatch, getState) => {
    dispatch(setLoading());

    const {
        user: { userInfo }
    } = getState();

    try {
        const { data } = await axios.get('/api/orders', { headers: { Authorization: `Bearer ${userInfo.token}` } });

        dispatch(getOrders(data));
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

export const deleteOrder = id => async (dispatch, getState) => {
    dispatch(setLoading());

    const {
        user: { userInfo }
    } = getState();

    try {
        const { data } = await axios.delete(`/api/orders/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch(orderDelete(data));
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

export const setDelivered = id => async (dispatch, getState) => {
    dispatch(setLoading());

    const {
        user: { userInfo }
    } = getState();

    try {
        await axios.put(`/api/orders/${id}`, {}, { headers: { Authorization: `Bearer ${userInfo.token}` } });

        dispatch(setDeliveredFlag());
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

export const resetErrorAndRemoval = () => async dispatch => {
    dispatch(resetError());
};

export const updateProduct = product => async (dispatch, getState) => {
    dispatch(setLoading());

    const {
        user: { userInfo }
    } = getState();

    try {
        const { data } = await axios.put(`/api/products`, product, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch(resetError());
        dispatch(setProducts(data));
        dispatch(setProductUpdateFlag());
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

export const deleteProduct = id => async (dispatch, getState) => {
    dispatch(setLoading());

    const {
        user: { userInfo }
    } = getState();

    try {
        const { data } = await axios.delete(`/api/products/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch(resetError());
        dispatch(setProducts(data));
        dispatch(setProductUpdateFlag());
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

export const uploadProduct = newProduct => async (dispatch, getState) => {
    dispatch(setLoading());

    const {
        user: { userInfo }
    } = getState();

    try {
        const { data } = await axios.post(`/api/products`, newProduct, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });

        dispatch(resetError());
        dispatch(setProducts(data));
        dispatch(setProductUpdateFlag());
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

export const removeReview = (productId, reviewId) => async (dispatch, getState) => {
    const {
        user: { userInfo }
    } = getState();

    try {
        const { data } = await axios.put(
            `/api/products/${productId}/${reviewId}`,
            {},
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );

        dispatch(setProducts(data));
        dispatch(setReviewRemovalFlag());
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
