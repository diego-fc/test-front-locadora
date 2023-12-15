import { useEffect, useState } from "react";
import { getFilmes, createFilmes, deleteFilmes, updateFilmes } from "@/services/filmes";
import FilmForm from "./components/Form";
import DataTable from "./components/DataTable";
import InfoView from "./components/InfoView";
import { isAxiosError } from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";
import Pages from "../index.page";

export default function Film() {
	const [filmeId, setFilmeId] = useState<number>();
	const [filme, setFilme] = useState<Filmes>();
	const [filmeView, setFilmeView] = useState<Filmes>();
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [modalInfoView, setModalInfoView] = useState<boolean>(false);
	const [data, setData] = useState<Filmes[]>([]);
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getUsers = async () => {
		await getFilmes().then(({ data }) => {
			setData(data);
		})
	}

	const handleDeleteFilmConfirmation = (id: number) => {
		setFilmeId(id);
		setOpenDeleteModal(true);
	};

	const handleDeleteFilm = async () => {
		if (filmeId) {
			try {
				setIsSaving(true);
				await deleteFilmes(filmeId);
				getUsers()
			} catch (err) { }
			setIsSaving(false);
			setOpenDeleteModal(false);
		}
	};

	const handleEditFilm = (id: number) => {
		const editFilm = data.filter((item) => item.id === id);
		if (editFilm.length) {
			const { id, titulo, anoLancamento, categoria, elenco, imagem, quantidadeDisponivel, sinopse, valorLocacao } = editFilm[0];
			setFilme({ id, titulo, anoLancamento, categoria, elenco, imagem, quantidadeDisponivel, sinopse, valorLocacao });
			setModalOpen(true);
		}
	};

	const handleFormSubmit = async (newFilm: Filmes) => {
		const filmeDto = {
			titulo: newFilm.titulo,
			imagem: newFilm.imagem,
			sinopse: newFilm.sinopse,
			elenco: newFilm.elenco,
			categoria: newFilm.categoria,
			valorLocacao: newFilm.valorLocacao,
			quantidadeDisponivel: newFilm.quantidadeDisponivel,
			anoLancamento: newFilm.anoLancamento
		}

		try {
			setIsSaving(true);
			if (newFilm.id) {
				await updateFilmes(filmeDto, newFilm.id);
				getUsers()
			} else {
				await createFilmes(filmeDto);
				getUsers()
			}
			setModalOpen(false);
			setIsSaving(false);
		} catch (err: unknown) {
			if (isAxiosError(err)) {
				setErrors([err.response?.data?.message]);
			}
			setIsSaving(false);
		}
		setIsSaving(false);
	};

	const handleCancelEditFilm = () => {
		setFilme({} as Filmes);
		setErrors([]);
		setModalOpen(false);
	};

	const handleCancelViewFilm = () => {
		setModalInfoView(false);
	};

	useEffect(() => {
		getUsers()
	}, [])

	return (
		<Grid marginTop={8}>
			<Grid item>
				<Pages />
			</Grid>
			<Grid
				container
				spacing={1}
				direction="column">
				<Grid
					marginTop={4}
					item xs={10} >
					<Typography variant="h5">Filmes</Typography>
				</Grid>
				{!modalOpen && !modalInfoView ?
					<Grid item xs={2}>
						<Button
							variant="contained"
							onClick={() => setModalOpen(true)}
						>
							Novo filme
						</Button>
					</Grid> :
					null
				}
			</Grid>
			{modalOpen ?
				<Grid cotainer={true} alignItems="center">
					<FilmForm
						onSubmit={handleFormSubmit}
						filme={filme}
						onCancel={handleCancelEditFilm}
						isLoading={isSaving}
						errors={errors}
					/>
				</Grid> : null
			}

			{modalInfoView && !modalOpen ?
				<Grid container alignItems="center">
					<InfoView
						filme={filmeView}
						onCancel={handleCancelViewFilm}
						isLoading={isSaving}
						errors={errors}
					/>
				</Grid> : null
			}

			<Grid marginTop={2}>
				<DataTable
					loading={isLoading}
					data={data}
					onDeleteFilm={handleDeleteFilmConfirmation}
					onEditFilm={handleEditFilm}
					onViewFilm={(id: string | number) => {
						setErrors([]);
						setFilmeView(
							data.findLast((item) => item.id === id) || ({} as Filmes)
						);
						setModalInfoView(true);
					}}
					rowCount={data?.length || 0}
					pagination
					nitialState={{
						pagination: { paginationModel: { pageSize: 10 } },
					}}
					pageSizeOptions={[10, 25, 50, 100]}
					paginationMode="server"
				/>
			</Grid>
			<Dialog
				open={openDeleteModal}
				onClose={() => setOpenDeleteModal(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Deletar filme</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Tem certeza que quer deletar esse filme?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
					<Button onClick={handleDeleteFilm}>Confirm</Button>
				</DialogActions>
			</Dialog>
		</Grid >)
} 