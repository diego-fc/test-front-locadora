import axios, { AxiosResponse } from 'axios'


export function getFilmes(): Promise<AxiosResponse> {
	return axios.get("http://localhost:3001/usuario", {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function createFilmes(body: Filmes): Promise<AxiosResponse> {
	return axios.post("http://localhost:3001/usuario", body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function UpdateFilmes(body: Filmes, id: number): Promise<AxiosResponse> {
	return axios.put(`http://localhost:3001/usuari/${id}`, body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function DeleteFilmes(id: number): Promise<AxiosResponse> {
	return axios.delete(`http://localhost:3001/usuari/${id}`, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}
