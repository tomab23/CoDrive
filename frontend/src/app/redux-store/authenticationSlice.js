import { createSlice } from '@reduxjs/toolkit';

import { getPayloadToken, isTokenValid, setToken } from './..//services/tokenServices';

/**
 * initial state: {
 *  - isAuthenticated:  check if the user is already authenticated when openning the Application
 *  - token: the token of the user
 *  - user: the user data
 * }
 * @author Peter Mollet
 */
const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
    role: null
};

export const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            const token = action.payload;
            state.token = token;
            const claims = getPayloadToken(token);
            const user = {
                username: claims.sub,
                roles: claims.role[0].authority,
            };
            state.user = user;
            state.role = user.roles;
            state.isAuthenticated = true;
            isTokenValid(token)
            setToken(action.payload);
        },
        signOut: (state) => {
            localStorage.clear();
            sessionStorage.clear();
            state.isAuthenticated = false;
        },
    },
});

export const { signIn, signOut } = authenticationSlice.actions;

export const selectIsLogged = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectHasRole = (state) => state.auth.role;

export default authenticationSlice.reducer;
