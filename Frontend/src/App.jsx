import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import View from './pages/View';
import Edit from './pages/Edit';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/view/:id" element={<View />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </>
    );
}

export default App;
