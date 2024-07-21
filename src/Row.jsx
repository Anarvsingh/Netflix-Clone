import React, { useState, useEffect } from 'react';
import "./Row.css";
import axios from './axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, islargeROw }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {

        async function fetchData() {

            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request
        }
        fetchData();

    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "").then((url) => {

                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));

            }).catch(error => console.log(error));
        }
    };

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map(movie => (
                    <img
                        key={movies.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${islargeROw && "row_poster"}`}
                        src={`${base_url}${movie.poster_path}`} alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;