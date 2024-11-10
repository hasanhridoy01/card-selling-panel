import {
  Box,
  Breadcrumbs,
  Link,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import CustomTable from "./CustomTable";

const Dashboard = () => {
  return (
    <div>
      <Box
        sx={{
          height: "62px",
          padding: "10px",
          gap: "10px",
          borderRadius: "6px",
          opacity: 1,
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
            color: '#fc2861'
          }}
        >
          Dashboard
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
        <Select
          defaultValue="ASC"
          sx={{
            width: "115px",
            height: "32px",
            opacity: 1,
            borderRadius: "5px",
            border: "1px solid #e5e5e5",
            padding: "7px 16px",
            backgroundColor: "#f8f8f8",
            color: "#333",
          }}
        >
          <MenuItem value="ASC">Ascending</MenuItem>
          <MenuItem value="DSC">Descending</MenuItem>
        </Select>
      </Box>

      <Paper sx={{ mt: 2.75, boxShadow: "0px 2px 3px 0px #0000001A" }}>
        <CustomTable />
      </Paper>
    </div>
  );
};

export default Dashboard;
