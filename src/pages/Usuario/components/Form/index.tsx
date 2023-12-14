import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Button, FormControlLabel, Grid, Radio, RadioGroup, Switch, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { Airport } from "../../../../../types/airport";

let airportScheme = yup.object({
  airportAbbreviation: yup.string().max(3).required(),
  description: yup.string().max(100).required(),
  status: yup.boolean().notRequired(),
});

interface AirportFormProps {
  airport: Airport;
  onSubmit: (airport: Airport) => void;
  onCancel: () => void;
  isLoading?: boolean;
  errors?: string[];
}

export default function AirportForm({
  airport,
  onSubmit,
  onCancel,
  isLoading = false,
  errors = [],
}: AirportFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(airportScheme),
  });

  useEffect(() => {
    reset(airport);
  }, [airport, reset]);

  const handleFormSubmit = (newAirports: Airport) => {
    onSubmit(newAirports);
  };

  const handleCancel = () => {
    reset({ airportAbbreviation: "", description: "" });
    onCancel();
  };
  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(handleFormSubmit)} data-testid="airport-form">
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
          <Grid item md={2} xs={4}>
            <TextField
              data-testid="airportAbbreviation-input"
              fullWidth
              label="Airport abbreviation"
              variant="outlined"
              size="small"
              {...register("airportAbbreviation")}
              error={!!formErrors.airportAbbreviation}
              inputProps={{ maxLength: 3 }}
            />
          </Grid>
          <Grid item md={8} xs={8}>
            <TextField
              data-testid="description-input"
              fullWidth
              label="Description"
              variant="outlined"
              size="small"
              {...register("description")}
              error={!!formErrors.description}
              inputProps={{ maxLength: 100 }}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              render={({ field: { value } }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!value}
                      inputProps={{ "aria-label": "controlled" }}
                      {...register("status")}
                    />
                  }
                  labelPlacement="start"
                  label="Status"
                />
              )}
              name="status"
              control={control}
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
