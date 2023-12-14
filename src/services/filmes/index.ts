import axios, { AxiosResponse } from 'axios'


export function getFilmes(): Promise<AxiosResponse> {
	return axios.get("http://localhost:3001/film", {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function createFilmes(body: Filmes): Promise<AxiosResponse> {
	return axios.post("http://localhost:3001/film/create", body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function updateFilmes(body: Filmes, id: number): Promise<AxiosResponse> {
	return axios.put(`http://localhost:3001/film/${id}`, body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function deleteFilmes(id: number): Promise<AxiosResponse> {
	return axios.delete(`http://localhost:3001/film/${id}`, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}
