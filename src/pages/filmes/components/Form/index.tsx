import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Autocomplete, Button, FormControlLabel, Grid, Radio, RadioGroup, Switch, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

let filmScheme = yup.object({
  titulo: yup.string().required(),
  imagem: yup.string().required(),
  sinopse: yup.string().required(),
  elenco: yup.string().required(),
  categoria: yup.string().required(),
  valorLocacao: yup.number().required(),
  quantidadeDisponivel: yup.number().required(),
  anoLancamento: yup.number().required(),
});

interface FilmFormProps {
  filme: Filmes | undefined;
  onSubmit: (filme: Filmes) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errors?: string[];
}

export default function FilmForm({
  filme,
  onSubmit,
  onCancel,
  isLoading = false,
  errors = [],
}: FilmFormProps) {
  console.log("🚀 ~ file: index.tsx:28 ~ filme:", filme)
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(filmScheme),
  });
  const imagemMock = [
    { label: 'Film', imagem: "usuario" },
    { label: 'Cliente', imagem: "cliente" },
    { label: 'Diretor', imagem: "diretor" },
    { label: 'Ator', imagem: "ator" }
  ]

  const handleFormSubmit = (newFilms: Filmes) => {
    onSubmit(newFilms);
  };

  const handleCancel = () => {
    reset({ titulo: "", lancamento: "" });
    onCancel();
  };

  useEffect(() => {
    reset(filme);
  }, [filme, reset]);

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(handleFormSubmit)} data-testid="film-form">
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
        spacing={2}
        borderColor={"#7b7b7b"}
        borderRadius={2}
        alignItems="center">

        <Grid container spacing={2} marginBottom={2}>
          <Grid item md={4} xs={12}>
            <TextField
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
