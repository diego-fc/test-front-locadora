import axios, { AxiosResponse } from 'axios'

export function getUsuario(): Promise<AxiosResponse> {
	return axios.get("http://localhost:3001/usuario", {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function createUsuario(body): Promise<AxiosResponse> {
	return axios.post("http://localhost:3001/usuario", body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function UpdateUsuario(body, id: number): Promise<AxiosResponse> {
	return axios.put(`http://localhost:3001/usuari/${id}`, body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function DeleteUsuario(id: number): Promise<AxiosResponse> {
	return axios.delete(`http://localhost:3001/usuari/${id}`, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}
