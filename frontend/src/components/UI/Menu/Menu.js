import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import {NavLink} from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';

import '../../../common/css/common.css';
import './Menu.css';

const Menu = (props) => {
    let userMenuComponent = 
        <nav className="dark-bg sideNavMenu">
            <ul>
                <li>
                    <NavLink to="/dashboard">
                        Test1
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard">
                        Test2
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to="/dashboard">
                        Test3
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/dashboard">
                        Test4
                    </NavLink>
                </li>
            </ul>
        </nav>;














    return(
        <Auxiliary>
            <Backdrop show={true}/>

            {userMenuComponent}
        </Auxiliary>
    );
}

export default Menu;