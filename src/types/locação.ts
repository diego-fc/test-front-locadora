interface Locations {
	id?: number;
	locadorId: number;
	filmeId: number;
	dataRetirada: string;
	dataDevolucao: string;
	horaLimiteDevolucao: string;
	valorMultaAtraso: number;
	valorTotal: number;
	situacao: string;
}