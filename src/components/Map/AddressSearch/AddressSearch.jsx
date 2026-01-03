import { useCallback } from "react";

import { MenuItem, Select } from "@mui/material";

import { useSearchParamState } from "@app/hooks";
import { useMapStore } from "@app/stores";

const AddressSearch = () => {
  const { markers } = useMapStore();
  const { setParams } = useSearchParamState();

  const handleMarkerClick = useCallback((id) => setParams({ id }), [setParams]);

  return (
    <Select fullWidth>
      <MenuItem value="" disabled>
        Select a marker to navigate and show info
      </MenuItem>
      {markers?.map((marker) => (
        <MenuItem
          key={marker.id}
          onClick={() => handleMarkerClick(marker.id)}
          value={marker.id}
        >
          {marker.address}
        </MenuItem>
      ))}
    </Select>
  );
};

export default AddressSearch;
