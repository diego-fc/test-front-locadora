import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

import { getUsuario, createUsuario, updateUsuario, deleteUsuario } from "@/services/usuarios/usuarios";
import UsuarioForm from "../page/Usuario/components/Form";
import DataTable from "../page/Usuario/components/DataTable";
import InfoView from "../page/Usuario/components/InfoView";

interface IParams {
  page: number;
  keyword: string;
  sort: string;
  limit: number;
  uri: string;
  param: string;
}

export default function Usuarios() {
  const [usuarioId, setUsuarioId] = useState<string | number>();
  const [usuario, setUsuario] = useState<Usuario>();
  const [usuarioView, setUsuarioView] = useState<Usuario>();
  const [isSaving, setIsSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalInfoView, setModalInfoView] = useState(false);
  const [data, setData] = useState<Usuario[]>([]);


  const [errors, setErrors] = useState<string[]>();
  const handleRequest = (requestParams: any) => {
  };

  const handleEditUsuario = (id: string | number) => {
    const editUsuario = data.filter((item) => item.id === id);
    if (editUsuario.length) {
      const { id, email, nome, acesso, } = editUsuario[0];
      setUsuario({ id, email, nome, acesso });
      setModalOpen(true);
    }
  };

  const handleDeleteUsuarioConfirmation = (id: string | number) => {
    setUsuarioId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteUsuario = async () => {
    if (usuarioId) {
      try {
        setIsSaving(true);
        await deleteUsuario(usuarioId);
        enqueueSnackbar("Usuario deleted successful", { variant: "success" });
      } catch (err) { }
      setIsSaving(false);
      setOpenDeleteModal(false);
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
        await update(newUsuario.id, usuarioDto);
        enqueueSnackbar("Usuario updated successful", { variant: "success" });
      } else {
        await create(usuarioDto);
        enqueueSnackbar("Usuario created successful", { variant: "success" });
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

  return (
    <Grid marginTop={4}>
      <Grid
        container
        spacing={1}
        direction="column">
        <Grid item xs={10}>
          <Typography variant="h5">Usuario</Typography>
        </Grid>
        {!modalOpen && !modalInfoView ?
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={() => setModalOpen(true)}
            >
              New
            </Button>
          </Grid> :
          null
        }
      </Grid>
      {modalOpen ?
        <Grid container alignItems="center">
          <UsuarioForm
            onSubmit={handleFormSubmit}
            usuario={usuario}
            onCancel={handleCancelEditUsuario}
            isLoading={isSaving}
            errors={errors}
          />
        </Grid> : null
      }
      {
        modalInfoView && !modalOpen ?
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
          userValidation={userValidation}
          rowCount={meta?.total || 0}
          onPaginationModelChange={(e: any) => {
            handleRequest({ page: e.page + 1, limit: e.pageSize });
          }}
          pagination
          initialState={{
            pagination: { paginationModel: { pageSize: params.limit } },
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
    </Grid>
  );
}
