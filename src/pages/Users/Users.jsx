import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddUser from "./AddUser";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import useHandleSnackbar from "../../services/HandleSnakbar";
import { handleGetData } from "../../services/GetDataService";
import { Link } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { card_selling_admin_panel } = useContext(AuthContext);
  // const handleSnackbarOpen = useHandleSnackbar();

  //get Users
  const getUsers = async () => {
    setLoading(true);
    const url = `/api/v1/private/get-system-users-by-checker?checkerId=672b62701d1f33e7aa2a7e49`;
    const res = await handleGetData(url, card_selling_admin_panel.access_token);

    if (res?.status >= 200 && res?.status < 300) {
      setUsers(res?.data?.data?.users);
    } else {
      console.error(
        "Failed to fetch roles:",
        res?.data?.message || "Unknown error"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
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
          User
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
        <AddUser />
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
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role ID</TableCell>
                <TableCell>Checker ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading &&
                users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.roleId}</TableCell>
                    <TableCell>{user.checkerId}</TableCell>
                    <TableCell>
                      {user.status ? (
                        <span style={{ color: "green" }}>Active</span>
                      ) : (
                        <span style={{ color: "#fc2861" }}>Inactive</span>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        component={Link}
                        // onClick={() => handleNavigate(user?.id)}
                        variant="outlined"
                        color="success"
                      >
                        Approved
                      </Button>
                      {/* <Button
                        // onClick={() => handleRoleDelete(role?.id)}
                        style={{
                          border: "1px solid #FC2861",
                          padding: "4px",
                          marginLeft: "7px",
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: "18px" }} />
                      </Button> */}
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

export default Users;
