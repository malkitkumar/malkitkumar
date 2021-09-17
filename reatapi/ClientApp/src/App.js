import React, { useEffect } from 'react';
import { Route } from 'react-router';
import './custom.css';
import Header from './components/Header';
import Scan from './pages/Scan';
import Home from './pages/Home';
import Depot from './pages/Depot';
import Details from './pages/Details';
import CaptureImage from './pages/CaptureImage';

export default function App() {

    return (
        <>
            <Header />
            <Route exact path='/' component={Home} />
            <Route exact path='/Depot' component={Depot} />
            <Route exact path='/Scan' component={Scan} />
            <Route exact path='/Details/:id' component={Details} />
            
            <Route exact path='/image/:barcode' component={CaptureImage} />
        </>
    );
}
