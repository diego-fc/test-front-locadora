import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { Airport } from "../../../../../types/airport";

let airportScheme = yup.object({
  SIGLA_AEROPORTO: yup.string().required(),
  DSC_AEROPORTO: yup.string().required(),
  ATIVO: yup.boolean().notRequired(),
});

interface airportFormProps {
  airport: Airport;
  onCancel: () => void;
  isLoading?: boolean;
  errors?: string[];
}

export default function InfoView({
  airport,
  onCancel,
  isLoading = false,
}: airportFormProps) {
  const {
    register,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(airportScheme),
  });

  useEffect(() => {
    reset(airport);
  }, [airport, reset]);

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <form data-testid="airport-view" style={{ width: "100%" }}>
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
          <Grid item md={2} xs={4}>
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  fullWidth
                  disabled
                  type="text"
                  label="Abbreviation"
                  size="small"
                  error={!!formErrors.SIGLA_AEROPORTO}
                  InputLabelProps={{ shrink: !!value }}
                  {...register("SIGLA_AEROPORTO")}
                />
              )}
              name="SIGLA_AEROPORTO"
            />
          </Grid>
          <Grid item md={8} xs={8}>
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  fullWidth
                  type="text"
                  disabled
                  label="Description"
                  variant="outlined"
                  size="small"
                  defaultValue={value}
                  value={value}
                  error={!!formErrors.DSC_AEROPORTO}
                  InputLabelProps={{ shrink: !!value }}
                  {...register("DSC_AEROPORTO")}
                />
              )}
              name="DSC_AEROPORTO"
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              render={({ field: { value } }) => (
                <FormControlLabel
                  control={
                    <Switch
                      disabled
                      checked={!!value}
                      inputProps={{ "aria-label": "controlled" }}
                      {...register("ATIVO")}
                    />
                  }
                  labelPlacement="start"
                  label="Status"
                />
              )}
              name="ATIVO"
              control={control}
            />
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            spacing={2}
            marginTop={4}>
            <Grid>
              <Button
                data-testid="airport-cancel"
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
