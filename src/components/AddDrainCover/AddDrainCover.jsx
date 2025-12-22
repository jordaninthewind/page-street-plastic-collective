import { useForm } from "react-hook-form";

import { useState } from "react";

import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";

import { addMarkerToMapRemote } from "@app/utils/supabase/supabaseUtils";

const AddDrainCover = ({ lat, lng }) => {
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const formatDecimal = (float, length = 3) => {
    if (!float) return "";

    const [integer, decimal] = float.toString().split(".");
    return `${integer}.${decimal.slice(0, length)}`;
  };

  const onSubmit = async (data) => {
    try {
      setSaving(true);
      await addMarkerToMapRemote({ lng, lat, ...data });
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Location: {formatDecimal(lat)}, {formatDecimal(lng)}
      </Typography>
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
        {...register("type")}
        required
        defaultValue="standard-square"
      >
        <MenuItem value="standard-square">Standard - Square</MenuItem>
        <MenuItem value="standard-round">Standard - Round</MenuItem>
        <MenuItem value="oversize-square">Oversize - Square</MenuItem>
      </Select>
      <TextField
        label="Name"
        fullWidth
        sx={{ mb: 2 }}
        {...register("name")}
        required
        placeholder="Emperor Norton II of San Francisco"
      />
      <TextField
        label="Email Address"
        type="email"
        fullWidth
        sx={{ mb: 2 }}
        {...register("emailAddress")}
        required
        placeholder="example@example.com"
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
