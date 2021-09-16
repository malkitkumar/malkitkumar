import React, { useState } from 'react';
import Page from '../../components/Page';
import { OutlinedButton } from '@jsluna/button';
import { useHistory } from 'react-router-dom';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Home = () => {
    const [data, setData] = useState();
    const history = useHistory();
    const scanevent = (err, result) => {
        if (result) {
            setData(result.text);
            history.push("/image/" + result.text);
        }
    };

    return (
        <Page>
            <BarcodeScannerComponent
                height={500}
                torch={true}
                onUpdate={scanevent}
            />
        </Page>
    );
};

export default Home;