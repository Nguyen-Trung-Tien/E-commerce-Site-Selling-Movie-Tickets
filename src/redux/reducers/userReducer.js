import { FETCH_USER_LOGIN, FETCH_USER_ERROR, FETCH_USER_SUCCESS } from "../actions/userAction";
const INITIAL_STATE = {

    account: {
        email: '',
        auth: false,
        token: ''
    },
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_LOGIN:

            return {

                ...state, count: state.count + 1,

            };

        case FETCH_USER_ERROR:

            return {
                ...state,
                auth: false,

            };

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                email: action.data.email,
                token: action.data.token,
                auth: true,

            };


        default: return state;

    }

};

export default userReducer;