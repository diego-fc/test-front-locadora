import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { DatePicker, LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { parseISO } from "date-fns";

let locationScheme = yup.object({
  locadorId: yup.number().notRequired(),
  filmeId: yup.number().notRequired(),
  dataRetirada: yup.string().notRequired(),
  dataDevolucao: yup.string().notRequired(),
  horaLimiteDevolucao: yup.string().notRequired(),
  valorMultaAtraso: yup.number().notRequired(),
  valorTotal: yup.number().notRequired(),
  situacao: yup.string().notRequired(),
});

interface locationFormProps {
  location: Locations | undefined;
  usuarios: Usuario[];
  filme: Filmes[];
  onCancel: () => void;
  isLoading?: boolean;
  errors?: string[];
}

export default function InfoView({
  location,
  usuarios,
  filme,
  onCancel,
  isLoading = false,
}: locationFormProps) {
  const [newUser, setNewUser] = useState<Usuario>()
  const [newFilms, setNewFilms] = useState<Filmes>()
  const {
    register,
    control,
    formState: { errors: formErrors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(locationScheme),
  });

  useEffect(() => {
    reset(location);
  }, [location, reset]);

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    const findUser = usuarios.find((item) =>
      item.id === location?.locadorId
    )
    const findFilms = filme.find((item) =>
      item.id === location?.filmeId
    )
    setNewUser(findUser);
    setNewFilms(findFilms);
  }, [filme, usuarios])

  return (
    <>
      <form data-testid="location-view" style={{ width: "100%" }}>
        <Grid
          data-testid="search"
          container
          marginTop={1}
          border={1}
          padding={2}
          borderColor={"#7b7b7b"}
          borderRadius={2}
          alignItems="center"
        >
          <Grid container spacing={2} marginBottom={2}>
            <Grid item md={4} xs={12}>
              <Controller
                control={control}
                render={({ field: { value, ref, onChange, ...field } }) => (
                  <TextField
                    disabled
                    fullWidth
                    label="Locador"
                    value={newUser?.nome}
                    size="small"
                    inputRef={ref}
                    error={!!formErrors.locadorId}
                    variant="outlined"
                  />
                )}
                name="locadorId"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Controller
                control={control}
                render={({ field: { value, ref, onChange, ...field } }) => (
                  <TextField
                    disabled
                    fullWidth
                    label="Filme"
                    size="small"
                    value={newFilms?.titulo}
                    inputRef={ref}
                    error={!!formErrors.filmeId}
                    variant="outlined"
                  />
                )}
                name="filmeId"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disabled

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
                  disabled

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
                  disabled
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
                disabled
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
                disabled
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
                  <TextField
                    fullWidth
                    disabled
                    label="Situação"
                    size="small"
                    inputRef={ref}
                    {...register("situacao")}
                    error={!!formErrors.situacao}
                    variant="outlined"
                  />
                )}
                name="situacao"
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
                data-testid="location-cancel"
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
