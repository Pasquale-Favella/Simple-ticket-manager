export const initialState = {

    user: JSON.parse(sessionStorage.getItem('user')) || 'null',

};

export const actionTypes = {
    SET_USER : "SET_USER",
    REMOVE_USER : "REMOVE_USER",
    UPDATE_PROFILE :"UPDATE_PROFILE",
};



const reducer = (state ,action) => {
    console.log(action)

    switch (action.type) {

        case actionTypes.SET_USER:
            sessionStorage.setItem('user',JSON.stringify(action.user))
            return{
                ...state,
                user:action.user
            }

        case actionTypes.REMOVE_USER:
            sessionStorage.removeItem('user');
            return{
                ...state,
                user:action.user
            }
        case actionTypes.UPDATE_PROFILE:
            sessionStorage.setItem('user',JSON.stringify(action.user))
            return{
                ...state,
                user:action.user
            }
            
        default:
            return state;
    }
}

export default reducer;