import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Autocomplete, Button, FormControlLabel, Grid, Radio, RadioGroup, Switch, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

let usuarioScheme = yup.object({
  email: yup.string().required(),
  nome: yup.string().required(),
  acesso: yup.string().required(),
});

interface UsuarioFormProps {
  usuario: Usuario | undefined;
  onSubmit: (usuario: Usuario) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errors?: string[];
}

export default function UsuarioForm({
  usuario,
  onSubmit,
  onCancel,
  isLoading = false,
  errors = [],
}: UsuarioFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(usuarioScheme),
  });
  const acessoMock = [
    { label: 'Usuario', acesso: "usuario" },
    { label: 'Cliente', acesso: "cliente" },
    { label: 'Diretor', acesso: "diretor" },
    { label: 'Ator', acesso: "ator" }
  ]

  const handleFormSubmit = (newUsuarios: Usuario) => {
    onSubmit(newUsuarios);
  };

  const handleCancel = () => {
    reset({ email: "", nome: "" });
    onCancel();
  };

  useEffect(() => {
    reset(usuario);
  }, [usuario, reset]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} data-testid="usuario-form">
      {errors.map((error) => (
        <Alert key={error} severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      ))}
      <Grid
        data-testid="search"
        container
        marginTop={1}
        border={1}
        padding={2}
        borderColor={"#7b7b7b"}
        borderRadius={2}
        alignItems="center">

        <Grid container spacing={2} marginBottom={2}>
          <Grid item md={4} xs={12}>
            <TextField
              data-testid="email-input"
              fullWidth
              label="E-mail"
              variant="outlined"
              size="small"
              {...register("email")}
              error={!!formErrors.email}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              data-testid="nome-input"
              fullWidth
              label="Nome"
              variant="outlined"
              size="small"
              {...register("nome")}
              error={!!formErrors.nome}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Controller
              control={control}
              render={({ field: { value, ref, onChange, ...field } }) => (
                <Autocomplete
                  options={acessoMock}
                  getOptionLabel={(option) => `${option.acesso}`}
                  value={
                    acessoMock?.findLast(
                      (item) => item.acesso === value
                    ) || null
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      {...field}
                      label="Nivel de acesso"
                      size="small"
                      inputRef={ref}
                      error={!!formErrors.acesso}
                      variant="outlined"
                    />
                  )}
                  onChange={(_: any, data: any) =>
                    onChange(data?.acesso)
                  }
                />
              )}
              name="acesso"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" marginTop={2} spacing={2}>
          <Grid>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </Grid>
          <Grid marginLeft={2}>
            <Button
              variant="contained"
              disabled={isLoading}
              type="submit"
              data-testid="submit-button"
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
