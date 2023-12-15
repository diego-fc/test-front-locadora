import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const usuarioScheme = yup.object({
  email: yup.string().required(),
  nome: yup.string().required(),
  acesso: yup.string().required(),
});

interface usuarioFormProps {
  usuario: Usuario;
  onCancel: () => void;
  isLoading?: boolean;
  errors?: string[];
}

export default function InfoView({
  usuario,
  onCancel,
  isLoading = false,
}: usuarioFormProps) {
  const {
    register,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(usuarioScheme),
  });

  useEffect(() => {
    reset(usuario);
  }, [usuario, reset]);

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <form data-testid="usuario-view" style={{ width: "100%" }}>
        <Grid
          data-testid="search"
          container
          spacing={2}
          marginTop={1}
          border={1}
          paddingTop={2}
          paddingRight={2}
          paddingBottom={2}
          borderColor={"#7b7b7b"}
          borderRadius={2}
          alignItems="center"
        >
        <Grid item md={4} xs={12}>
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  fullWidth
                  disabled
                  type="text"
                  label="E-mail"
                  size="small"
                  error={!!formErrors.email}
                  InputLabelProps={{ shrink: !!value }}
                  {...register("email")}
                />
              )}
              name="email"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  fullWidth
                  type="text"
                  disabled
                  label="Nome"
                  variant="outlined"
                  size="small"
                  defaultValue={value}
                  value={value}
                  error={!!formErrors.nome}
                  InputLabelProps={{ shrink: !!value }}
                  {...register("nome")}
                />
              )}
              name="nome"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  fullWidth
                  type="text"
                  disabled
                  label="Nivel de acesso"
                  variant="outlined"
                  size="small"
                  defaultValue={value}
                  value={value}
                  error={!!formErrors.acesso}
                  InputLabelProps={{ shrink: !!value }}
                  {...register("acesso")}
                />
              )}
              name="acesso"
            />
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            spacing={2}
            marginTop={4}>
            <Grid>
              <Button
                data-testid="usuario-cancel"
                variant="contained"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>

      </form>
    </>
  );
}
