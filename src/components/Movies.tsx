import * as React from 'react'
import Axios from "axios";
import Movie from "./Movie";
import {useNavigate} from "react-router-dom";
import {Button} from "reactstrap";
import {GlobalContext, IContext} from "./Context";
import {config} from "./Login";
import {IMovie} from "./IMovie";

type MoviesProps = {
    isAuth:boolean;
}

const Movies:React.FC <MoviesProps> = ({isAuth}: MoviesProps) => {

    const { store, setStore } = React.useContext(GlobalContext) as IContext;

    const [moviesRI7, setMoviesRI7] = React.useState<null | []>(null);

    let navigate = useNavigate();

    const [err, setErr] = React.useState("");

    const API_KEY = '6954861898bd5fd71e3f9befcd21e7fe';
    const URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

    const getMovies = () => {
        Axios
            .get(URL)
            .then(response => setStore({...store, movies: response.data.results}))
            .catch(err => setErr(err))
    };

    const getMoviesRi7 = () => {
        Axios
            .get(' https://api-ri7.herokuapp.com/api/movies', config)
            .then(response => setMoviesRI7(response.data))
            .catch(err => setErr(err))
    };

    const goToMovie = (movie : IMovie) => {
        navigate(`/movies/${movie.id}`);
    };

    const deleteMovie = (movieIdToDelete: number) => {
        const updatedMovies = store.movies?.filter(movie => movie.id != movieIdToDelete);
        if (updatedMovies != null)
        {
            setStore({...store, movies: updatedMovies})
        }
    };

    React.useEffect(() => {
        if (isAuth)
        {
            getMovies();
            getMoviesRi7();
        }
        else
        {
            navigate('/');
        }
    }, []);

    React.useEffect(() => {
        if (moviesRI7 != null && store.movies != null)
        {
            const tempArray = [...store.movies];
            moviesRI7.map(movie => tempArray.push(movie));
            setStore({...store, movies : tempArray});
        }
    }, [moviesRI7]);

    return (
        <div className='justify-content-center d-flex flex-wrap col-11 m-auto mt-5'>
            {store.movies != null ?
                store.movies.map((movie: IMovie, index: number) => {
                    return (
                        <div key={movie.id}>
                            <Movie
                                {...movie}
                                goToMovie={() => goToMovie(movie)}
                                deleteMovie={() =>deleteMovie(movie.id)}
                                isCustom={movie.isCustom != null}
                            />
                        </div>
                    )})
                :
                <p>Chargement en cours...</p>
            }
        </div>
    )
};

export default Movies;