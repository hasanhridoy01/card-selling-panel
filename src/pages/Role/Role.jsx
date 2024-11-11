import Box from "@mui/material/Box";
import {
  Breadcrumbs,
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useEffect, useState } from "react";
import { handleGetData } from "../../services/GetDataService";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import useHandleSnackbar from "../../services/HandleSnakbar";

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const naviagte = useNavigate();

  const handleSnackbarOpen = useHandleSnackbar();

  const getData = async () => {
    setLoading(true);
    const url = `/api/v1/public/roles`;
    const res = await handleGetData(url);

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

  //Role Delete
  const handleRoleDelete = async (id) => {
    setLoadingDelete(true);
    try {
      const response = await axios(`/api/v1/public/role?id=${id}`, {
        method: "DELETE",
      });

      if (response?.status >= 200 && response?.status < 300) {
        handleSnackbarOpen(`Role Deleted SuccessFul!`, "success", 1000);
        getData();
      } else {
        handleSnackbarOpen(`${response.message}`, "error", 3000);
        setLoadingDelete(false);
      }
    } catch (error) {
      handleSnackbarOpen(`Error deleting role: ${error}`, "error", 3000);
      setLoadingDelete(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          padding: "10px",
          gap: "3px",
          borderRadius: "6px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 2px 3px 0px #0000001A",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Manrope", serif',
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "20px",
            textAlign: "left",
          }}
        >
          Role
        </Typography>
        {/* <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            MUI
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Core
          </Link>
          <Typography sx={{ color: "text.primary" }}>Breadcrumbs</Typography>
        </Breadcrumbs> */}
        <Link to="/add-role">
          <Button
            sx={{
              minWidth: "150px",
              backgroundColor: "#FC2861",
              color: "#ffffff",
              fontFamily: '"Manrope", serif',
            }}
          >
            Add Role
          </Button>
        </Link>
      </Box>

      <Paper
        sx={{
          width: "100%",
          mt: 2.75,
          boxShadow: "0px 2px 3px 0px #0000001A",
        }}
      >
        <TableContainer sx={{ maxHeight: "calc(100vh - 168px)" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>RoleName</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading &&
                roles.map((role) => (
                  <TableRow key={role.id} hover>
                    <TableCell>{role.roleName}</TableCell>
                    <TableCell align="right">
                      <Button
                        component={Link}
                        to={`/update-role?role_id=${role?.id}`}
                        // onClick={() => handleNavigate(role?.id)}
                        style={{
                          border: "1px solid #FC2861",
                          margin: "auto",
                          padding: "4px",
                        }}
                      >
                        <BorderColorIcon sx={{ fontSize: "18px" }} />
                      </Button>
                      <Button
                        onClick={() => handleRoleDelete(role?.id)}
                        style={{
                          border: "1px solid #FC2861",
                          padding: "4px",
                          marginLeft: "7px",
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: "18px" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Role;
