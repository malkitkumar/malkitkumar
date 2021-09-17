import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';
import { FilledButton } from '@jsluna/button';
import { useHistory } from 'react-router-dom';


import Card from '../../components/Card'

import { GridWrapper, GridItem } from "@jsluna/grid";


const Home = () => {
    const [data, setData] = useState([]);
    const history = useHistory();
   
    const loadblob = () => {
       
   
            fetch(window.location.origin + '/api/issue', {
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



    useEffect(() => {
        loadblob();
    }, []);

    return (
        <Page>
            <Card className="ln-c-card ln-c-card--soft" >
               <h4>Active Pack size - Shrink issues</h4>
                <div className="ln-c-table-container">
                    <table className="ln-c-table">
                        <thead className="ln-c-table__header">
                            <tr className="ln-c-table__row ln-c-table__header-row">
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left" >Product Name</th>
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left">EAN Number</th>
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left">Sku Number</th>
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-center">Expected Pack Size</th>
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-center">Actual Pack Size</th>
                            </tr>
                        </thead>
                        <tbody className="ln-c-table__body">
                            {
                                data.map((item, index) => (

                                    <tr className="ln-c-table__row">
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-left"  >{item.productName}</td>
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-left"  >{item.eanNumber}</td>
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-left"  >{item.skuNumber}</td>
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-center"  >{item.expectedNumber}</td>
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-center"  >{item.actualNumber}</td>
                                    </tr>

                                ))}</tbody>
                    </table></div>
            </Card>
            <FilledButton onClick={() => history.push("/scan")} className="ln-c-button--full"> Report New Issue </FilledButton>
        </Page>
    );
};

export default Home;