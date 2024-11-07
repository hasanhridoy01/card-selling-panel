import React, { useRef, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Countdown from "react-countdown";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthContext } from "../../context/AuthContext";
import ForgotPasswordResetPassword from "./ForgotPasswordResetPassword";
import OtpInput from "react-otp-input";
import { IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { handlePostData } from "../../services/PostDataService";

const SignUpNumberOTPVarify = ({ email, reference }) => {
  const navigate = useNavigate();
  const { card_selling_admin_panel, logout, login } = useContext(AuthContext);
  const theme = useTheme();
  const [showOTPSection, setShowOTPSection] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [otpTimeOut, setOtpTimeOut] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [minutes, setMinutes] = useState(5);
  const [myOTP, setMyOTP] = useState({ otp: "" });
  const [errors, setErrors] = useState("");
  const targetTimeRef = useRef(Date.now() + 300000);
  const handleChange = (otp) => {
    console.log("otp", otp);
    setMyOTP({ otp });
    if (otp.length === 4) {
      onSubmit(otp);
    }
  };

  const Completionist = () => <span>Otp time is out</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds < 10 && "0"}
          {seconds}
        </span>
      );
    }
  };
  const newInputStyle = {
    background: "#FAFAFA",
    minWidth: "48px",
    minHeight: "48px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "0px solid #969696",
    // "&::focus": {
    //   width: "250px",
    // },
  };
  const newErrorInputStyle = {
    background: "#FFECEC",
    minWidth: "48px",
    minHeight: "48px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "2px solid #F23836",
    // "&::focus": {
    //   width: "250px",
    // },
  };
  const newFocusStyle = {
    // borderRadius: "6px",
    // border: `1px solid ${theme.palette.text.light}`,
    // outline: `none`,

    outline: "none", // You may want to remove the default outline
    borderColor: "#ddd !important", // Your desired focus border color
  };
  const buttonref = useRef(null);

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

  const onSubmit = async (otp) => {
    // e.preventDefault();
    // setErrors(false);

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
        token: card_selling_admin_panel.temp_token,
        otp: otp,
      },
    };

    let url = `/api/v1/public/sign-up/validate-mobile-otp`;
    let response = await handlePostData(url, data);

    if (response?.status === 401) {
      logout();
      navigate("/");
      return;
    }
    if (response?.status > 199 && response?.status < 300) {
      handleSnakbarOpen("Mobile number verified successfully", "success");
      login({ temp_token: response?.data?.data?.token });
      navigate("/registration-email");
    }

    setLoading(false);
  };

  const resendOtp = async (e) => {
    setLoading2(true);
    try {
      let url = `/api/v1/public/auth/admin/signin`;
      let data = {
        email: card_selling_admin_panel?.email.trim().toLocaleLowerCase(),
        password: card_selling_admin_panel.password.trim(),
        grant_type: process.env.REACT_APP_GRANT_TYPE,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRECT,
        scope: process.env.REACT_APP_SCOPE,
      };
      // let res = await handlePostData(url, data);
      let res = await axios({
        url: url,
        method: "post",
        data: data,
      });

      if (res?.status > 199 && res?.status < 300) {
        handleSnakbarOpen("Please check your email for new opt", "success");
        login({
          email: card_selling_admin_panel?.email.trim().toLocaleLowerCase(),
          password: card_selling_admin_panel.password.trim(),
          ...res.data.data,
        });
      }
      setLoading2(false);

      // login(data);
      // setLoading(false);
      // navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      console.log("catch error", error);
      if (error?.response?.status === 500) {
        handleSnakbarOpen(error?.response?.statusText, "error");
      } else {
        handleSnakbarOpen(error?.response?.data?.message, "error");
        setErrors(error.response.data.errors);
      }
    }
  };
  const lastPartOfEmail = () => {
    const email = card_selling_admin_panel.email;
    const afterAt = email.split("@")[1];
    return "*****@" + afterAt;
  };

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <form
          style={{
            width: "470px",
            padding: "60px 60px",
            background: "#fff",
            borderRadius: "10px",
            border: `1px solid #E5E5E5`,
            boxSizing: "border-box",
          }}
        >
          {/* <img
              src="/logo.svg"
              alt=""
              style={{ display: "block", margin: "auto", maxWidth: "155px" }}
            />{" "}
            <br /> */}
          <Typography
            variant="small"
            sx={{
              mb: 3,
              fontWeight: 500,
              textAlign: "left",
              color: "#555555",
              display: "block",
            }}
          >
            <IconButton
              sx={{ borderRadius: "4px", mr: 0.5 }}
              onClick={() => {
                navigate("/");
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.71258 0.929932L1.64258 6.99993L7.71258 13.0699"
                  stroke="#555555"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.6425 7H1.8125"
                  stroke="#555555"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </IconButton>
            Back
          </Typography>

          <Typography
            color="text.light"
            sx={{ fontSize: "24px", fontWeight: 700, mb: 1, display: "block" }}
          >
            Number Verification
          </Typography>

          <Typography
            variant="medium"
            color="text.light"
            sx={{
              fontWeight: 500,
              textAlign: "left",
              display: "block",
              mb: 2.5,
              color: "#555555",
            }}
          >
            Enter the security code we have sent
          </Typography>

          {otpTimeOut === false && (
            <React.Fragment>
              <Grid
                id="mainGrid"
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
                // sx={{ mb: 0.75 }}
              >
                <Grid item xs={12}>
                  <OtpInput
                    // className="custom-otp-input"
                    value={myOTP.otp}
                    onChange={handleChange}
                    numInputs={4}
                    isInputNum={true}
                    // shouldAutoFocus={true}
                    isInputSecure={true}
                    renderSeparator={<span> &nbsp;&nbsp;</span>}
                    inputStyle={
                      errors?.length > 0 ? newErrorInputStyle : newInputStyle
                    }
                    // focusStyle={newFocusStyle}
                    focusStyle={{
                      outline: "none",
                      border: "2px solid red",
                      borderRadius: "8px",
                    }}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className={
                          errors?.length > 0
                            ? "error-custom-otp-input"
                            : "custom-otp-input"
                        }
                      />
                    )}
                    // containerStyle={{ justifyContent: "space-between" }}
                  />
                  {errors?.length > 0 && (
                    <Typography
                      variant="medium"
                      color="error.main"
                      sx={{
                        mt: 0.75,
                        fontWeight: 500,
                        textAlign: "left",
                        display: "block",
                      }}
                    >
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ position: "relative", top: 3 }}
                      >
                        <path
                          d="M8.28581 14.6667C11.9525 14.6667 14.9525 11.6667 14.9525 8.00004C14.9525 4.33337 11.9525 1.33337 8.28581 1.33337C4.61914 1.33337 1.61914 4.33337 1.61914 8.00004C1.61914 11.6667 4.61914 14.6667 8.28581 14.6667Z"
                          stroke="#F23836"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.28906 10.6666L8.28906 7.33329"
                          stroke="#F23836"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.29199 5.33337L8.286 5.33337"
                          stroke="#F23836"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      &nbsp; Please enter valid OTP
                    </Typography>
                  )}
                  {/* <Typography
                    variant="medium"
                    color="text.main"
                    sx={{ mt: 0.75, fontWeight: 500, textAlign: "left" }}
                  >
              
                    <Countdown
                      date={targetTimeRef.current}
                      renderer={renderer}
                    />
                  </Typography>
                  <Typography
                    variant="medium"
                    color="text.light"
                    sx={{
                      mt: 0.75,
                      mt: 2.5,
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    Didn’t receive a code?
                    <Button
                      sx={{
                        color: "#222222",
                        borderBottom: !loading2 && "1px solid #222222",
                        borderRadius: "0px",
                        p: 0,
                      }}
                      disabled={loading2}
                      onClick={resendOtp}
                    >
                      RESEND
                    </Button>
                  </Typography> */}
                </Grid>
              </Grid>
            </React.Fragment>
          )}

          {/* <Button
            variant="contained"
            disableElevation
            fullWidth
            sx={{ minHeight: "56px", mb: 4, mt: 2.5 }}
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
          </Button> */}
        </form>
      </Grid>
    </React.Fragment>
  );
};

export default SignUpNumberOTPVarify;