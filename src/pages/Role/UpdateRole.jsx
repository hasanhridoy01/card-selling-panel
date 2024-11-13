import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Breadcrumbs, Button, Link, Paper, TextField } from "@mui/material";
import { handleGetData } from "../../services/GetDataService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useHandleSnackbar from "../../services/HandleSnakbar";
import { handlePostData } from "../../services/PostDataService";
import { handlePutData } from "../../services/PutDataService";
import { AuthContext } from "../../context/AuthContext";

const UpdateRole = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleId = queryParams.get("role_id");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [roleName, setRoleName] = useState("");
  const { card_selling_admin_panel } = useContext(AuthContext);
  const handleSnackbarOpen = useHandleSnackbar();
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [permissionIds, setPermissionIds] = useState([]);
  const [groups, setGroups] = useState([]);
  const [roleData, setRoleData] = useState({});
  //get params Id....................!

  console.log("param id", roleId);

  const getRolePermissions = async () => {
    setLoading(true);

    let url = `/api/v1/private/role?id=${roleId}`;
    // let token = await RefreshToken(dizli_admin_panel, logout, login);
    // let token = dizli_admin_panel.access_token;
    let res = await handleGetData(url, card_selling_admin_panel.access_token);
    console.log(
      "res?.data?.data?.data ===========================",
      res?.data?.data?.role?.permissions
    );
    if (res?.status >= 200 && res?.status < 300) {
      setRoleData(res?.data);
      setRoleName(res?.data?.data?.role?.roleName);

      setPermissionIds(
        res?.data?.data?.role?.permissions?.map((item) => item?.name)
      );
      // Update state with new data

      // let newArray = res?.data?.data?.data?.map((item)=>item.isAssignable && item)
      // setPermissions(newArray);

      // Optionally handle list updates if needed
      //   if (res.data.data.length > 0) {
      //     // setList(res.data.data);
      //   } else {
      //     // setList([]);
      //   }
    } else {
      // setMessage(res.data.message);
    }
    setLoading(false);
  };
  const getPermissions = async () => {
    setLoading(true);

    let url = `/api/v1/private/get-all-app-permissions`;
    // let token = await RefreshToken(dizli_admin_panel, logout, login);
    // let token = dizli_admin_panel.access_token;
    let res = await handleGetData(url, card_selling_admin_panel.access_token);
    console.log("res?.data?.data?.data", res?.data?.data?.data);
    if (res?.status >= 200 && res?.status < 300) {
      // Update state with new data

      let newArray = res?.data?.data?.data?.map(
        (item) => item.isAssignable && item
      );
      setPermissions(newArray);

      let groupUrl = `/api/v1/private/get-all-app-groups`;
      let response = await handleGetData(
        groupUrl,
        card_selling_admin_panel.access_token
      );

      console.log("response?.data?.data?.data", response?.data?.data?.data);

      if (response?.status >= 200 && response?.status < 300) {
        setGroups(response?.data?.data?.data);
      }
      // Optionally handle list updates if needed
      //   if (res.data.data.length > 0) {
      //     // setList(res.data.data);
      //   } else {
      //     // setList([]);
      //   }
    } else {
      // setMessage(res.data.message);
    }
    setLoading(false);
  };

  const handleSelectAllPermission = (e, id) => {
    console.log("id", id);

    console.log("e================", e.target.checked);

    const newPeremissionArray = permissions?.filter((el) => el?.groupId === id);
    let newPeremissionIds = newPeremissionArray.map(
      (item) => item?.permissionName
    );
    if (e.target.checked) {
      console.log("newPeremissionArray----------------", newPeremissionArray);
      console.log("newPeremissionIds----------------", newPeremissionIds);
      console.log("permissionIds----------------", permissionIds);
      const mergedArray = [
        ...new Set([...permissionIds, ...newPeremissionIds]),
      ];

      setPermissionIds(mergedArray);
    } else {
      const resultArray = permissionIds.filter(
        (element) => !newPeremissionIds.includes(element)
      );
      setPermissionIds(resultArray);
    }
  };
  const handlePermission = (id) => {
    if (permissionIds?.includes(id)) {
      setPermissionIds(permissionIds.filter((res) => res !== id));
    } else {
      setPermissionIds([...permissionIds, id]);
    }
  };
  const check = () => {
    console.log("permissionIds", permissionIds);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!roleName.trim()) {
      handleSnackbarOpen("Please enter role name", "error", 3000);
      return;
    }
    if (permissionIds.length < 1) {
      handleSnackbarOpen("Please select permission", "error", 3000);
      return;
    }
    setLoading2(true);
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
      attribute: {
        roleName: roleName,
        permissions: [],
      },
    };

    let newPermissonList = permissionIds?.map((item) => ({
      name: item,
      createdBy: 1,
    }));

    data.attribute.permissions = newPermissonList;
    let url = `/api/v1/private/role?id=${roleId}`;
    let response = await handlePutData(
      url,
      data,
      card_selling_admin_panel.access_token
    );
    // if (response?.status === 401) {

    //   navigate("/");
    //   return;
    // }
    if (response?.status > 199 && response?.status < 300) {
      handleSnackbarOpen("Successful", "success", 1000);
      navigate("/role");
    } else {
      handleSnackbarOpen(
        response?.data?.error?.reason.toString(),
        "error",
        3000
      );
    }
    setLoading2(false);
  };

  useEffect(() => {
    getRolePermissions();
    getPermissions();
  }, []);
  return (
    <Box>
      <Box
        sx={{
          padding: "10px",
          borderRadius: "6px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 2px 3px 0px #0000001A",
        }}
        onClick={check}
      >
        <TextField
          label="Role Name"
          variant="outlined"
          size="small"
          sx={{
            width: "300px",
            mr: 1,
          }}
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
        <Button
          disableElevation
          variant="contained"
          sx={{
            minHeight: "40px",
          }}
          onClick={onSubmit}
        >
          Update Role
        </Button>
      </Box>

      <Paper sx={{ mt: 2.75, p: 2, boxShadow: "0px 2px 3px 0px #0000001A" }}>
        {!loading &&
          groups?.length > 0 &&
          groups
            ?.sort((a, b) => a.orderId - b.orderId)
            ?.map((item, index) => (
              <Box key={index} sx={{ paddingTop: "9px" }}>
                <Typography sx={{ fontSize: "17px", fontWeight: 500 }}>
                  {item.groupName}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      onChange={(e) => handleSelectAllPermission(e, item?.id)}
                      checked={permissions
                        .filter((res) => res.groupId === item?.id)
                        .map((el) => el.permissionName)
                        .every((element) => permissionIds.includes(element))}
                    />
                  }
                  label="Select All"
                />
                {permissions
                  ?.filter((res) => res.groupId === item.id)
                  ?.sort((a, b) => a.orderId - b.orderId)
                  ?.map((per, i) => (
                    <Box key={i} sx={{ ml: 4 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            checked={permissionIds?.includes(
                              per?.permissionName
                            )}
                          />
                        }
                        label={per?.displayName}
                        onChange={() => handlePermission(per?.permissionName)}
                      />
                    </Box>
                  ))}
                {groups?.length - 1 > index && <Divider sx={{ py: 1 }} />}
              </Box>
            ))}
      </Paper>
    </Box>
  );
};

export default UpdateRole;
