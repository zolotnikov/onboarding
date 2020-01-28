import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Onboarding from "./Onboarding";

const initialState = {
    textY: 0
};

const reducer = (state = initialState, action) => {
    if (action.type === "UPDATE_TEXTY") {
        return { textY: action.textY };
    }
    return state;
};

const store = createStore(reducer);

const App = () => {
    return (
        <Provider store={store}>
            <Onboarding />
        </Provider>
    );
};

export default App;
