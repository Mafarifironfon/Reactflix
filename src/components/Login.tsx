import * as React from 'react';
import {Button, Card, CardBody, Col, Form, FormGroup, Input, Label} from "reactstrap";
import TextInput from "./register/TextInput";
import {GlobalContext,IContext} from "./Context";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import {token} from "./Profile";

interface LoginProps {
    isAuth:boolean;
    setIsAuth : (state: boolean) => void;
}

export const config =
    {
        headers:
            {
                Authorization: `Bearer ${token}`
            }
    };

const Login:React.FC <LoginProps> = (props: LoginProps) => {

    const { store, setStore } = React.useContext(GlobalContext) as IContext;

    let navigate = useNavigate();

    const [userLogged, setUserLogged] = React.useState({
        email: '',
        password: ''
    });

    const [err, setErr] = React.useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name;
        const value = event.target.value;
        setUserLogged({...userLogged, [key] : value});
    };

    const getMyProfile = () => {
        Axios
            .get('https://api-ri7.herokuapp.com/api/users/profile', config)
            .then(res => setStore({...store, user: res.data}))
            .catch(err => console.log(err))
    };

    const login = () => {
        Axios
            .post('https://api-ri7.herokuapp.com/api/users/login', userLogged)
            .then(res =>
            {
                if (res.data?.token != null)
                {
                    const token = res.data.token;
                    sessionStorage.setItem('token', token);
                    props.setIsAuth(true);
                    getMyProfile();
                }
            })
            .catch(err => setErr('Erreur, veuillez rééssayer'))
    };

    const formIsNotEmpty = userLogged.email.length > 0 && userLogged.password.length > 0;

    React.useEffect(() => {
        if (props.isAuth && store.user != null)
        {
            navigate('/movies');
        }
    }, [props.isAuth, store.user])

    return (
        <div>
            <body style={{ backgroundImage: `url(https://www.neozone.org/blog/wp-content/uploads/2017/11/netflix.jpg)`, backgroundRepeat:"no-repeat", backgroundSize:"cover", height:"100vh" }}>
                <div className='d-flex row col-12 justify-content-center align-content-center h-100'>
                    <div className='col-3 d-flex row justify-content-center'>
                        {/*<p>{error}</p>*/}
                        <Card style={{backgroundColor: "#ffffffd1"}}>
                            <CardBody>
                                <h1 className='mb-5 d-flex justify-content-center'>Connectez-vous</h1>
                                <Form>
                                    <FormGroup>
                                        <Label for="email">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            value={userLogged.email}
                                            onChange={handleChange}
                                            name='email'
                                            type="text"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">
                                            Mot de passe
                                        </Label>
                                        <Input
                                            id="email"
                                            value={userLogged.password}
                                            onChange={handleChange}
                                            name='password'
                                            type="password"
                                        />
                                    </FormGroup>
                                    <div className='mt-4 mb-4 d-flex justify-content-center'>
                                        <Button color="success" onClick={login} active={formIsNotEmpty}>
                                            Enregistrer
                                        </Button>
                                    </div>
                                    <div className='mt-3 d-flex justify-content-center'>
                                        <p>Première visite ? <a href={'/register'}> Inscrivez-vous.</a></p>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </body>
        </div>
    );
};

export default Login;