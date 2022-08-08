import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieDetails from '../Components/MovieDetails';
import '@testing-library/jest-dom/extend-expect';

const setOpenModal = () => {
	jest.fn().mockRejectedValue(false);
};
describe('Movie Detail component tests', () => {
	test('starts without anything', async () => {
		render(<MovieDetails id={616037} setOpenModal={setOpenModal} />);
		const id = screen.queryByTestId('movie-616037');

		expect(id).toBeNull();
	});

	test('displays loading message', () => {
		render(<MovieDetails id={616037} setOpenModal={setOpenModal} />);
		const test = screen.getByTestId('detailLoading');
		expect(test.textContent).toBe('Loading...');
	});

	test('displays loaded movie', () => {
		render(<MovieDetails id={616037} setOpenModal={setOpenModal} />);

		setTimeout(async () => {
			const imageElement = screen.getByAltText('Thor: Love and Thunder');
			expect(imageElement).toHaveAttribute(
				'src',
				'https://image.tmdb.org/t/p/w154/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
			);
		}, 2000);
	});
});
