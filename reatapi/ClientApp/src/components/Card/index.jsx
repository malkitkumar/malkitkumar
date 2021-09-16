import React from 'react';
import { Card } from '@jsluna/card';


export default function Cards({title,children}) {


    return(
        <Card className="ln-u-margin-bottom ln-u-border ln-u-padding*2">
            <h3 className="ln-u-bg-color-on-brand-2 ln-u-margin-bottom*1/2">{title}</h3>
            {children}
        </Card>
    )
}

