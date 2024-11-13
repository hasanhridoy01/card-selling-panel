import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { handleGetData } from "../../services/GetDataService";
import { AuthContext } from "../../context/AuthContext";
import ClearIcon from "@mui/icons-material/Clear";
import useHandleSnackbar from "../../services/HandleSnakbar";
import { handlePostData } from "../../services/PostDataService";

const AddUser = () => {
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const { card_selling_admin_panel } = useContext(AuthContext);
  const handleSnackbarOpen = useHandleSnackbar();

  // State variables for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [roleId, setRoleId] = useState("");
  const [checkerId, setCheckerId] = useState("");
  const [status, setStatus] = useState("");

  //get Roles
  const getRoles = async () => {
    setLoading(true);
    const url = `/api/v1/private/roles`;
    const res = await handleGetData(url, card_selling_admin_panel.access_token);

    if (res?.status >= 200 && res?.status < 300) {
      setRoles(res?.data?.data?.roles);
    } else {
      console.error(
        "Failed to fetch roles:",
        res?.data?.message || "Unknown error"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submission
  const handleAddUser = async (event) => {
    event.preventDefault();
    setLoadingUser(true);

    const data = {
      metaInfo: {
        requestId: "1234234234234",
        source: "Android/iOS",
        versionCode: "3.1.4",
        versionName: "10",
        networkType: "Wifi/Mobile",
        deviceID: "IMEI/DEVICE_ID/UDID",
        deviceOSCode: 27,
        deviceOSName: "8.1.0",
        deviceName: "Galaxy Ace",
        language: "en",
        latitude: 11.3344,
        longitude: 54.5645645,
      },
      attribute: {
        phoneNumber: phoneNumber,
        email: email,
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        status: status,
        checkerId: checkerId,
      },
    };

    // Api Calling
    let url = `/api/v1/private/create-system-user`;
    let response = await handlePostData(
      url,
      data,
      card_selling_admin_panel.access_token
    );
    if (response?.status > 199 && response?.status < 300) {
      setLoadingUser(false);
      handleSnackbarOpen("Successful", "success", 1000);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setRoleId("");
      setCheckerId("");
      setStatus("");
      handleClose();
    } else {
      setLoadingUser(false);
      handleSnackbarOpen(
        response?.data?.error?.reason.toString(),
        "error",
        3000
      );
    }
  };

  const handleStatusChange = (e) => {
    if (e.target.value === true) {
      setCheckerId("");
    }
    setStatus(e.target.value);
  };

  return (
    <React.Fragment>
      <Button
        sx={{
          minWidth: "150px",
          backgroundColor: "#FC2861",
          color: "#ffffff",
          fontFamily: '"Manrope", serif',
        }}
        onClick={handleClickOpen}
      >
        Add User
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px", // Set your desired border radius here
          },
        }}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            handleAddUser(event);
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ px: 5, py: 2, borderBottom: "1px solid #d3d3d3" }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid size={8}>Add Users</Grid>
            <Grid size={4} sx={{ textAlign: "right" }}>
              <IconButton onClick={handleClose}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent
          sx={{ minWidth: "650px", maxWidth: "650px", px: 5, pb: 0 }}
        >
          <Box sx={{ flexGrow: 1, py: 3 }}>
            <Grid container spacing={3}>
              <Grid size={6}>
                <TextField
                  size="small"
                  fullWidth
                  required
                  label="First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  size="small"
                  type="email"
                  required
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid size={6}>
                <FormControl required fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Select Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Role"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                  >
                    {roles?.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {" "}
                        {role.roleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl required fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Select Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Status"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>InActive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl required fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Select Checker
                  </InputLabel>
                  <Select
                    disabled={status}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Checker"
                    value={checkerId}
                    onChange={(e) => setCheckerId(e.target.value)}
                  >
                    {roles?.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.roleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 5, py: 2, borderTop: "1px solid #d3d3d3" }}>
          <Button
            variant="outlined"
            color="inherit"
            sx={{ minWidth: "110px" }}
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            sx={{
              backgroundColor: "#FC2861",
              color: "#ffffff",
              fontFamily: '"Manrope", serif',
              minWidth: "110px",
            }}
            type="submit"
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddUser;
