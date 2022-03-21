import React from 'react';
import {Card, CardBody, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import {token} from "./Profile";
import {INewMovie} from "./INewMovie";
import {config} from "./Login";

const AddMovie:React.FC = (props) => {

    const [newMovie, setNewMovie] = React.useState<INewMovie>({
        title: '',
        overview: '',
        poster_path:'',
        release_date: '',
    });

    let navigate = useNavigate();

    const addMovie = () => {
        Axios
            .post('https://api-ri7.herokuapp.com/api/movies',newMovie, config)
            .then(res =>
                {
                    if(res.status == 200)
                    {
                        navigate('/movies')
                    }
                }
            )
            .catch(err => console.log(err))
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (newMovie != null)
        {
            const key = event.target.name;
            const value = event.target.value;
            setNewMovie({...newMovie, [key] : value});
        }
    };

    return (
        <div className='d-flex row col-12 justify-content-center align-content-center h-100 mt-5'>
            <div className='col-3 d-flex row justify-content-center'>
                {/*<p>{error}</p>*/}
                <Card style={{backgroundColor: "#ffffffd1"}}>
                    <CardBody>
                        <h1 className='mb-5 d-flex justify-content-center'>Ajoutez un film</h1>
                        <Form>
                            <FormGroup>
                                <Label for="title">
                                    Titre
                                </Label>
                                <Input
                                    id="title"
                                    value={newMovie.title}
                                    onChange={handleChange}
                                    name='title'
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="overview">
                                    Synopsis
                                </Label>
                                <Input
                                    id="overview"
                                    value={newMovie.overview}
                                    onChange={handleChange}
                                    name='overview'
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="release_date">
                                    Date
                                </Label>
                                <Input
                                    id="release_date"
                                    value={newMovie.release_date}
                                    onChange={handleChange}
                                    name='release_date'
                                    type="date"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="poster_path">
                                    Image
                                </Label>
                                <Input
                                    id="poster_path"
                                    value={newMovie.poster_path}
                                    onChange={handleChange}
                                    name='poster_path'
                                    type="text"
                                />
                            </FormGroup>
                            <div className='mt-4 mb-4 d-flex justify-content-center'>
                                <Button color="success" onClick={addMovie} active={true}>
                                    Enregistrer
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default AddMovie;



