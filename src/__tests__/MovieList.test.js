import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from '../Components/MovieList';
import '@testing-library/jest-dom/extend-expect';

describe('MovieList component test', () => {
	test('starts without movieFrameId', () => {
		render(<MovieList />);
		const id = screen.queryByTestId('movieFrameId-0');
		expect(id).toBeNull();
	});

	test('displays loading message', () => {
		render(<MovieList />);
		const test = screen.getByTestId('loadingId');
		expect(test.textContent).toBe('Loading...');
	});

	test('displays test movie if API succeeds', async () => {
		render(<MovieList />);

		setTimeout(async () => {
			const movieFrameId = await screen.findByTestId('movieFrameId-0');
			expect(movieFrameId).toBeInTheDocument();

			const imgId = await screen.findByTestId('imgId-0');

			expect(imgId.src).toContain('test movie');
		}, 1000);
	});

	it('click on the picture and it opens a modal', () => {
		render(<MovieList />);
		setTimeout(async () => {
			const movieFrame = await screen.findAllByTestId('movieFrameId-0');

			fireEvent.click(movieFrame[0]);

			const modalText = screen.getByText('Add to Favorite');
			expect(modalText).toBeInTheDocument();
		}, 3000);
	});
});
