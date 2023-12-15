import axios, { AxiosResponse } from 'axios'

export function getUsuario(): Promise<AxiosResponse> {
	return axios.get("https://back-locadora-diego-fc.vercel.app/user", {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function createUsuario(body: Usuario): Promise<AxiosResponse> {
	return axios.post("https://back-locadora-diego-fc.vercel.app/user/create", body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function updateUsuario(body: Usuario, id: number): Promise<AxiosResponse> {
	return axios.put(`https://back-locadora-diego-fc.vercel.app/user/${id}`, body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function deleteUsuario(id: number): Promise<AxiosResponse> {
	return axios.delete(`https://back-locadora-diego-fc.vercel.app/user/${id}`, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}
