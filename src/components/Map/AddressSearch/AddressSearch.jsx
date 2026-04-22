import { useCallback, useState } from "react";

import { Box, MenuItem, Select } from "@mui/material";

import { useSearchParamState } from "@app/hooks";
import useMapStore from "@app/stores/mapStore";

const AddressSearch = () => {
  const { id, setParams } = useSearchParamState();

  const { covers } = useMapStore();

  const [selectedId, setSelectedId] = useState(id || "");

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setSelectedId(value);

      const cover = covers.find((cover) => cover.id === Number(value));

      if (!cover) return;

      setParams({ id: cover.id, lat: cover.lat, lng: cover.lng });
    },
    [covers, setParams]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Select fullWidth onChange={handleChange} value={selectedId} displayEmpty>
        <MenuItem value="">
          {" "}
          Select a cover to navigate and show info{" "}
        </MenuItem>
        {covers?.map(({ id, address }) => (
          <MenuItem key={id} value={id}>
            {address}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default AddressSearch;
