import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

import { useEffect } from "react";

import { Clear, ErrorOutline, Info, LocationPin } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { useMapStore } from "@app/stores";
import { formatDecimal, validateEmail } from "@app/utils";

const AddDrainCover = () => {
  const [searchParams, setParams] = useSearchParams();

  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const {
    addMarker,
    searchNearbyAddresses,
    searchLoading,
    searchError,
    searchResults,
    saving,
    loading,
    error,
  } = useMapStore();
  const { enqueueSnackbar } = useSnackbar();

  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error, enqueueSnackbar]);

  useEffect(() => {
    if (!lng || !lat) return;

    searchNearbyAddresses(lng, lat);
  }, [lng, lat, searchNearbyAddresses]);

  const onSubmit = async (data) => {
    try {
      await addMarker({ lng, lat, ...data });

      enqueueSnackbar(
        "We received your request and will update the map and (try to) send you an email when it's been added!",
        {
          variant: "success",
        }
      );

      setParams({});
      reset();
    } catch ({ message }) {
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const handleLocationClick = () =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setParams({
          overlay: "marker",
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

  return (
    <>
      <Typography variant="h2" sx={{ mb: 2 }}>
        Request a printed drain cover
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 2, width: "100%" }}
        >
          <Typography variant="body1">
            Location: {formatDecimal(lat)}, {formatDecimal(lng)}
          </Typography>
          <IconButton onClick={handleLocationClick}>
            <LocationPin />
          </IconButton>
        </Stack>
        <Stack
          sx={{ mb: 2, width: "100%" }}
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <InputLabel sx={{ mb: 2 }}>
            <Typography variant="h5">Nearby Addresses</Typography>
          </InputLabel>
          {searchLoading ? (
            <CircularProgress size={20} />
          ) : searchError ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ErrorOutline color="error" />
              <Typography variant="body1" color="error">
                {searchError}
              </Typography>
            </Box>
          ) : searchResults.length > 0 ? (
            <Grid
              container
              spacing={2}
              sx={{ width: "fit-content", margin: "0 auto" }}
            >
              {searchResults.map((result) => (
                <Grid xs={12} key={result.id}>
                  <Button
                    variant="outlined"
                    color="accent"
                    fullWidth
                    onClick={() => setValue("address", result.text)}
                    selected={watch("address") === result.text}
                  >
                    {result.text}
                  </Button>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ErrorOutline />
              <Typography variant="body1">
                {" "}
                No nearby addresses found
              </Typography>
            </Box>
          )}
        </Stack>
        <InputLabel>Address</InputLabel>
        <TextField
          fullWidth
          placeholder="Any nearby street address"
          sx={{ mb: 2 }}
          {...register("address")}
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setValue("address", "")}>
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <InputLabel sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Cover Type
          <Tooltip title="We are currently only offering square covers. We will be adding round and oversize covers soon!">
            <Info />
          </Tooltip>
        </InputLabel>
        <Select
          fullWidth
          sx={{ mb: 2 }}
          {...register("cover_type")}
          defaultValue="standard-square"
        >
          <MenuItem value="standard-square">Standard - Square</MenuItem>
          <MenuItem value="standard-round" disabled>
            Standard - Round
          </MenuItem>
          <MenuItem value="oversize-square" disabled>
            Oversize - Square
          </MenuItem>
        </Select>
        <TextField
          label="Requested By"
          fullWidth
          sx={{ mb: 2 }}
          {...register("requested_by")}
          required
          placeholder="Emperor Norton II of San Francisco"
        />
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          sx={{ mb: 2 }}
          {...register("email")}
          required
          placeholder="example@example.com"
        />
        <TextField
          label="Anything else you want to add?"
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          {...register("description")}
          placeholder="Give some details if you want!"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            loading ||
            saving ||
            !watch("address") ||
            !watch("requested_by") ||
            !validateEmail(watch("email"))
          }
          fullWidth
        >
          {saving ? "Sending Request..." : "Submit Request"}
        </Button>
      </form>
      <Button
        variant="outlined"
        color="primary"
        sx={{ mt: 2 }}
        disabled={saving}
        onClick={() => setParams({})}
        fullWidth
      >
        Cancel
      </Button>
    </>
  );
};

export default AddDrainCover;
