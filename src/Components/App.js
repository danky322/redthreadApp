import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../CSS/app.css';
import MovieList from './MovieList';

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/' element={<MovieList />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
