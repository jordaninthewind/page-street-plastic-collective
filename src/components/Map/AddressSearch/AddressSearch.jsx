import { useCallback, useState } from "react";

import { Box, MenuItem, Select } from "@mui/material";

import { useSearchParamState } from "@app/hooks";
import { useMapStore } from "@app/stores";

const AddressSearch = () => {
  const { id, setParams } = useSearchParamState();

  const { markers } = useMapStore();

  const [selectedId, setSelectedId] = useState(id || "");

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setSelectedId(value);

      const marker = markers.find((marker) => marker.id === Number(value));

      if (!marker) return;

      setParams({ id: marker.id, lat: marker.lat, lng: marker.lng });
    },
    [markers, setParams]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Select fullWidth onChange={handleChange} value={selectedId} displayEmpty>
        <MenuItem value="">
          {" "}
          Select a marker to navigate and show info{" "}
        </MenuItem>
        {markers?.map(({ id, address }) => (
          <MenuItem key={id} value={id}>
            {address}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default AddressSearch;
