import React, { useState } from 'react';
import Page from '../../components/Page';
import {
  FormGroup,
  InputControl,
  InputGroup,
  TextInput,
} from '@jsluna/form'
import { Card } from '@jsluna/card';
import { OutlinedButton, FilledButton } from '@jsluna/button';
import { useHistory } from 'react-router-dom';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const Scan = () => {
    const [data, setData] = useState();
    const [isScanning, setIsScanning] = useState(false);
    const [ean, setEan] = useState("");
    const [expectedSize, setExpectedSize] = useState('');
    const [actualSize, setActualSize] = useState('');
    const [systemSize, setSystemSize] = useState(0);
    const [checkCompleted, setCheckCompleted] = useState(false);
    const [isMatch, setIsMatch] = useState(true);
    const history = useHistory();
    const scanevent = (err, result) => {
        if (result) {
            setData(result.text);
            alert(result.text);
            //history.push("/image/" + result.text);
        }
    };

    const checkStock = () => {
        fetch(window.location.origin + '/api/stock', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            setSystemSize(data);
            setIsMatch(data == actualSize);
            setCheckCompleted(true);
        })
        .catch((error) => {console.error('Error:', error);
        });
    }

    const newScan = () => {
        setExpectedSize('');
        setActualSize('');
        setCheckCompleted(false);
    }

    return (
        <Page>
                <Card className="ln-u-border" style={{maxWidth: "34.75rem", margin:"0 auto"}}>
                    {!checkCompleted &&
                    <>
                    <FormGroup name="scan">
                        <OutlinedButton className="ln-c-button--full" onClick={() => setIsScanning(!isScanning)}>{!isScanning ? "Scan Barcode" : "Cancel"}</OutlinedButton>
                        {isScanning && <BarcodeScannerComponent
                            height={500}
                            torch={true}
                            onUpdate={scanevent}
                        /> }
                    </FormGroup>
                    <FormGroup name="product-name" label="Product name (on packaging)">
                        <InputGroup>
                            <InputControl>
                                <TextInput placeholder="Enter product info..." />
                            </InputControl>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup name="sku-number" label="SKU number">
                        <InputGroup>
                            <InputControl>
                                <TextInput placeholder="Enter SKU number..." />
                            </InputControl>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup name="ean-number" label="EAN/Product number">
                        <InputGroup>
                            <InputControl>
                                <TextInput placeholder="Enter EAN/Product number..." name="ean" value={ean} onChange={e => setEan(e.target.value)} />
                            </InputControl>
                        </InputGroup>
                    </FormGroup>
                   
                    <FormGroup name="expectedSize" label="Expected Pack Size">
                        <InputGroup>
                            <InputControl>
                                <TextInput placeholder="Enter expected pack size..." name="expectedSize" value={expectedSize} onChange={e => setExpectedSize(e.target.value)} />
                            </InputControl>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup name="actual" label="Actual Pack Size">
                        <InputGroup>
                            <InputControl>
                                <TextInput placeholder="Enter actual pack size..." name="actualSize" value={actualSize} onChange={e => setActualSize(e.target.value)} />
                            </InputControl>
                        </InputGroup>
                    </FormGroup>     
                    <FormGroup name="scan">
                        <FilledButton onClick={() => checkStock()} className="ln-c-button--full"> Check Pack Size </FilledButton>
                    </FormGroup>
                    </>
                    }
                    {checkCompleted && isMatch &&
                        <div className="ln-u-bg-color-success ln-u-color-white ln-u-padding">The Actual Pack Size matches the System Pack Size of {systemSize}</div>
                    }
                    {checkCompleted && !isMatch &&
                        <>
                            <div className="ln-u-bg-color-error ln-u-color-white ln-u-padding">The Actual Pack Size does not match the System Pack Size of {systemSize}</div>
                            <FormGroup name="newScan">
                                <FilledButton className="ln-c-button--full ln-u-margin-top" onClick={() => history.push(`/reportshrink/${ean}`)}>Report</FilledButton>
                            </FormGroup>
                        </>
                    }
                    {checkCompleted &&
                        <FormGroup name="newScan">
                            <OutlinedButton className="ln-c-button--full ln-u-margin-top" onClick={() => newScan()}>New Scan</OutlinedButton>
                        </FormGroup>
                    }
                </Card>
        </Page>
    );
};

export default Scan;