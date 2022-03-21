import React from 'react';
import {Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, Button, ButtonGroup} from "reactstrap";
import {GlobalContext, IContext} from "./Context";

const Navigation = () => {

    const {store, setStore} = React.useContext(GlobalContext) as IContext;

    const darkTheme = () => {
        setStore({...store, isDark: true});
    };

    const lightTheme = () => {
        setStore({...store, isDark: false});
    };

    return (
        <div>
            <Navbar
                color={store.isDark ? 'dark' : 'light'}
                expand="md"
                light={!store.isDark}
            >
                <NavbarBrand href={'/'} className="text-danger">
                    Netflix
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck(){}} />
                <Collapse navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href={'/movies'}>
                                Films
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={'/add-movie'}>
                                Ajouter un film
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href={'/register'}>
                                S'inscrire
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={'/'}>
                                Se connecter
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={'/profile'}>
                                Profil
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            {/*Theme : {store.theme}*/}
                            <div className='d-flex align-content-center'>
                                <ButtonGroup>
                                    <Button
                                        color="dark"
                                        onClick={darkTheme}
                                    >
                                        Dark
                                    </Button>
                                    <Button
                                        color="secondary"
                                        onClick={lightTheme}
                                    >
                                        Light
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;