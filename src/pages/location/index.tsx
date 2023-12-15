import { useEffect, useState } from "react";
import { getLocations, createLocations, deleteLocations, updateLocations } from "@/services/locacao";
import LocationForm from "./components/Form";
import DataTable from "./components/DataTable";
import InfoView from "./components/InfoView";
import { isAxiosError } from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";
import Pages from "../index.page";
import { getFilmes } from "@/services/filmes";
import { getUsuario } from "@/services/usuarios/usuarios";

export default function Location() {
	const [locationId, setLocationId] = useState<number>();
	const [location, setLocation] = useState<Locations>();
	const [locationView, setLocationView] = useState<Locations>();
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [modalInfoView, setModalInfoView] = useState<boolean>(false);
	const [data, setData] = useState<Locations[]>([]);
	const [filmes, setFilmes] = useState<Filmes[]>([]);
	const [usuarios, setUsuarios] = useState<Usuario[]>([]);
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getLocation = async () => {
		await getLocations().then(({ data }) => {
			setData(data);
		})
		getFilmes().then(({ data }) => {
			setFilmes(data)
		})
		getUsuario().then(({ data }) => {
			setUsuarios(data)
		})
	}

	const handleDeleteLocationConfirmation = (id: number) => {
		setLocationId(id);
		setOpenDeleteModal(true);
	};

	const handleDeleteLocation = async () => {
		if (locationId) {
			try {
				setIsSaving(true);
				await deleteLocations(locationId);
				getLocations()
			} catch (err) { }
			setIsSaving(false);
			setOpenDeleteModal(false);
		}
	};

	const handleEditLocation = (id: number) => {
		const editLocation = data.filter((item) => item.id === id);
		if (editLocation.length) {
			const {
				id,
				dataDevolucao,
				dataRetirada,
				filmeId,
				horaLimiteDevolucao,
				locadorId,
				situacao,
				valorMultaAtraso,
				valorTotal } = editLocation[0];
			setLocation({
				id,
				dataDevolucao,
				dataRetirada,
				filmeId,
				horaLimiteDevolucao,
				locadorId,
				situacao,
				valorMultaAtraso,
				valorTotal
			});
			setModalOpen(true);
		}
	};

	const handleFormSubmit = async (newLocation: Locations) => {
		const locationDto = {
			locadorId: newLocation.locadorId,
			filmeId: newLocation.filmeId,
			dataRetirada: new Date(newLocation.dataRetirada).toISOString(),
			dataDevolucao: new Date(newLocation.dataDevolucao).toISOString(),
			horaLimiteDevolucao: new Date(newLocation.horaLimiteDevolucao).toISOString(),
			valorMultaAtraso: newLocation.valorMultaAtraso,
			valorTotal: newLocation.valorTotal,
			situacao: newLocation.situacao
		}

		try {
			setIsSaving(true);
			if (newLocation.id) {
				await updateLocations(locationDto, newLocation.id);
				getLocations()
			} else {
				await createLocations(locationDto);
				getLocations()
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

	const handleCancelEditLocation = () => {
		setLocation({} as Locations);
		setErrors([]);
		setModalOpen(false);
	};

	const handleCancelViewLocation = () => {
		setModalInfoView(false);
	};

	useEffect(() => {
		getLocation()
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
					<Typography variant="h5">Locações</Typography>
				</Grid>
				{!modalOpen && !modalInfoView ?
					<Grid item xs={2}>
						<Button
							variant="contained"
							onClick={() => setModalOpen(true)}
						>
							Nova Locação
						</Button>
					</Grid> :
					null
				}
			</Grid>
			{modalOpen ?
				<Grid cotainer={true} alignItems="center">
					<LocationForm
						location={location}
						filme={filmes}
						usuarios={usuarios}
						onSubmit={handleFormSubmit}
						onCancel={handleCancelEditLocation}
						isLoading={isSaving}
						errors={errors}
					/>
				</Grid> : null
			}

			{modalInfoView && !modalOpen ?
				<Grid container alignItems="center">
					<InfoView
						location={locationView}
						onCancel={handleCancelViewLocation}
						isLoading={isSaving}
						errors={errors}
					/>
				</Grid> : null
			}

			<Grid marginTop={2}>
				<DataTable
					loading={isLoading}
					data={data}
					usuarios={usuarios}
					filmes={filmes}
					onDeleteLocation={handleDeleteLocationConfirmation}
					onEditLocation={handleEditLocation}
					onViewLocation={(id: string | number) => {
						setErrors([]);
						setLocationView(
							data.findLast((item) => item.id === id) || ({} as Locations)
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
				<DialogTitle id="alert-dialog-title">Deletar locação</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Tem certeza que quer deletar esse locação?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
					<Button onClick={handleDeleteLocation}>Confirm</Button>
				</DialogActions>
			</Dialog>
		</Grid >)
} 