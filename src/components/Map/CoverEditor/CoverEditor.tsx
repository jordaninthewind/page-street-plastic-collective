import { useSearchParams } from "react-router";

import { Box } from "@mui/material";

import { AddDrainCover, CoverInfo } from "@app/components";

const CoverEditor = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  return (
    <Box
      sx={{
        p: 2,
        minWidth: "fit-content",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {id ? <CoverInfo /> : <AddDrainCover />}
    </Box>
  );
};

export default CoverEditor;
