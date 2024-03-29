import { createUsuario, deleteUsuario, getUsuario, updateUsuario } from "@/services/usuarios/usuarios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

import Pages from "../index.page";
import DataTable from "./components/DataTable";
import UsuarioForm from "./components/Form";
import InfoView from "./components/InfoView";

export default function Usuarios() {
	const [usuarioId, setUsuarioId] = useState<number>();
	const [usuario, setUsuario] = useState<Usuario>();
	const [usuarioView, setUsuarioView] = useState<Usuario>({} as Usuario);
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [modalInfoView, setModalInfoView] = useState<boolean>(false);
	const [data, setData] = useState<Usuario[]>([]);
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const mockData: Usuario[] = [
		{
			id: 1,
      nome: "Diego Ferreira",
      email: "diego@ferreira.com",
			acesso: 'Admin'
		},
		{
			id: 2,
      nome: "José dos filmes",
      email: "jose@dosfilmes.com",
			acesso: 'Usuario',
		}
	]

	const getUsers = async () => {
		// await getUsuario().then(({ data }) => {
		// 	setData(data);
		// })
	}

	const handleDeleteUsuarioConfirmation = (id: number) => {
		setUsuarioId(id);
		setOpenDeleteModal(true);
	};

	const handleDeleteUsuario = async () => {
		if (usuarioId) {
			try {
				setIsSaving(true);
				await deleteUsuario(usuarioId);
				getUsers()
			} catch (err) { }
			setIsSaving(false);
			setOpenDeleteModal(false);
		}
	};

	const handleEditUsuario = (id: number) => {
		const editUsuario = data.filter((item) => item.id === id);
		if (editUsuario.length) {
			const { id, email, nome, acesso, } = editUsuario[0];
			setUsuario({ id, email, nome, acesso });
			setModalOpen(true);
		}
	};

	const handleFormSubmit = async (newUsuario: Usuario) => {
		const usuarioDto = {
			email: newUsuario.email,
			nome: newUsuario.nome,
			acesso: newUsuario.acesso
		}

		try {
			setIsSaving(true);
			if (newUsuario.id) {
				await updateUsuario(usuarioDto, newUsuario.id);
				getUsers()
			} else {
				await createUsuario(usuarioDto);
				getUsers()
			}
			setModalOpen(false);
			setIsSaving(false);
		} catch (err: unknown) {
			setIsSaving(false);
		}
		setIsSaving(false);
	};

	const handleCancelEditUsuario = () => {
		setUsuario({} as Usuario);
		setErrors([]);
		setModalOpen(false);
	};

	const handleCancelViewUsuario = () => {
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
					<Typography variant="h5">Usuários</Typography>
				</Grid>
				{/* {!modalOpen && !modalInfoView ?
					<Grid item xs={2}>
						<Button
							variant="contained"
							onClick={() => setModalOpen(true)}
						>
							Novo usuário
						</Button>
					</Grid> :
					null
				} */}
			</Grid>
			{modalOpen ?
				<Grid container={true} alignItems="center">
					<UsuarioForm
						onSubmit={handleFormSubmit}
						usuario={usuario}
						onCancel={handleCancelEditUsuario}
						isLoading={isSaving}
						errors={errors}
					/>
				</Grid> : null
			}

			{modalInfoView && !modalOpen ?
				<Grid container alignItems="center">
					<InfoView
						usuario={usuarioView}
						onCancel={handleCancelViewUsuario}
						isLoading={isSaving}
						errors={errors}
					/>
				</Grid> : null
			}

			<Grid marginTop={2}>
				<DataTable
					loading={isLoading}
					data={mockData}
					onDeleteUsuario={handleDeleteUsuarioConfirmation}
					onEditUsuario={handleEditUsuario}
					onViewUsuario={(id: string | number) => {
						setErrors([]);
						setUsuarioView(
							data.findLast((item) => item.id === id) || ({} as Usuario)
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
				<DialogTitle id="alert-dialog-title">Deletar usuario</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Tem certeza que quer deletar esse usuario?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
					<Button onClick={handleDeleteUsuario}>Confirm</Button>
				</DialogActions>
			</Dialog>
		</Grid >)
} 