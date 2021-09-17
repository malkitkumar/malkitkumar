import React, { useState, useRef, useCallback } from 'react';
import Webcam from "react-webcam";
import Page from '../../components/Page';
import {
  FormGroup,
  SelectField,
  RadioButtonField 
} from '@jsluna/form'
import { Card } from '@jsluna/card';
import { OutlinedButton, FilledButton } from '@jsluna/button';

const options = {
    width: 500,
    height: 500,
    facingMode: "user"
};

const ReportShrink = () => {
    const webcamRef = useRef(null);
    const [deliveredInLast7Days, setDeliveredInLast7days] = useState('');
    const [selectedDelivery, setSelectedDelivery] = useState('');
    const [comments, setComments] = useState(null);
    const [isTakingPictures, setIsTakingPictures] = useState(false);
    const [imageSrc, setimageSrc] = useState([]);
    const [camOnOff, setcamOnOff] = useState(false);

    const capture = useCallback(
        () => {            
            const image = webcamRef.current.getScreenshot();
            setimageSrc(imageSrc => [...imageSrc, image]);            
        },
        [webcamRef]
    );

    const submit = (e) => {
        e.preventDefault();
    }

    return (
        <Page>
            <Card className="ln-u-border">

                {!isTakingPictures ? 
                    <>
                        <RadioButtonField
                            label="Delivered in the last 7 days?"
                            name="radio-button-field-2"
                            listType="inline"
                            value={deliveredInLast7Days}
                            onChange={e => setDeliveredInLast7days(e.target.value)}
                            options={[
                                { value: 'yes', label: 'Yes' },
                                { value: 'no', label: 'No' },
                            ]} />
                        {deliveredInLast7Days === "yes" &&
                            <SelectField
                                name='delivery'
                                label='Which Delivery'
                                options={[]}
                                value={selectedDelivery}
                                onChange={(e) => setSelectedDelivery(e.target.value)}
                            />
                        }
                        {deliveredInLast7Days !== "" &&
                            <>
                            <FormGroup name="coments" label="Any other comments to help us fix this for you?">
                                <textarea
                                    rows='6'
                                    onChange={(e) => {
                                    setComments(e.target.value);
                                    }}
                                    style={{ width: '100%', border: '1px solid #adadad' }}
                                ></textarea>
                            </FormGroup>
                            <OutlinedButton onClick={() => setIsTakingPictures(true)} className="ln-c-button--full ln-u-margin-bottom">Add Photos</OutlinedButton>
                            {imageSrc.length > 0 &&
                                <div>
                                {
                                    (imageSrc).map(item => (
                                        <span>
                                            <img src={item} style={{ width: '125px', height: '125px', margin:'5px' }} alt="failed capturing photo" />                                    
                                        </span>
                                    ))
                                }
                            </div>
                            }
                            <FilledButton onClick={() => submit()} className="ln-c-button--full ln-u-margin-top">Submit</FilledButton>
                            </>
                        }
                    </>
                :
                    <>
                     <div>
                        <Webcam
                            audio={false}
                            height={500}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={500}
                            videoConstraints={options}
                            />
                    </div>
                    <FilledButton onClick={capture} className="ln-c-button--full ln-u-margin-bottom">Capture photo</FilledButton>
                    <OutlinedButton onClick={() => setIsTakingPictures(false)} className="ln-c-button--full">Done</OutlinedButton>
                    </>
                }
            </Card>
        </Page>
    );
};

export default ReportShrink;