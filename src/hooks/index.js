import { useSearchParams } from "react-router";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const useSearchParamState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter");

  const clearFilter = () => {
    setSearchParams({});
  };

  return {
    filter,
    setSearchParams,
    setFilter: (value) => setSearchParams({ filter: value }),
    clearFilter,
  };
};

export const useIsMobile = () => {
  const { breakpoints } = useTheme();

  const isMobile = useMediaQuery(breakpoints.down("md"));

  return { isMobile };
};
