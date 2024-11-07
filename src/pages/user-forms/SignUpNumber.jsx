import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../context/AuthContext";
import PulseLoader from "react-spinners/PulseLoader";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { handlePostData } from "../../services/PostDataService";

const SignUpNumber = () => {
  const navigate = useNavigate();
  const { card_selling_admin_panel, login, logout } = useContext(AuthContext);
  const [number, setNumber] = useState("");
  const [oldPasswordShow, setOldPasswordShow] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSnakbarOpen = (msg, vrnt) => {
    let duration;
    if (vrnt === "error") {
      duration = 3000;
    } else {
      duration = 1000;
    }
    enqueueSnackbar(msg, {
      variant: vrnt,
      autoHideDuration: duration,
    });
  };

  const validation = () => {
    let isError = false;

    // if (!oldPassword.trim()) {
    //   handleSnakbarOpen("Please enter old password", "error");
    //   document.getElementById("oldPassword").focus();
    //   return (isError = true);
    // }
    if (!newPassword.trim()) {
      handleSnakbarOpen("Please enter new password", "error");
      document.getElementById("newPassword").focus();
      return (isError = true);
    }
    if (newPassword.trim().length < 6) {
      handleSnakbarOpen(
        "The password field must be at least 6 characters.",
        "error"
      );
      document.getElementById("newPassword").focus();
      return (isError = true);
    }
    if (!confirmPassword.trim()) {
      handleSnakbarOpen("Please enter confirm password", "error");
      document.getElementById("confirmPassword").focus();
      return (isError = true);
    }
    if (newPassword.trim() !== confirmPassword.trim()) {
      handleSnakbarOpen(
        "Your new password and confirm password is not same",
        "error"
      );
      document.getElementById("confirmPassword").focus();
      return (isError = true);
    }

    return isError;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    setLoading(true);

    let data = {
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
      attributes: {
        mobileNumber: number,
        countryCode: "+964",
        countryId: 103,
      },
    };

    let url = `/api/v1/public/sign-up/send-mobile-otp`;
    let response = await handlePostData(url, data);
    // let response = await axios({
    //   url: `/api/v1/public/sign-up/send-mobile-otp`,
    //   method: "post",
    //   data: data,
    // });
    console.log("response", response);
    if (response?.status === 401) {
      logout();
      navigate("/");
      return;
    }
    if (response?.status > 199 && response?.status < 300) {
      handleSnakbarOpen("successful", "success");
      login({ temp_token: response?.data?.data?.token });
      navigate("/number-verify");
    } else {
      console.log("response?.data", response?.data?.errors?.toString());

      handleSnakbarOpen(response?.data?.errors?.toString(), "error");
    }

    setLoading(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const customeTextFeild = {
    // padding: "15px 20px",
    background: "#FAFAFA",
    "& label.Mui-focused": {
      color: "#A0AAB4",
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-input": {
      padding: "15px 24px 15px 0px",
    },
    "& .MuiOutlinedInput-root": {
      paddingLeft: "24px",
      "& fieldset": {
        borderColor: "rgba(0,0,0,0)",
      },

      "&:hover fieldset": {
        borderColor: "#969696",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#969696",
      },
    },
  };
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <form
          style={{
            width: "470px",
            padding: "40px 60px",
            background: "#fff",
            borderRadius: "10px",
            textAlign: "center",
            border: `1px solid #E5E5E5`,
            boxSizing: "border-box",
          }}
          onSubmit={onSubmit}
        >
          <img
            src="/logo.svg"
            alt=""
            style={{
              display: "block",
              margin: "auto",
              maxWidth: "155px",
              marginBottom: "30px",
            }}
          />

          <Typography
            color="text.light"
            sx={{ fontSize: "24px", fontWeight: 700, mb: 2, display: "block" }}
          >
            Registration Form
          </Typography>
          <Typography
            variant="base"
            color="text.light"
            sx={{ fontWeight: 500, mb: 4, display: "block" }}
          >
            Please Enter Your Mobile Number
          </Typography>

          <Box sx={{ mb: 4 }}>
            <TextField
              required
              sx={{ ...customeTextFeild }}
              placeholder="Enter Phone Number"
              fullWidth
              // size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <svg
                      width="24"
                      height="24"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 120 120"
                    >
                      <path
                        d="M85.81 120H34.19a8.39 8.39 0 0 1-8.38-8.39V8.39A8.39 8.39 0 0 1 34.19 0h51.62a8.39 8.39 0 0 1 8.38 8.39v103.22a8.39 8.39 0 0 1-8.38 8.39zM34.19 3.87a4.52 4.52 0 0 0-4.51 4.52v103.22a4.52 4.52 0 0 0 4.51 4.52h51.62a4.52 4.52 0 0 0 4.51-4.52V8.39a4.52 4.52 0 0 0-4.51-4.52z"
                        fill="#969696"
                      />
                      <path
                        d="M73.7 10.32H46.3L39.28 3.3 42.01.57l5.89 5.88h24.2L77.99.57l2.73 2.73-7.02 7.02zM47.1 103.23h25.81v3.87H47.1z"
                        fill="#969696"
                      />
                    </svg>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              id="name"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />{" "}
            {errors?.number && (
              <Typography
                variant="small"
                color="error.main"
                sx={{ textAlign: "left" }}
              >
                {errors.number.toString()}
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            disableElevation
            fullWidth
            sx={{ minHeight: "56px", mb: 4 }}
            disabled={loading}
            // onClick={onSubmit}
            type="submit"
          >
            {loading === false && "Continue"}
            <PulseLoader
              color={"#353b48"}
              loading={loading}
              size={10}
              speedMultiplier={0.5}
            />{" "}
          </Button>
        </form>
      </Grid>
    </div>
  );
};

export default SignUpNumber;
