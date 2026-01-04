import { MenuItem, Select } from "@mui/material";

import { useSearchParamState } from "@app/hooks";
import { useMapStore } from "@app/stores";

const AddressSearch = () => {
  const { markers } = useMapStore();

  const { setParams } = useSearchParamState();

  return (
    <Select fullWidth>
      <MenuItem value="" disabled>
        Select a marker to navigate and show info
      </MenuItem>
      {markers?.map(({ id, lat, lng, address }) => (
        <MenuItem
          key={id}
          onClick={() => setParams({ id, lat, lng })}
          value={id}
        >
          {address}
        </MenuItem>
      ))}
    </Select>
  );
};

export default AddressSearch;
