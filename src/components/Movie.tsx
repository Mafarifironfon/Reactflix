import React from 'react';
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from 'reactstrap';

interface MovieProps {
    poster_path:string;
    goToMovie: () => void;
    deleteMovie: () => void;
    title: string;
    release_date: string,
    isCustom?: boolean
}

const Movie:React.FC <MovieProps> = (props) => {

    const imageDuFilm = props.poster_path;
    const imageURL = `https://image.tmdb.org/t/p/original/${imageDuFilm}`

    return (
        <div>
            <Card>
                <CardImg
                    alt={props.title}
                    src={props.isCustom ? props.poster_path : imageURL}
                    top
                    width="100%"
                    style={{ maxHeight: '650px'}}
                />
                <CardBody>
                    <CardTitle className="text-dark" tag="h5">
                        {props.title}
                    </CardTitle>
                    <CardText className="text-dark" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {props.release_date}
                    </CardText>
                    <Button color="success" onClick={props.goToMovie} >
                        En savoir plus
                    </Button>
                    <Button color="danger" onClick={props.deleteMovie} active={true}>
                        Supprimer
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default Movie;



