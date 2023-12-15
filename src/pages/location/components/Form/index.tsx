import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Autocomplete, Button, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { parseISO } from "date-fns";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

let locationScheme = yup.object({
  locadorId: yup.number().required(),
  filmeId: yup.number().required(),
  dataRetirada: yup.string().required(),
  dataDevolucao: yup.string().required(),
  horaLimiteDevolucao: yup.string().required(),
  valorMultaAtraso: yup.number().required(),
  valorTotal: yup.number().required(),
  situacao: yup.string().required(),
});

interface locationFormProps {
  location: Locations | undefined;
  filme: Filmes[];
  usuarios: Usuario[];
  onSubmit: (location: Locations) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errors?: string[];
}

export default function FilmForm({
  location,
  filme,
  usuarios,
  onSubmit,
  onCancel,
  isLoading = false,
  errors = [],
}: locationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    control,
    setValue
  } = useForm({
    resolver: yupResolver(locationScheme),
  });

  const situationMock = [
    { label: 'Regular', description: "regular" },
    { label: 'Atrasado', description: "atrasado" },
    { label: 'Entregue', description: "entregue" },
  ]

  const handleFormSubmit = (newLocation: Locations) => {
    onSubmit(newLocation);
  };

  const handleCancel = () => {
    reset({ situacao: "" });
    onCancel();
  };

  useEffect(() => {
    reset(location);
  }, [location, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)} data-testid="location-form">
      {errors.map((error) => (
        <Alert key={error} severity="error" style={{ marginBottom: 20 }}>
          {error}
        </Alert>
      ))}
      <Grid
        data-testid="search"
        container
        marginLeft={0}
        marginTop={1}
        border={1}
        padding={2}
        borderColor={"#7b7b7b"}
        borderRadius={2}
        alignItems="center">

        <Grid container spacing={2} marginBottom={2}>
          <Grid item md={4} xs={12}>
            <Controller
              control={control}
              render={({ field: { value, ref, onChange, ...field } }) => (
                <Autocomplete
                  options={usuarios}
                  getOptionLabel={(option) => `${option.nome}`}
                  value={
                    usuarios?.findLast(
                      (item) => item.id === value
                    ) || null
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      {...field}
                      label="Locador"
                      size="small"
                      inputRef={ref}
                      error={!!formErrors.locadorId}
                      variant="outlined"
                    />
                  )}
                  onChange={(_: any, data: any) => {
                    return onChange(data?.id)
                  }

                  }
                />
              )}
              name="locadorId"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Controller
              control={control}
              render={({ field: { value, ref, onChange, ...field } }) => (
                <Autocomplete
                  options={filme}
                  getOptionLabel={(option) => `${option.titulo}`}
                  value={
                    filme?.findLast(
                      (item) => item.id === value
                    ) || null
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      {...field}
                      label="Filme"
                      size="small"
                      inputRef={ref}
                      error={!!formErrors.filmeId}
                      variant="outlined"
                    />
                  )}
                  onChange={(_: any, data: any) => {
                    return onChange(data?.id)
                  }

                  }
                />
              )}
              name="filmeId"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                onChange={(newValue) => {
                  if (newValue !== null) {
                    setValue("dataRetirada", new Date(newValue).toISOString());
                  }
                }}
                label={"Data de retirada"}
                value={location ? parseISO(location?.dataRetirada) : null}
                name={"dataRetirada"}
                format="dd/MM/yyyy"
                minDate={new Date()}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={4} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                onChange={(newValue) => {
                  if (newValue !== null) {
                    setValue("dataRetirada", new Date(newValue).toISOString());
                  }
                }}
                label={"Data de devolução"}
                value={location ? parseISO(location?.dataDevolucao) : null}
                name={"dataDevolucao"}
                format="dd/MM/yyyy"
                minDate={new Date()}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={4} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimeField
                onChange={(newValue) => {
                  if (newValue !== null) {
                    setValue("dataRetirada", new Date(newValue).toISOString());
                  }
                }}
                label="Hora limite para devolução"
                value={location ? parseISO(location?.horaLimiteDevolucao) : null}
                format="HH:mm"
                name="horaLimiteDevolucao"
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              data-testid="valorMultaAtraso-input"
              fullWidth
              label="Multa por atraso"
              variant="outlined"
              size="small"
              {...register("valorMultaAtraso")}
              error={!!formErrors.valorMultaAtraso}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              data-testid="valorTotal-input"
              fullWidth
              type="number"
              label="Total"
              variant="outlined"
              size="small"
              {...register("valorTotal")}
              error={!!formErrors.valorTotal}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Controller
              control={control}
              render={({ field: { value, ref, onChange, ...field } }) => (
                <Autocomplete
                  options={situationMock}
                  getOptionLabel={(option) => `${option.description}`}
                  value={
                    situationMock?.findLast(
                      (item) => item.description === value
                    ) || null
                  }
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      {...field}
                      label="Situação"
                      size="small"
                      inputRef={ref}
                      error={!!formErrors.situacao}
                      variant="outlined"
                    />
                  )}
                  onChange={(_: any, data: any) => {
                    return onChange(data?.description)
                  }
                  }
                />
              )}
              name="situacao"
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
