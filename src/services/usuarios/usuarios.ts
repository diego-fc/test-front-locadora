import axios, { AxiosResponse } from 'axios'

export function getUsuario(): Promise<AxiosResponse> {
	return axios.get("http://localhost:3001/user", {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function createUsuario(body: Usuario): Promise<AxiosResponse> {
	return axios.post("http://localhost:3001/user/create", body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function updateUsuario(body: Usuario, id: number): Promise<AxiosResponse> {
	return axios.put(`http://localhost:3001/user/${id}`, body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function deleteUsuario(id: number): Promise<AxiosResponse> {
	return axios.delete(`http://localhost:3001/user/${id}`, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}
