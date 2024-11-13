import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useHandleSnackbar from "../../services/HandleSnakbar";
import { AuthContext } from "../../context/AuthContext";
import { handlePutData } from "../../services/PutDataService";

const Approved = ({ UserId, getUsers }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleSnackbarOpen = useHandleSnackbar();
  const { card_selling_admin_panel } = useContext(AuthContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprovedUser = async (event) => {
    event.preventDefault();
    setLoading(true);

    console.log("inside approved methods");

    let data = null;

    let url = `/api/v1/private/approve-system-user?userId=${UserId}`;
    let response = await handlePutData(
      url,
      data,
      card_selling_admin_panel.access_token
    );

    if (response?.status > 199 && response?.status < 300) {
      handleSnackbarOpen(`${response.data.message}`, "success", 1000);
      //   navigate("/role");
      setLoading(false);
      getUsers();
    } else {
      handleSnackbarOpen(
        response?.data?.error?.reason.toString(),
        "error",
        3000
      );
      setLoading(false);
    }
  };

  console.log(UserId);
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} variant="outlined" color="success">
        Approved
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            handleApprovedUser(event);
          },
        }}
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure To Approved this User?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="inherit"
            sx={{ minWidth: "90px" }}
            disabled={loading}
          >
            Disagree
          </Button>
          <Button
            // onClick={handleClose}
            sx={{
              backgroundColor: "#FC2861",
              color: "#ffffff",
              fontFamily: '"Manrope", serif',
              minWidth: "90px",
            }}
            type="submit"
            autoFocus
            disabled={loading}
          >
            {loading ? "Processing..." : "Agree"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

Approved.propTypes = {
  UserId: PropTypes.string.isRequired,
  getUsers: PropTypes.func.isRequired,
};

export default Approved;
