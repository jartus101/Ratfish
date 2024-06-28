import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/CharacterCreator" activeStyle>
                        Character Creator
                    </NavLink>
                    <NavLink to="/Cards" activeStyle>
                        Character Cards
                    </NavLink>
                    <NavLink to="/ChatRoom" activeStyle>
                        Chat Rooms
                    </NavLink>
                    <NavLink to="/Login" activestyle>
                        Login
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;