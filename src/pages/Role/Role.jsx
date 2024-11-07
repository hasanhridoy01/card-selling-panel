import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import "./Role.css";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Card, Divider } from "@mui/material";

const Role = () => {
  return (
    <div>
      <div className="dashboard-header">
        <div className="talkTime">
          <h2>Talktime</h2>
          <p>
            DASHBORD / Products / <span>Talktime</span>
          </p>
        </div>
        <div className="">
          <select name="" id="" className="OptionSelect">
            <option value="ASC">Ascending</option>
            <option value="DSC">Descending</option>
          </select>
        </div>
      </div>

      <div className="dashboard-content">
        <Box
          sx={{
            flexGrow: 1,
            padding: "12px",
            boxShadow: "0px 2px 3px 0px #0000001a",
          }}
        >
          <Grid container spacing={2}>
            <Grid size={6}>
              <h4>Role Name: Admin</h4>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Select All" />
              </FormGroup>
            </Grid>
            <Grid size={6}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Super Admin" />
                <FormControlLabel control={<Checkbox />} label="Admin" />
                <FormControlLabel control={<Checkbox />} label="User" />
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Role;
