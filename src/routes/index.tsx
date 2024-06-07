import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Dashboard from "../pages/Dashboard";
import Repository from "../pages/Repository";
import GlobalStyle from "../styles/globals";


const Router: React.FC = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/repository/*" element={<Repository/>} />
            </Routes>
        </BrowserRouter>
        <GlobalStyle/>
        </>
}

export default Router;
