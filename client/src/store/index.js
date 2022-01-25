import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer';
import thunk from "redux-thunk";

const store = createStore(rootReducer,
    compose(
       applyMiddleware(thunk)
         // la librería redux-devtools-extension tiene composeWithDevTools
       )                                                                             //
   );


export default store