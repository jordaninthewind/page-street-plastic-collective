import { useCallback } from "react";

import { useSearchParamState } from "@app/hooks";
import useMapStore from "@app/stores/mapStore";

const AddressSearch = () => {
  const { id, setParams } = useSearchParamState();
  const { covers } = useMapStore();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      const cover = covers.find((c) => String(c.id) === String(value));
      if (!cover) return;
      setParams({ id: String(cover.id), lat: String(cover.lat), lng: String(cover.lng) });
    },
    [covers, setParams]
  );

  return (
    <select className="map-select" onChange={handleChange} value={id ?? ""}>
      <option value="">Select a cover to navigate and show info</option>
      {covers?.map(({ id: coverId, address }) => (
        <option key={coverId} value={coverId}>
          {address}
        </option>
      ))}
    </select>
  );
};

export default AddressSearch;
