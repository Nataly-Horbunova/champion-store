import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from './data/redux/store/store'
import {Provider} from 'react-redux'
import {ThemeProvider} from "@mui/material";
import {theme} from "./styles/mui_styles";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <React.StrictMode>
        <BrowserRouter basename='champion-store'>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </Provider>
        </BrowserRouter>

    </React.StrictMode>
);


