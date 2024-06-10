import axios from 'axios';

import { setShippingAddress, setError } from '../slices/order';

export const setAddress = data => async dispatch => {
    dispatch(setShippingAddress(data));
};

export const setPayment = () => async (dispatch, getState) => {
    console.log({ state: getState() });

    const {
        cart: { cartItems, shipping, subtotal },
        order: { shippingAddress },
        user: { userInfo }
    } = getState();

    const newOrder = { shippingAddress, cartItems, shipping, subtotal, userInfo };

    try {
        const { data } = await axios.post('/api/checkout', newOrder, {
            headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' }
        });

        window.location.assign(data.url);
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
