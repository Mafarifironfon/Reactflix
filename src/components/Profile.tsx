import * as React from 'react'
import {Button, Card, CardBody, CardText, CardTitle, FormGroup, Input, Label} from "reactstrap";
import Axios from "axios";
import { Hearts } from  'react-loader-spinner'
import {GlobalContext,IContext} from "./Context";

export const token = sessionStorage.getItem('token');

const Profile = () => {

    const { store, setStore } = React.useContext(GlobalContext) as IContext;
    const [isUpdating, setIsUpdating] = React.useState<boolean>(false);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const getMyProfile = () => {
        Axios
            .get('https://api-ri7.herokuapp.com/api/users/profile', config)
            .then(res => setStore({...store, user: res.data}))
            .catch(err => console.log(err))
    };

    const updateProfile = () => {
        if(isUpdating) {
            Axios
                .put('https://api-ri7.herokuapp.com/api/users/profile',store.user, config)
                .then(res => setStore({...store, user: res.data}))
                .catch(err => console.log('error => ', err))
        }
        setIsUpdating(!isUpdating);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (store.user != null)
        {
            const key = event.target.name;
            const value = event.target.value;
            setStore({...store, user:
                    {...store.user, [key] : value}
            });
        }
    };

    React.useEffect(() => {
        getMyProfile();
    }, []);

    return (
        <div className='d-flex justify-content-center align-content-center h-100 mt-5'>
            <div className='col-8 d-flex flex-column justify-content-center'>
                {store.user != null ?
                    <>
                    {isUpdating ?
                        <>
                            <FormGroup>
                                <Label for="firstname">
                                    Prénom
                                </Label>
                                <Input
                                    id="firstname"
                                    value={store.user.firstname}
                                    onChange={handleChange}
                                    name='firstname'
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastname">
                                    Nom
                                </Label>
                                <Input
                                    id="lastname"
                                    value={store.user.lastname}
                                    onChange={handleChange}
                                    name='lastname'
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    value={store.user.email}
                                    onChange={handleChange}
                                    name='email'
                                    type="email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">
                                    Mot de passe
                                </Label>
                                <Input
                                    id="password"
                                    value={store.user.lastname}
                                    onChange={handleChange}
                                    name='password'
                                    type="password"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="birthDate">
                                    Date de naissance
                                </Label>
                                <Input
                                    id="birthDate"
                                    value={store.user.birthDate}
                                    onChange={handleChange}
                                    name='birthDate'
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="biography">
                                    Biographie
                                </Label>
                                <Input
                                    id="biography"
                                    value={store.user.biography}
                                    onChange={handleChange}
                                    name='biography'
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="postalCode">
                                    Code postal
                                </Label>
                                <Input
                                    id="postalCode"
                                    value={store.user.postalCode}
                                    onChange={handleChange}
                                    name='postalCode'
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="city">
                                    Ville
                                </Label>
                                <Input
                                    id="city"
                                    value={store.user.city}
                                    onChange={handleChange}
                                    name='city'
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="avatar">
                                    Avatar
                                </Label>
                                <Input
                                    id="avatar"
                                    value={store.user.avatar}
                                    onChange={handleChange}
                                    name='avatar'
                                    type="text"
                                />
                            </FormGroup>
                        </>
                        :
                        <Card style={{backgroundColor: "#ffffffd1"}}>
                            <CardBody>
                                <CardTitle className="text-dark" tag="h5">
                                    <h1 className='d-flex row justify-content-center'>Le profil de {store.user.firstname} {store.user.lastname}</h1>
                                </CardTitle>
                                <div className='d-flex justify-content-center mt-4'>
                                    <img src={store.user.avatar} alt="avatar" width='20%' style={{borderRadius: "50%"}}/>
                                </div>
                                <CardText className='d-block justify-content-center'>
                                    <div className='d-block justify-content-center'>
                                    <p><strong>Email :</strong> {store.user.email}</p>
                                    <p><strong>Date de naissance :</strong> {store.user.birthDate}</p>
                                    <p><strong>Biographie :</strong> {store.user.biography}</p>
                                    <p><strong>Ville :</strong> {store.user.city}</p>
                                    <p><strong>Code postal :</strong> {store.user.postalCode}</p>
                                    </div>
                                </CardText>
                            </CardBody>
                        </Card>
                    }
                        </>
                        :
                        <Hearts
                        height="100"
                        width="100"
                        color='grey'
                        ariaLabel='loading'
                        />
                }
                <Button onClick={updateProfile} active={true} color="primary" outline>
                    Modifier mon profil
                </Button>
            </div>
        </div>
    )
}

export default Profile;