import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Chip,
  Tooltip,
  Divider
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const Admin = () => {
  const [dates, setDates] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchDates = async () => {
    const q = query(collection(db, "dates"), orderBy("date", "asc"));
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDates(list);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tu veux supprimer ce concert ?")) {
      await deleteDoc(doc(db, "dates", id));
      fetchDates();
    }
  };

  const handleLogout = () => {
    if (window.confirm("Tu es sûr·e de vouloir te déconnecter ?")) {
      logout();
    }
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const totalConcerts = dates.length;
  const totalSoldOut = dates.filter((d) => d.isSoldOut).length;

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#0f0f0f" }}>
      <Box sx={{ width: '100%', backgroundColor: "#1f1f1f" }}>
        <Header onLogout={handleLogout} />
      </Box>

      <Box sx={{ px: 6, py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Typography variant="h4" fontWeight={700} color="white">
            Gestion des concerts ({totalConcerts})
            <Typography component="span" variant="h6" color="#c9a227" sx={{ ml: 2 }}>
              | Sold-out : {totalSoldOut}
            </Typography>
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/add")}
            sx={{ backgroundColor: "#a4161a", ":hover": { backgroundColor: "#801517" } }}
          >
            Ajouter un concert
          </Button>
        </Box>

        {/* ✅ Cards en colonne verticale */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {dates.map((date) => (
            <Card
              key={date.id}
              sx={{
                backgroundColor: "#1b1b1b",
                borderRadius: 2,
                px: 2,
                py: 2,
                maxWidth: 700,
                width: "100%",
                mx: "auto",
                boxShadow: "0 0 0 1px #333",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight={600} color="white">
                    {date.nom}
                  </Typography>
                  <Chip
                    label={date.isSoldOut ? "Sold-out" : "Disponible"}
                    size="small"
                    sx={{
                      backgroundColor: date.isSoldOut ? "#b91c1c" : "#15803d",
                      color: "#fff",
                      fontWeight: 500,
                    }}
                  />
                </Box>
                <Divider sx={{ my: 2, backgroundColor: "#333" }} />
                <Typography variant="body1" color="#e0e0e0" gutterBottom>
                  <strong>Lieu :</strong> {date.lieu} — {date.ville}, {date.pays}
                </Typography>
                <Typography variant="body1" color="#e0e0e0">
                  <strong>Date :</strong> {date.date}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end", mt: 1 }}>
                <Tooltip title="Modifier">
                  <IconButton
                    sx={{ color: "#888" }}
                    onClick={() => navigate(`/edit/${date.id}`)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer">
                  <IconButton
                    sx={{ color: "#888" }}
                    onClick={() => handleDelete(date.id)}
                  >
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
