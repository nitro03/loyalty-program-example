import React from 'react';

import logo from '../../img/loyalty_program_logo.jpg';
import './scss/logo.scss';

const LOGO_ALT = 'Loyalty program logo'
const Logo = () => {
    return (
        <div className="logo--container">
            <img src={logo} alt={LOGO_ALT}/>
        </div>
    );
};

export default Logo;