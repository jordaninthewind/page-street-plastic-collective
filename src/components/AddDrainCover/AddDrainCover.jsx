import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

import { useEffect, useState } from "react";

import { Clear, ErrorOutline, LocationPin } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { addMarkerToMapRemote, searchNearbyAddresses } from "@app/services";
import { formatDecimal } from "@app/utils";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const AddDrainCover = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [addressSearchError, setAddressSearchError] = useState(null);

  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");

  useEffect(() => {
    if (!lng || !lat) return;

    const debouncedFetchSearchResults = debounce(async () => {
      try {
        setLoadingSearchResults(true);

        const { results, error } = await searchNearbyAddresses(lng, lat);

        setSearchResults(results || []);
        setAddressSearchError(error || null);
      } catch (error) {
        setAddressSearchError(error.message);
      } finally {
        setLoadingSearchResults(false);
      }
    }, 500);

    debouncedFetchSearchResults();
  }, [lng, lat]);

  const onSubmit = async (data) => {
    try {
      setSaving(true);

      await addMarkerToMapRemote({ lng, lat, ...data });

      enqueueSnackbar(
        "We received your request and will update the map and (try to) send you an email when it's been added!",
        {
          variant: "success",
        }
      );

      setSearchParams({});
    } catch ({ message }) {
      enqueueSnackbar(message, { severity: "error" });
    } finally {
      setSaving(false);
      reset();
    }
  };

  const handleLocationClick = () =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setSearchParams({
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
          {loadingSearchResults ? (
            <CircularProgress size={20} />
          ) : addressSearchError ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ErrorOutline color="error" />
              <Typography variant="body1" color="error">
                {addressSearchError}
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
            <Typography variant="body1">
              {" "}
              <ErrorOutline /> No nearby addresses found
            </Typography>
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
        <InputLabel>Covered / Missing</InputLabel>
        <Select
          fullWidth
          sx={{ mb: 2 }}
          {...register("state")}
          required
          defaultValue="missing"
        >
          <MenuItem value="missing">Missing</MenuItem>
          <MenuItem value="covered">Covered</MenuItem>
        </Select>
        <InputLabel>Cover Type</InputLabel>
        <Select
          fullWidth
          sx={{ mb: 2 }}
          {...register("cover_type")}
          required
          defaultValue="standard-square"
        >
          <MenuItem value="standard-square">Standard - Square</MenuItem>
          <MenuItem value="standard-round">Standard - Round</MenuItem>
          <MenuItem value="oversize-square">Oversize - Square</MenuItem>
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
          placeholder="Anything else you want to add?"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            saving ||
            !watch("address") ||
            !watch("state") ||
            !watch("cover_type") ||
            !watch("requested_by") ||
            !watch("email") ||
            !watch("description")
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
        onClick={() => setSearchParams({})}
        fullWidth
      >
        Cancel
      </Button>
    </>
  );
};

export default AddDrainCover;
