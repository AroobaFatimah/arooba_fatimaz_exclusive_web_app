import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import activePageSlice from "./features/activePage/activePageSlice";
import productsSlice from "./features/products/productsSlice";
import registeredUsersSlice from "./features/registeredUsers/registeredUsersSlice";

const persistProductsConfig = {
    key: 'products', 
    storage,
};

const persistUsersConfig = {
    key: 'users', 
    storage,
};

const persistedUsersReducer = persistReducer(persistUsersConfig, registeredUsersSlice);
const persistedProductsReducer = persistReducer(persistProductsConfig, productsSlice);

const store = configureStore({
    reducer: {
        activePage: activePageSlice,
        products: persistedProductsReducer,
        users: persistedUsersReducer
    },
})

export default store;
export const persistor = persistStore(store);
