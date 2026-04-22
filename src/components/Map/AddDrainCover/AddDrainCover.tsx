import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import { useEffect } from "react";

import { Clear, Close, ErrorOutline, LocationPin } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { COVER_TYPES } from "@app/constants";
import { useSearchParamState } from "@app/hooks";
import useMapStore from "@app/stores/mapStore";
import { formatDecimal } from "@app/utils";
import withAuth from "@app/components/HOC/withAuth";
import type { User } from "@app/types";

interface AddDrainCoverFormValues {
  cover_type: string;
  address: string;
  requested_by: string;
  email: string;
  description: string;
}

const AddDrainCover = withAuth(({ user }: { user: User | null }) => {
  const { id, lng, lat, setParams } = useSearchParamState();

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<AddDrainCoverFormValues>({
      defaultValues: { cover_type: "standard-square" },
    });

  const {
    addCover,
    searchNearbyAddresses,
    searchLoading,
    searchError,
    searchResults,
    saving,
    loading,
    error,
  } = useMapStore();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: "error" });
  }, [error, enqueueSnackbar]);

  useEffect(() => {
    if (!lng || !lat) return;
    searchNearbyAddresses(Number(lng), Number(lat));
  }, [id, lng, lat, searchNearbyAddresses]);

  const onSubmit = async (data: AddDrainCoverFormValues) => {
    try {
      await addCover({
        lng: Number(lng),
        lat: Number(lat),
        ...data,
        requested_by: user?.name ?? data.requested_by,
      });
      enqueueSnackbar(
        "We received your request and will update the map and (try to) send you an email when it's been added!",
        { variant: "success" }
      );
      setParams({});
      reset();
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const handleLocationClick = () =>
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setParams({
          lat: String(coords.latitude),
          lng: String(coords.longitude),
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

  if (!id && !lat && !lng) return null;

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2, width: "100%" }}
      >
        <Typography variant="h4">Missing a cover here?</Typography>
        <IconButton onClick={() => setParams({})}>
          <Close />
        </IconButton>
      </Stack>
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
            <Grid container spacing={2} sx={{ width: "fit-content", margin: "0 auto" }}>
              {searchResults.map((result) => (
                <Grid size={{ xs: 12 }} key={result.id}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setValue("address", result.text)}
                  >
                    {result.text}
                  </Button>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ErrorOutline />
              <Typography variant="body1">No nearby addresses found</Typography>
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
        <InputLabel sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          Cover Type
        </InputLabel>
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          {COVER_TYPES.map(({ value, label }) => (
            <Chip
              key={value}
              label={label}
              onClick={() => setValue("cover_type", value)}
              color={watch("cover_type") === value ? "primary" : "default"}
              variant={watch("cover_type") === value ? "filled" : "outlined"}
            />
          ))}
        </Stack>
        <input type="hidden" {...register("cover_type")} />
        {user ? (
          <>
            <input type="hidden" {...register("requested_by")} value={user.id} />
            <input type="hidden" {...register("email")} value={user.email} />
          </>
        ) : (
          <>
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
          </>
        )}
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
          disabled={loading || saving || !watch("address")}
          fullWidth
        >
          {saving ? "Sending Request..." : "Add Request"}
        </Button>
      </form>
    </Stack>
  );
});

export default AddDrainCover;
