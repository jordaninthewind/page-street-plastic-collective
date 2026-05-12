import { CircularProgress } from "@mui/material";

import { useIsMobile, useSearchParamState } from "@app/hooks";
import useMapStore from "@app/stores/mapStore";

const MapFilters = () => {
  const { isMobile } = useIsMobile();
  const { filter, setFilter, clearFilter } = useSearchParamState();
  const { covers, loading } = useMapStore();

  if (loading) return <CircularProgress size={18} />;

  const handleSetFilter = (value: string) => () => setFilter(value);

  return (
    <div className={`map-filter-row${isMobile ? " map-filter-row--col" : ""}`}>
      <button
        className={`map-btn map-btn--sm${filter === "covered" ? " map-btn--fill" : ""}`}
        onClick={handleSetFilter("covered")}
      >
        Covered ({covers.filter(({ covered }) => covered).length})
      </button>
      <button
        className={`map-btn map-btn--sm${filter === "missing" ? " map-btn--fill" : ""}`}
        onClick={handleSetFilter("missing")}
      >
        Missing ({covers.filter(({ covered }) => !covered).length})
      </button>
      <button className="map-btn map-btn--sm" onClick={clearFilter}>
        Reset
      </button>
    </div>
  );
};

export default MapFilters;
