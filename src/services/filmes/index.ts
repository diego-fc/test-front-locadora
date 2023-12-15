import axios, { AxiosResponse } from 'axios'


export function getFilmes(): Promise<AxiosResponse> {
	return axios.get("https://back-locadora-diego-fc.vercel.app/film", {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function createFilmes(body: Filmes): Promise<AxiosResponse> {
	return axios.post("https://back-locadora-diego-fc.vercel.app/film/create", body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function updateFilmes(body: Filmes, id: number): Promise<AxiosResponse> {
	return axios.put(`https://back-locadora-diego-fc.vercel.app/film/${id}`, body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function deleteFilmes(id: number): Promise<AxiosResponse> {
	return axios.delete(`https://back-locadora-diego-fc.vercel.app/film/${id}`, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}
