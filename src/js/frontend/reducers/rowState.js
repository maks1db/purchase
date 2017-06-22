const initialState = [];

function reducer(state = initialState, action){
    switch (action.type){
    case 'ROW_STATE':
        return action.payload;
    default:
        return state;
    }
}

export default reducer;