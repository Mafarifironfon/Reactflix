import * as React from 'react'
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import Axios from "axios";
import {useParams} from "react-router-dom";


const Details = () => {

    const [detail, setDetail] = React.useState<any>(null)

    let params = useParams()

    const apiKey = '0a04a623093496d4c6822099c4794733';
    const movieId = params.id;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`

    const imageDuFilm = detail?.poster_path;
    const imageURL = `https://image.tmdb.org/t/p/original/${imageDuFilm}`;

    const getMovieDetails = () => {
        Axios
            .get(url)
            .then(response => setDetail(response.data))
            .catch(error => setDetail(error))
    };

    React.useEffect(() => {
        getMovieDetails()
    }, []);

    return (
        <>
        {detail != null ?
            <div>
                <div className='d-flex row col-12 justify-content-center align-content-center h-100 mt-5'>
                    <div className='col-3 d-flex row justify-content-center'>
                        <Card style={{ border: '0px'}}>
                            <CardImg
                                alt="Card image cap"
                                src={imageURL}
                                top
                                width="100%"
                                style={{ maxHeight: '650px'}}
                            />
                        </Card>
                    </div>
                    <div className='col-3 d-flex row justify-content-center'>
                        <Card>
                            <CardBody>
                                <CardTitle className="text-dark d-flex row justify-content-center" tag="h2">
                                    {detail.original_title}
                                </CardTitle>
                                <CardText className="text-dark d-flex row justify-content-center mt-5">
                                    {detail.overview}
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        :
        <p>Pas disponible</p>
        }
        </>
    )
}

export default Details;