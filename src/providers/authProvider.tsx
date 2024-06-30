import React from 'react';
import {Provider} from "react-redux";
import {store} from "@/redux/store";

const AuthProvider = ({children}:any) => {
    return (
       <Provider store={store}>
           {children}
       </Provider>
    );
};

export default AuthProvider;