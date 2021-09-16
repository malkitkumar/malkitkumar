import React from 'react'
import { Page } from '@jsluna/site-layout'
import { PageBody } from '@jsluna/site-layout'
import { Container } from '@jsluna/grid'
import styles from './styles.module.css'

export default function Pages({children}) {

    return(
        <Page className={styles.page}>
            <PageBody >
                <Container>
                    {children}
                </Container>
            </PageBody>
        </Page>
    )

}