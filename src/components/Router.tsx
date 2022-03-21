import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Movies from "./Movies";
import Register from "./register/Register";
import Login from "./Login";
import Details from "./Details";
import Navigation from "./Navigation";
import Profile from "./Profile";
import ContextProvider from "./Context";
import AddMovie from "./AddMovie";

interface IUser {
    civility:string;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    birthDate:string;
    biography:string;
    postalCode:string;
    city:string;
    avatar:string;
}

const Router = () => {
    const [isAuth, setIsAuth] = React.useState(false);

    return (
        <BrowserRouter>
            <ContextProvider>
            <Navigation />
            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<Login isAuth={isAuth} setIsAuth={setIsAuth}/>} />
                <Route path="/movies" element={<Movies isAuth={isAuth}/>}/>
                <Route path="/movies/:id" element={<Details/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/add-movie" element={<AddMovie/>}/>
            </Routes>
            </ContextProvider>
        </BrowserRouter>
    );
};

export default Router;