import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (!loading) {
      setInitializing(false);
    }
  }, [loading]);

  if (initializing) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

// Assign PropTypes to this component
PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
