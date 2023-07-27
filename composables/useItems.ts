import axios from 'axios';

export const useItems = async (page: number) => {
	const response = await axios
		.get(`https://rickandmortyapi.com/api/character/?page=${page}`, {
			validateStatus: function (status) {
				return status < 500; // Разрешить, если код состояния меньше 500
			},
		})
		.then((resp) => resp.data)
		.catch((error) => error);
	return response;
};

export const useItem = async (id: number) => {
	const response = await axios
		.get(`https://rickandmortyapi.com/api/character/${id}`, {
			validateStatus: function (status) {
				return status < 500; // Разрешить, если код состояния меньше 500
			},
		})
		.then((resp) => resp.data)
		.catch((error) => error);
	return response;
};
