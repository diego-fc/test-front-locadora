import axios, { AxiosResponse } from 'axios'


export function getLocations(): Promise<AxiosResponse> {
	return axios.get("https://back-locadora-diego-fc.vercel.app/location", {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function createLocations(body: Locations): Promise<AxiosResponse> {
	return axios.post("https://back-locadora-diego-fc.vercel.app/location/create", body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function updateLocations(body: Locations, id: number): Promise<AxiosResponse> {
	return axios.put(`https://back-locadora-diego-fc.vercel.app/location/${id}`, body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function deleteLocations(id: number): Promise<AxiosResponse> {
	return axios.delete(`https://back-locadora-diego-fc.vercel.app/location/${id}`, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}
