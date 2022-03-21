import * as React from 'react';
import {
    Form,
    Label,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Card,
    CardBody,
    FormGroup,
    Col,
    Row
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

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

const Register:React.FC = () => {

    const [user, setUser] = React.useState<IUser>({
        civility:'',
        firstname:'',
        lastname:'',
        email: '',
        password: '',
        birthDate: '',
        biography: '',
        postalCode: '',
        city: '',
        avatar: '',
    });

    const [show, setShow] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null)

    const handleModal = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setShow(!show)
        e.preventDefault()
    }

    const registered = () => {
        Axios
            .post('https://api-ri7.herokuapp.com/api/users/register', user)
            .then(res =>
                {
                    if(res.status == 200)
                    {
                        navigate('/')
                    }
                }
            )
            .catch(err => setError(err))
    };

    let navigate = useNavigate();

    return (
        <body style={{ backgroundImage: `url(https://www.neozone.org/blog/wp-content/uploads/2017/11/netflix.jpg)`, backgroundRepeat:"no-repeat", backgroundSize:"cover", height:"100vh" }}>
        <div className='d-flex row col-12 justify-content-center align-content-center h-100'>
            <div className='col-10 d-flex row justify-content-center'>
                {/*<p>{error}</p>*/}
                <Card style={{backgroundColor: "#ffffffd1"}}>
                    <CardBody>
                        {error != null &&
                        <p>{error}</p>
                        }
                        <h1 className='mb-5 d-flex row justify-content-center'>Creer votre compte</h1>
                        <Form>
                            <Row>
                            <Col md={6}>
                            <div className='d-flex justify-content-center mb-5'>
                                <FormGroup check inline>
                                    <Input name='civility' value="Homme" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, civility:e.target.value})} type="checkbox" />
                                    <Label check>Homme</Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Input name='civility' value="Femme" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user, civility:e.target.value})} type="checkbox" />
                                    <Label check>Femme</Label>
                                </FormGroup>
                            </div>
                            <FormGroup>
                                <Label for="firstname">
                                    Prénom
                                </Label>
                                <Input
                                    id="firstname"
                                    value={user.firstname}
                                    onChange={(e) => setUser({...user, firstname: e.target.value})}
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
                                    value={user.lastname}
                                    onChange={(e) => setUser({...user, lastname: e.target.value})}
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
                                    value={user.email}
                                    onChange={(e) => setUser({...user, email: e.target.value})}
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
                                    value={user.password}
                                    onChange={(e) => setUser({...user, password: e.target.value})}
                                    name='password'
                                    type="password"
                                />
                            </FormGroup>
                            </Col>
                            <Col md={6}>
                            <FormGroup>
                                <Label for="birthDate">
                                    Date de naissance
                                </Label>
                                <Input
                                    id="birthDate"
                                    value={user.birthDate}
                                    onChange={(e) => setUser({...user, birthDate: e.target.value})}
                                    name='birthDate'
                                    type="date"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="biography">
                                    Biographie
                                </Label>
                                <Input
                                    id="biography"
                                    value={user.biography}
                                    onChange={(e) => setUser({...user, biography: e.target.value})}
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
                                    value={user.postalCode}
                                    onChange={(e) => setUser({...user, postalCode: e.target.value})}
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
                                    value={user.city}
                                    onChange={(e) => setUser({...user, city: e.target.value})}
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
                                    value={user.avatar}
                                    onChange={(e) => setUser({...user, avatar: e.target.value})}
                                    name='avatar'
                                    type="text"
                                />
                            </FormGroup>
                            </Col>
                            </Row>
                            <div className='mt-4 mb-4 d-flex justify-content-center'>
                                <Button color="success" onClick={registered} >
                                    S'inscrire
                                </Button>
                            </div>
                        </Form>

                        <Modal isOpen={show} toogle={handleModal}>
                            <ModalHeader closeButton>
                                Validation des informations
                            </ModalHeader>
                            <ModalBody>
                                <p>Civilité: {user.civility}</p>
                                <p>Prénom: {user.firstname}</p>
                                <p>Prénom: {user.lastname}</p>
                                <p>Mail: {user.email}</p>
                                <p>Date de naissance: {user.birthDate}</p>
                                <p>Bio: {user.biography}</p>
                                <p>Ville: {user.city}</p>
                                <p>Code postal: {user.postalCode}</p>
                                <p>Avatar: {user.avatar}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="success"
                                    click={ ()=>navigate('/login')}
                                >
                                    Valider
                                </Button>
                                {' '}
                                <Button click={() => handleModal}>
                                    Annuler
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </CardBody>
                </Card>
            </div>
        </div>
        </body>
    );
};

export default Register;