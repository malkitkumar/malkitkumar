import React, { useEffect } from 'react';
import { Route } from 'react-router';
import './custom.css';
import Header from './components/Header';
import Scan from './pages/Scan';
import Home from './pages/Home';
import Details from './pages/Details';
import CaptureImage from './pages/CaptureImage';

export default function App() {

    return (
        <>
            <Header />
            <Route exact path='/' component={Home} />
            <Route exact path='/Scan' component={Scan} />
            <Route exact path='/Details/:id' component={Details} />
            
            <Route exact path='/image/:barcode' component={CaptureImage} />
        </>
    );
}
