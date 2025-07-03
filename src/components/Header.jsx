import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ onLogout }) => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        width: "100vw", 
        boxShadow: "none",
        borderBottom: "1px solid #444",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "text.primary" }}>
          Back-office – Gestion des concerts de Youssoupha 
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          sx={{
            borderColor: "text.secondary",
            color: "text.secondary",
            "&:hover": {
              borderColor: "primary.main",
              color: "primary.main",
            },
          }}
        >
          Se déconnecter
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
