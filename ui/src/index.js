import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from './data/redux/store/store'
import {Provider} from 'react-redux'
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
    palette: {
        color_accent_1: {
            main: '#D2003F'
        },
        color_accent_2: {
            main: '#FFF'
        },
        color_accent_3: {
            main: '#83025C'
        },
        main_text_color: {
            main: '#041421'
        },
        transparent:{
            main: 'transparent'
        }
    },
});


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


