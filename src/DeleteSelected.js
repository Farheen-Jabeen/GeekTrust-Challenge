import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

const deleteSelectedRows = ({ handleDeleteRows }) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteRows}
        style={{
          color: "red",
          borderRadius: 5,
          marginTop: 2,
          backgroundColor: "purple"
        }}
      >
        Delete Selected
      </Button>
    </Stack>
  );
};
export default deleteSelectedRows;
