import axios, { AxiosResponse } from 'axios'


export function getLocations(): Promise<AxiosResponse> {
	return axios.get("http://localhost:3001/location", {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function createLocations(body: Locations): Promise<AxiosResponse> {
	return axios.post("http://localhost:3001/location/create", body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function updateLocations(body: Locations, id: number): Promise<AxiosResponse> {
	return axios.put(`http://localhost:3001/location/${id}`, body, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}

export function deleteLocations(id: number): Promise<AxiosResponse> {
	return axios.delete(`http://localhost:3001/location/${id}`, {
		responseType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	})
}
