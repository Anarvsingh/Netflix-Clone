import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovies(
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
        }

        fetchData();
    }, [])

    function truncate(str,n) {
        return str?.length > n ? str.substr(0,n-1) + "..." : str;
    }

    return (
            <header className='banner'
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movies?.backdrop_path}")`,
                    backgroundPosition: "center",
                }}>
                <div className="banner_content">
                    <h1 className='banner_title'>
                        {movies?.title || movies?.name || movies?.original_name}
                    </h1>

                    <div className="banner_buttons">
                        <buttons className="banner__button">Play</buttons>
                        <buttons className="banner__button">My List</buttons>
                    </div>
                    <h1 className='banner__description'>
                    {truncate(movies?.overview,90)}
                    </h1>
                </div>
                <div className="banner--fadeBottom"></div>
            </header>
    )
}

export default Banner