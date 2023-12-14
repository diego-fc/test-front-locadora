import { useState } from "react";
import { getUsuario, createUsuario, updateUsuario, deleteUsuario } from "@/services/usuarios/usuarios";
import UsuarioForm from "./components/Form";
import DataTable from "./components/DataTable";
import InfoView from "./components/InfoView";
import { isAxiosError } from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";

export function Usuarios() {
	const [usuarioId, setUsuarioId] = useState<number>();
	const [usuario, setUsuario] = useState<Usuario>();
	const [usuarioView, setUsuarioView] = useState<Usuario>();
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const [modalInfoView, setModalInfoView] = useState<boolean>(false);
	const [data, setData] = useState<Usuario[]>([]);
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleDeleteUsuarioConfirmation = (id: number) => {
		setUsuarioId(id);
		setOpenDeleteModal(true);
	};

	const handleDeleteUsuario = async () => {
		if (usuarioId) {
			try {
				setIsSaving(true);
				await deleteUsuario(usuarioId);
			} catch (err) { }
			setIsSaving(false);
			setOpenDeleteModal(false);
		}
	};

	const handleEditUsuario = (id: string | number) => {
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
			} else {
				await createUsuario(usuarioDto);
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

	const handleCancelEditUsuario = () => {
		setUsuario({} as Usuario);
		setErrors([]);
		setModalOpen(false);
	};

	const handleCancelViewUsuario = () => {
		setModalInfoView(false);
	};

	return (<Grid marginTop={4}>
		<Grid
			container
			spacing={1}
			direction="column">
			<Grid item xs={10}>
				<Typography variant="h5">Usuários</Typography>
			</Grid>
			{!modalOpen && !modalInfoView ?
				<Grid item xs={2}>
					<Button
						variant="contained"
						onClick={() => setModalOpen(true)}
					>
						Novo usuário
					</Button>
				</Grid> :
				null
			}
		</Grid>
		{modalOpen ?
			<Grid cotainer alignItems="center">
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

		<Grid>
			<DataTable
				loading={isLoading}
				data={data}
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
				nPaginationModeChange={(e: any) => {
					handleRequest({ page: e.page + 1, limit: e.pageSize });
			}}
			pagination
				nitialState={{
				pagination: { paginationModel: { pageSize: 10 } },
				}} 
				pageS i zeOptions={[10, 25, 50, 100]}
						paginationMode="server"
			/>
		</Grid>
		<Dialog
			open={openDeleteModal}
			onClose={() => setOpenDeleteModal(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Delete usuario</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Are you sure that you want to delete this usuario?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
				<Button onClick={handleDeleteUsuario}>Confirm</Button>
			</DialogActions>
		</Dialog>
	</Grid >)
} 