import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Breadcrumbs, Link, Paper } from "@mui/material";
import { handleGetData } from "../../services/GetDataService";
import { useLocation, useParams } from "react-router-dom";

const permissions2 = [
  {
    category: "Projects",
    options: ["Admin"],
  },
  {
    category: "CRM",
    options: ["Admin", "Export Contacts"],
  },
  {
    category: "HRMS",
    options: ["Admin", "Employee Directory", "Noticeboard"],
  },
];

const Permission = () => {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [permissionIds, setPermissionIds] = useState([]);
  const [groups, setGroups] = useState([]);
  //get params Id....................!
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleId = queryParams.get("role_id");
  console.log("param id", roleId);

  const getPermissions = async () => {
    setLoading(true);

    let url = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/v1/public/get-all-app-permissions`;
    // let token = await RefreshToken(dizli_admin_panel, logout, login);
    // let token = dizli_admin_panel.access_token;
    let res = await handleGetData(url);
    console.log("res?.data?.data?.data", res?.data?.data?.data);
    if (res?.status >= 200 && res?.status < 300) {
      // Update state with new data
      setPermissions(res?.data?.data?.data);

      let groupUrl = `${
        import.meta.env.VITE_API_BASE_URL
      }/api/v1/public/get-all-app-groups`;
      let response = await handleGetData(groupUrl);

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
    let newPeremissionIds = newPeremissionArray.map((item) => item?.id);
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

  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <Box>
      <Box
        sx={{
          height: "62px",
          padding: "10px",
          gap: "3px",
          borderRadius: "6px",
          opacity: 1,
          backgroundColor: "#ffffff",
          boxShadow: "0px 2px 3px 0px #0000001A",
          display: "flex",
          alignItems: "start",
          justifyContent: "left",
          flexDirection: "column",
        }}
        onClick={check}
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
          Permission
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

      {/* {formData.form.fields
                      .filter((field) => field.groupId === group.id)
                      .sort((a, b) => a.position - b.position)
                      .map((field) => renderField(field))} */}

      <Paper sx={{ mt: 2.75, p: 2, boxShadow: "0px 2px 3px 0px #0000001A" }}>
        {!loading &&
          groups?.length > 0 &&
          groups?.map((item, index) => (
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
                      .map((el) => el.id)
                      .every((element) => permissionIds.includes(element))}
                  />
                }
                label="Select All"
              />
              {permissions
                ?.filter((res) => res.groupId === item.id)
                ?.sort((a, b) => a.orderId - b.orderId)
                ?.map((per, i) => (
                  <>
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                          size="small"
                          checked={permissionIds?.includes(per?.id)}
                        />
                      }
                      label={per?.displayName}
                      onChange={() => handlePermission(per?.id)}
                    />
                  </>
                ))}
              {groups?.length - 1 > index && <Divider sx={{ py: 1 }} />}
            </Box>
            //   <Box key={index} className="permission-category">
            //     <Box className="category-header">
            //       <Typography sx={{ fontSize: "17px", fontWeight: 500 }}>
            //         {permission.category}
            //       </Typography>
            //     </Box>
            //     <Box className="category-options">
            //       {permission.options.map((option, idx) => (
            //         <Box key={idx} className="option-item">
            //           <FormControlLabel control={<Checkbox />} label={option} />
            //         </Box>
            //       ))}
            //     </Box>
            //     <Divider />
            //   </Box>
          ))}
      </Paper>
    </Box>
  );
};

export default Permission;
