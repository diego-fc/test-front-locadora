"use client"

import Header from '@/components/Header'
import { Usuarios } from './Usuario/index.page'

export default function Pages() {
	const onclick = (e) => {
		console.log(e)
	}
	return <div>
		<Header />
	</div>
}
