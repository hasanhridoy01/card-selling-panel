import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import AddUser from "./AddUser";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { handleGetData } from "../../services/GetDataService";
import { Link } from "react-router-dom";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// import DeleteIcon from "@mui/icons-material/Delete";
import Approved from "./Approved";

const mockData = Array.from({ length: 20 }).map((_, index) => ({
  providerName: "Fastlink",
  package: "30 Mins",
  price: "5000 IQD",
  id: index + 1,
}));

const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingRole, setLoadingRole] = useState(false);
  const { card_selling_admin_panel } = useContext(AuthContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //get Roles
  const getRoles = async () => {
    setLoadingRole(true);
    const url = `/api/v1/private/roles`;
    const res = await handleGetData(url, card_selling_admin_panel.access_token);

    if (res?.status >= 200 && res?.status < 300) {
      setRoles(res?.data?.data?.roles);
      console.log(roles);
    } else {
      console.error(
        "Failed to fetch roles:",
        res?.data?.message || "Unknown error"
      );
      setLoadingRole(false);
    }
  };

  //get Users
  const getUsers = async (roleId) => {
    setLoading(true);
    const url = `/api/v1/private/get-system-users-by-checker?checkerId=${roleId}`;
    const res = await handleGetData(url, card_selling_admin_panel.access_token);

    if (res?.status >= 200 && res?.status < 300) {
      const fetchedUsers = res?.data?.data?.users || [];
      console.log("Fetched users:", fetchedUsers);

      // setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
      // setUsers(fetchedUsers);
      setLoading(false);
      return fetchedUsers;
    } else {
      console.error(
        "Failed to fetch roles:",
        res?.data?.message || "Unknown error"
      );
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  // Loop over roles after fetching and pass role IDs to getUsers
  // useEffect(() => {
  //   if (roles.length > 0) {
  //     setUsers([]);
  //     roles.forEach((role) => {
  //       getUsers(role.id);
  //     });
  //   }
  // }, [roles]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (roles.length > 0) {
        setUsers([]); 
        const usersArray = await Promise.all(
          roles.map((role) => getUsers(role.id))
        );
        const combinedUsers = usersArray.flat();
        setUsers(combinedUsers); 
      }
    };

    fetchAllUsers();
  }, [roles]);

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
        <AddUser getUsers={getUsers} />
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
              {!loading &&
                users?.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.mobileNumber}</TableCell>
                    <TableCell>{user.emailAddress}</TableCell>
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
                      {/* <Button
                        component={Link}
                        // onClick={() => handleNavigate(user?.id)}
                        variant="outlined"
                        color="success"
                      >
                        Approved
                      </Button> */}

                      <Approved UserId={user.id} getUsers={getUsers} />

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
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={mockData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Users;
