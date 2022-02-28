import React from 'react';
import MainPage from './mainPage/MainPage';
import { BrowserRouter as Router} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <MainPage />
        </Router>

    )
}