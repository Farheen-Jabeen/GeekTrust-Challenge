import React, { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Modal, Fade, Backdrop, Box } from "@mui/material";
import { red, blue } from "@mui/material/colors";
import { IconButton, TableCell, TableRow } from "@material-ui/core";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import "./TableData.css";

const Tabledata = ({ user, Delete, checked, selectUser }) => {
  const [userData, setUserData] = useState({
    username: user.name,
    email: user.email,
    role: user.role
  });

  const handleChange = (event) => {
    setUserData((data) => ({
      ...data,
      [event.target.name]: event.target.value
    }));
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <TableRow key={user.id} className={checked ? "selected" : ""}>
      <TableCell>
        <input type="checkbox" checked={checked} onClick={selectUser} />
      </TableCell>
      <TableCell className="tableCell">{userData.username}</TableCell>
      <TableCell className="tableCell">{userData.email}</TableCell>
      <TableCell className="tableCell">{userData.role}</TableCell>
      <TableCell className="tableCell">
        <IconButton onClick={handleOpen}>
          <BorderColorIcon sx={{ fontSize: 20, color: blue[400] }} />
        </IconButton>
        <IconButton onClick={() => Delete(userData.id)}>
          <DeleteOutlinedIcon sx={{ fontSize: 20, color: red[400] }} />
        </IconButton>
      </TableCell>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 200,
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 4,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <TableCell>
              Name
              <input
                name="name"
                value={userData.username}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              Email
              <input
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </TableCell>
            <TableCell>
              Role
              <input
                name="role"
                value={userData.role}
                onChange={handleChange}
              />
            </TableCell>

            <TableCell>
              <IconButton
                className="saveAs"
                color="primary"
                onClick={handleClose}
              >
                <SaveAsIcon className="SaveAsIcon" /> SaveAs
              </IconButton>
            </TableCell>
          </Box>
        </Fade>
      </Modal>
    </TableRow>
  );
};

export default Tabledata;
