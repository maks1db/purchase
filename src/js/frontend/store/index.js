// import { createStore, applyMiddleware, compose } from 'redux';

// import thunk from 'redux-thunk';

// import rootReducer from '../reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
