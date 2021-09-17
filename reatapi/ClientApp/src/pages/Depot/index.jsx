import React, { useState, useEffect } from 'react';
import Page from '../../components/Page';
import { OutlinedButton } from '@jsluna/button';
import { useHistory } from 'react-router-dom';


import Card from '../../components/Card'

import { GridWrapper, GridItem } from "@jsluna/grid";


const Depot = () => {
    const [data, setData] = useState([]);
    const history = useHistory();
   
    const loadblob = () => {
       
   
        fetch(window.location.origin + '/api/Issue/GetDepotDashboard', {
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
  
    const viewDetails = (item) => {
       
        history.push("/details/" + item.eanNumber + "/"+true);
    }

    useEffect(() => {
        loadblob();
    }, []);

    return (
        <Page>
            <Card className="ln-c-card ln-c-card--soft" >
                <div class="style_topbar__1FknK ln-u-margin-bottom" style={{ backgroundColor: "#f06c00", color: "white", height: "30px", padding: "5px", fontFamily:"MaryAnn, Trebuchet MS, Arial, Helvetica, sans-serif"}}><h5>Active Pack Size - Shrinks</h5></div>
            
                <div className="ln-c-table-container">
                    <table className="ln-c-table">
                        <thead className="ln-c-table__header">
                            <tr className="ln-c-table__row ln-c-table__header-row">
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left" >Store Name</th>
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left" >Product Name</th>
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-left">EAN Number</th>
                            
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-center">Expected Pack Size</th>
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-center">Actual Pack Size</th>
                                <th className="ln-c-table__header-cell ln-c-table__header-cell--text-align-center">Delivery Date</th>
                            </tr>
                        </thead>
                        <tbody className="ln-c-table__body">
                            {
                                data.map((item, index) => (

                                    <tr className="ln-c-table__row" onClick={() => viewDetails(item)} style={{ cursor: "pointer" }}>
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-left"  >{item.store}</td>
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-left"  >{item.productName}</td>
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-left"  >{item.eanNumber}</td>                                    
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-center"  >{item.expectedNumber}</td>
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-center"  >{item.actualNumber}</td>
                                        <td className="customCol ln-c-table__cell ln-c-table__cell--text-align-center"  >{item.reportedDate}</td>
                                    </tr>

                                ))}</tbody>
                    </table></div>
            </Card>


        </Page>
    );
};

export default Depot;