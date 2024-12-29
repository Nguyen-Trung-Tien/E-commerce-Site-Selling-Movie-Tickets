import { isError } from "lodash";
import { FETCH_USER_LOGIN, FETCH_USER_ERROR, FETCH_USER_SUCCESS, USER_LOGOUT } from "../actions/userAction";
const INITIAL_STATE = {

    account: {
        email: '',
        auth: false,
        token: ''
    },

    isLoading: false,
    isError: false,
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_LOGIN:

            return {

                ...state,
                isLoading: true,
                isError: false,


            };

        case FETCH_USER_ERROR:

            return {
                ...state,
                account: {
                    auth: false,
                },
                isLoading: false,
                isError: true,
            };

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                account: {
                    email: action.data.email,
                    token: action.data.token,
                    auth: true,
                },
                isLoading: false,
                isError: false,
            };

        case USER_LOGOUT:
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            return {
                ...state,
                account: {
                    email: '',
                    token: '',
                    auth: false,
                },
            }

        default: return state;

    }

};

export default userReducer;