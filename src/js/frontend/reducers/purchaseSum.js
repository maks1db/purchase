const initialState = 0;

function reducer(state = initialState, action){
    switch (action.type){
    case 'PURCHASE_SUM':
        return action.payload;
    default:
        return state;
    }
}

export default reducer;