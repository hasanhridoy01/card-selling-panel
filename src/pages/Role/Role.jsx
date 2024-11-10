import Box from "@mui/material/Box";
import "./Role.css";
import {
  Breadcrumbs,
  Button,
  Link,
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
import { useNavigate } from "react-router-dom";

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate()

  const getData = async () => {
    setLoading(true);
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/public/roles`;
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

  const handleNavigate = (id) => {
    console.log(id);
    naviagte(`/permision?role_id=${id}`)
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Box
        sx={{
          height: "62px",
          padding: "10px",
          gap: "3px",
          borderRadius: "6px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 2px 3px 0px #0000001A",
          display: "flex",
          alignItems: "start",
          justifyContent: "left",
          flexDirection: "column",
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
        <Breadcrumbs aria-label="breadcrumb">
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
        </Breadcrumbs>
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
                        onClick={() => handleNavigate(role.id)}
                        style={{
                          padding: "8px 4px",
                          border: "1px solid #FC2861",
                        }}
                      >
                        <BorderColorIcon sx={{ fontSize: "18px" }} />
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
