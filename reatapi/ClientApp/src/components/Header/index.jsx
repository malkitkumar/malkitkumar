import React from 'react'
import { Sainsburys } from '@jsluna/images'
import {
    Header,
    HeaderLogo,
} from '@jsluna/react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import './Header.scss'


export default function Headers() {
    return (
        <Header>
            <Link to='/'>
                <HeaderLogo>
                    <Sainsburys className="header__logo" style={{ verticalAlign: 'middle', height: '24px' }} /> &nbsp; Lease Events
          <span className="ln-u-visually-hidden">Sainsbury's</span>
                </HeaderLogo>
            </Link>
        </Header>
    )
}