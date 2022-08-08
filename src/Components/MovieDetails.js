import { useEffect, useState } from 'react';
import '../CSS/moviedetails.css';
import Header from './Header';

import { ReactComponent as PlayIcon } from '../images/play.svg';

const MovieDetails = ({ id, setOpenModal }) => {
	const [movie, setMovie] = useState(false);

	useEffect(() => {
		(async () => {
			let response = await fetch(
				`${process.env.REACT_APP_URL}3/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			let list = await response.json();

			setMovie(list);
		})();
	}, [id]);

	const renderYear = () => {
		let date = new Date(movie.release_date);
		return date.getFullYear();
	};

	const renderMovie = () => {
		if (movie) {
			return (
				<div className='ui'>
					<div className='titleBand'>{movie.title}</div>
					<div className='box'>
						<div className='movieInfo'>
							<div className='imgContainer'>
								<img
									data-testid={`movie-${id}`}
									src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
									alt={movie.title}
								/>
							</div>
							<div className='metaInfo'>
								<div className='year'>{renderYear()}</div>
								<div className='duration'>
									{movie.runtime} mins
								</div>
								<div className='score'>
									{movie.vote_average.toFixed(1)}/10
								</div>
								<div className='favorite'>
									<button>Add to Favorite</button>
								</div>
							</div>
						</div>
						<div className='synopsis'>{movie.overview}</div>
						<div className='trailers'>
							<div className='trailerTitle'>TRAILERS</div>
							<div className='line'></div>
							<div className='videos'>
								<div className='trailer'>
									<PlayIcon className='play' /> Play trailer 1
								</div>
								<div className='trailer'>
									<PlayIcon className='play' /> Play trailer 2
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return <div data-testid='detailLoading'>Loading...</div>;
		}
	};
	return (
		<>
			<Header title='Movie details' setOpenModal={setOpenModal} />
			{renderMovie()}
		</>
	);
};

export default MovieDetails;
