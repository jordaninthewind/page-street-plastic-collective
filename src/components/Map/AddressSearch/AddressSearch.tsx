import { useCallback, useState } from "react";

import { Box, MenuItem, Select, type SelectChangeEvent } from "@mui/material";

import { useSearchParamState } from "@app/hooks";
import useMapStore from "@app/stores/mapStore";

const AddressSearch = () => {
  const { id, setParams } = useSearchParamState();
  const { covers } = useMapStore();
  const [selectedId, setSelectedId] = useState<string | number>(id || "");

  const handleChange = useCallback(
    (event: SelectChangeEvent<string | number>) => {
      const value = event.target.value;
      setSelectedId(value);
      const cover = covers.find((c) => String(c.id) === String(value));
      if (!cover) return;
      setParams({ id: String(cover.id), lat: String(cover.lat), lng: String(cover.lng) });
    },
    [covers, setParams]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Select fullWidth onChange={handleChange} value={selectedId} displayEmpty>
        <MenuItem value="">Select a cover to navigate and show info</MenuItem>
        {covers?.map(({ id: coverId, address }) => (
          <MenuItem key={coverId} value={coverId}>
            {address}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default AddressSearch;
