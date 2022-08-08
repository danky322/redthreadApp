const data = {
	key: 1,
	poster_path: '/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg',
	title: 'test movie',
};

const fetch = jest.fn().mockResolvedValue(data);

export default fetch;
