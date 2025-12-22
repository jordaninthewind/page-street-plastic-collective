import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

import { useState } from "react";

import { LocationPin } from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { addMarkerToMapRemote } from "@app/services";
import { formatDecimal } from "@app/utils";

const AddDrainCover = ({ lat, lng }) => {
  const [_, setSearchParams] = useSearchParams();

  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      setSaving(true);

      const { id } = await addMarkerToMapRemote({ lng, lat, ...data });

      setSearchParams({ overlay: "marker", id });
    } catch (error) {
      console.error(error);
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
      <TextField
        label="Address"
        fullWidth
        sx={{ mb: 2 }}
        {...register("address")}
        required
        placeholder="123 Main St, San Francisco, CA 94101"
      />
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
        disabled={saving}
      >
        {saving ? "Sending Request..." : "Request"}
      </Button>
    </form>
  );
};

export default AddDrainCover;
