import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';
import { OutlinedButton } from '@jsluna/button';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import style from './style.module.css'
import Card from '../../components/Card'

import { GridWrapper, GridItem } from "@jsluna/grid";


const Details = () => {
    const [data, setData] = useState([]);
    const [validate, setValidate] = useState(false);
    const history = useHistory();
    const { id, isDepot } = useParams();
    const loadblob = () => {

        fetch(window.location.origin + '/api/issue/GetDetails/' + id + "/" + isDepot, {
            method: 'GET',

        }).then(response => response.json())
            .then(data => {

                if (data.length == 0) {
                    alert("No attachments present");
                }

                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);

            });




    };
    const ValidateClick = () => {

        setValidate(true);
    }
    const viewDetails = (item) => {

        history.push("/details/" + item.eanNumber + "");
    }

    useEffect(() => {
        loadblob();
    }, []);

    return (
        <Page>
            <Card className="ln-c-card ln-c-card--soft" >
                {validate ? <div className={style.rrsuccessalert}>The Shrink issue has been reported to depot successfully</div> : <></>
                }
                <div class="style_topbar__1FknK ln-u-margin-bottom" style={{ backgroundColor: "#f06c00", color: "white", height: "30px", padding: "5px", fontFamily: "MaryAnn, Trebuchet MS, Arial, Helvetica, sans-serif" }}>
                    <h5>Shrink details for {data.eanNumber}</h5></div>


                <div className="ln-c-table-container">
                    <table className="ln-c-table">
                       
                        <tbody className="ln-c-table__body">
                            {
                              

                                <>
                                    {
                                        data.store ? <tr className="ln-c-table__row">
                                            <td className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left" style={{ width: "20%" }}><b> Store </b></td>
                                            <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-left" style={{ width: "20%" }}>{data.store}</td></tr>
                                            : <></>
                                    }
                                    <tr className="ln-c-table__row">
                                    <td className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left" style={{ width: "20%" }}><b> Product Name </b></td>
                                    <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-left" style={{ width: "20%" }}>{data.productName}</td>
                                    <td></td>
                                </tr>
                                    <tr className="ln-c-table__row">
                                        <td className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left" style={{ width: "20%" }}><b>EAN Number</b></td> <td style={{ width: "20%" }} className="customCol ln-c-table__cell ln-c-table__cell--text-align-left">{data.eanNumber}</td>
                                        <td></td>
                                    </tr>
                                    <tr className="ln-c-table__row">
                                        <td className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left" style={{ width: "20%" }}><b>SKU Number</b></td> <td style={{ width: "20%" }} className="customCol ln-c-table__cell ln-c-table__cell--text-align-left">{data.skuNumber}</td>
                                        <td></td>
                                    </tr>

                                    <tr className="ln-c-table__row">
                                        <td className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left" style={{ width: "20%" }} ><b>Expected Pack Size</b></td>  <td style={{ width: "20%" }} className="customCol ln-c-table__cell ln-c-table__cell--text-align-left">{data.expectedNumber}</td>
                                        <td></td>
                                    </tr>
                                    <tr className="ln-c-table__row"><td className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left" style={{ width: "20%" }} ><b>Actual Pack Size</b></td> <td style={{ width: "20%" }} className="customCol ln-c-table__cell ln-c-table__cell--text-align-left">{data.actualNumber}</td>
                                        <td></td>
                                    </tr>
                                    <tr className="ln-c-table__row"> <td className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left" style={{ width: "20%" }}><b>Delivery Date</b></td> <td style={{ width: "20%" }} className="customCol ln-c-table__cell ln-c-table__cell--text-align-left">{data.reportedDate}</td>
                                        <td></td>
                                    </tr></>

                                }</tbody>
                    </table></div>
            </Card>

            {data.isDepot ? <></> :<OutlinedButton onClick={() => ValidateClick()}> Validate & Report to Depot</OutlinedButton>
                }
        </Page>
    );
};

export default Details;