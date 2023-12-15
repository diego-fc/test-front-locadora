import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

let filmeScheme = yup.object({
  titulo: yup.string().notRequired(),
  imagem: yup.string().notRequired(),
  sinopse: yup.string().notRequired(),
  elenco: yup.string().notRequired(),
  categoria: yup.string().notRequired(),
  valorLocacao: yup.number().notRequired(),
  quantidadeDisponivel: yup.number().notRequired(),
  anoLancamento: yup.number().notRequired(),
});

interface filmeFormProps {
  filme: Filmes | undefined;
  onCancel: () => void;
  isLoading?: boolean;
  errors?: string[];
}

export default function InfoView({
  filme,
  onCancel,
  isLoading = false,
}: filmeFormProps) {
  const {
    register,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(filmeScheme),
  });

  useEffect(() => {
    reset(filme);
  }, [filme, reset]);

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <form data-testid="filme-view" style={{ width: "100%" }}>
        <Grid
          data-testid="search"
          container
          marginTop={1}
          border={1}
          paddingTop={2}
          paddingRight={2}
          paddingLeft={2}
          paddingBottom={2}
          borderColor={"#7b7b7b"}
          borderRadius={2}
          alignItems="center"
        >

          <Grid container spacing={2} marginBottom={2}>
            <Grid item md={4} xs={12}>
              <TextField
                disabled
                data-testid="titulo-input"
                fullWidth
                label="Titulo"
                variant="outlined"
                size="small"
                {...register("titulo")}
                error={!!formErrors.titulo}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                disabled
                data-testid="imagem-input"
                fullWidth
                label="Imagem"
                variant="outlined"
                size="small"
                {...register("imagem")}
                error={!!formErrors.imagem}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                disabled
                data-testid="sinopse-input"
                fullWidth
                label="Sinopse"
                variant="outlined"
                size="small"
                {...register("sinopse")}
                error={!!formErrors.sinopse}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                disabled
                data-testid="elenco-input"
                fullWidth
                label="Elenco"
                variant="outlined"
                size="small"
                {...register("elenco")}
                error={!!formErrors.elenco}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                disabled
                data-testid="categoria-input"
                fullWidth
                label="Categoria"
                variant="outlined"
                size="small"
                {...register("categoria")}
                error={!!formErrors.categoria}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                disabled
                data-testid="valorLocacao-input"
                fullWidth
                type="number"
                label="Valor da locação"
                variant="outlined"
                size="small"
                {...register("valorLocacao")}
                error={!!formErrors.valorLocacao}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                disabled
                data-testid="quantidadeDisponivel-input"
                fullWidth
                type="number"
                label="Quantidade"
                variant="outlined"
                size="small"
                {...register("quantidadeDisponivel")}
                error={!!formErrors.quantidadeDisponivel}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                disabled
                data-testid="anoLancamento-input"
                fullWidth
                type="number"
                label="Ano de lançamento"
                variant="outlined"
                size="small"
                {...register("anoLancamento")}
                error={!!formErrors.anoLancamento}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            spacing={2}
            marginTop={4}>
            <Grid>
              <Button
                data-testid="filme-cancel"
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
