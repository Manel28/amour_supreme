import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "../firebase-config";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Paper,
  Fade,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const isPasswordStrong = (pwd) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(pwd);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
  const allowedEmails = ["smailmanel28@gmail.com"]; 

  if (!allowedEmails.includes(email)) {
    alert("Cet email n’est pas autorisé à se connecter.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Connexion réussie !");
    navigate("/admin");
  } catch (err) {
    console.error("Firebase error:", err.code);

    switch (err.code) {
      case "auth/invalid-email":
        alert("Adresse e-mail invalide.");
        break;
      case "auth/user-disabled":
        alert("Ce compte a été désactivé.");
        break;
      case "auth/user-not-found":
        alert("Aucun compte trouvé avec cet e-mail.");
        break;
      case "auth/wrong-password":
        alert("Mot de passe incorrect.");
        break;
      default:
        alert("Erreur inconnue : " + err.message);
        break;
    }
  }
};


  const handleMagicLink = async () => {
    const allowedEmails = ["smailmanel28@gmail.com"];

    if (!allowedEmails.includes(email)) {
      alert("Cet email n’est pas autorisé à se connecter.");
      return;
    }

    try {
      await sendSignInLinkToEmail(auth, email, {
        url: "http://localhost:5173/login",
        handleCodeInApp: true,
      });
      window.localStorage.setItem("emailForSignIn", email);
      alert("Lien magique envoyé !");
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  useEffect(() => {
    setShowForm(true);

    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Entre ton email pour confirmer");
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          alert("Connecté par lien magique !");
          navigate("/admin");
        })
        .catch((error) => {
          console.error("Erreur :", error.message);
        });
    }
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#130f0f", width: "100vw" }}
    >
      <Fade in={showForm} timeout={800}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            maxWidth: 400,
            width: "100%",
            backgroundColor: "#2c2626",
            borderRadius: 4,
            color: "#e4c88b",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", color: "#e4c88b", fontFamily: "Georgia, serif" }}
          >
            Connexion Admin
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#e4c88b" } }}
            InputProps={{
              style: { color: "#e4c88b" },
            }}
          />

          <TextField
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#e4c88b" } }}
            InputProps={{
              style: { color: "#e4c88b" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: "#e4c88b" }}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#b11818",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#8e1414",
              },
            }}
            onClick={handleLogin}
          >
            Connexion avec mot de passe
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 2,
              borderColor: "#e4c88b",
              color: "#e4c88b",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#3a2e2e",
              },
            }}
            onClick={handleMagicLink}
          >
            Connexion avec lien magique
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
};

export default Login;
