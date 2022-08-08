import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../CSS/movieList.css';
import Header from './Header';
import MovieDetails from './MovieDetails';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#app');

const modalStyle = {
	content: {
		top: '0%',
		left: '0%',
		width: '100%',
		height: '100vh',
		padding: 'none',
		overflowY: 'scroll',
	},
};

const MovieList = () => {
	const [openModal, setOpenModal] = useState(false);
	const [movieList, setMovieList] = useState();
	const [id, setId] = useState();

	const openModalFunc = (e, item) => {
		e.stopPropagation();
		setOpenModal(true);
		setId(item.id);
	};

	function closeModal() {
		setOpenModal(false);
	}

	useEffect(() => {
		(async () => {
			let response = await fetch(
				`${process.env.REACT_APP_URL}3/movie/popular?api_key=${process.env.REACT_APP_APIKEY}`,
			);
			let list = await response.json();

			setMovieList(list.results);
		})();
	}, []);

	const renderList = () => {
		if (movieList) {
			return movieList.map((item, index) => {
				return (
					<div
						key={item.id}
						data-testid={`movieFrameId-${item.index}`}
						className='movieBorder'
						onClick={e => openModalFunc(e, item)}>
						<img
							data-testid='imgId'
							src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
							alt={item.title}
						/>
					</div>
				);
			});
		} else {
			return <div data-testid='loadingId'>Loading...</div>;
		}
	};

	return (
		<>
			<Modal
				className='modal'
				isOpen={openModal}
				onRequestClose={closeModal}
				style={modalStyle}
				contentLabel='Modal'>
				<MovieDetails id={id} setOpenModal={closeModal} />
			</Modal>
			<Header />
			<div className='movieList'>{renderList()}</div>
		</>
	);
};

export default MovieList;
