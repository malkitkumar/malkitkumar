import React, { useState, useRef, useCallback, useEffect } from 'react';
import Page from '../../components/Page';
import { OutlinedButton } from '@jsluna/button';
import Webcam from "react-webcam";
import { useParams } from 'react-router';
import { Switch } from '@jsluna/form';

const options = {
    width: 500,
    height: 500,
    facingMode: "user"
};

const CaptureImage = () => {
    const { barcode } = useParams();
    const webcamRef = useRef(null);
    const [imageSrc, setimageSrc] = useState([]);
    const [camOnOff, setcamOnOff] = useState(false);

    const capture = useCallback(
        () => {            
            const image = webcamRef.current.getScreenshot();
            setimageSrc(imageSrc => [...imageSrc, image]);            
        },
        [webcamRef]
    );

    useEffect(() => {
        var code = barcode;
    },[]);

    return (
        <Page>
            <div>
                <h3>Bar code : {barcode}</h3>
                <Switch
                    name="toggle-switch"
                    label="Capture Image Toggle"
                    onClick={() => { camOnOff ? setcamOnOff(false) : setcamOnOff(true) }}
                />
                </div> <br/>
                {camOnOff ?
                <>
                    <div>
                    <Webcam
                        audio={false}
                        height={720}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={800}
                        videoConstraints={options}
                        />
                        </div>
                    <OutlinedButton onClick={capture}>Capture photo</OutlinedButton>
                    <div>
                        {
                            (imageSrc).map(item => (
                                <span>
                                    <img src={item} style={{ width: '125px', height: '125px', margin:'5px' }} alt="failed capturing photo" />                                    
                                </span>
                            ))
                        }
                    </div>
                </>
                : <></>}
        </Page>
    );
};

export default CaptureImage;