import { combineReducers, configureStore } from '@reduxjs/toolkit';

import user from './slices/user';
import cart from './slices/cart';
import admin from './slices/admin';
import order from './slices/order';
import product from './slices/product';

const reducer = combineReducers({ product, admin, order, cart, user });

export default configureStore({ reducer });
