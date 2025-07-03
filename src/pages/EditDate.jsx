import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import {
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

// Pays prioritaires
const preferredCountries = [
  "France",
  "Belgique",
  "Suisse",
  "République Démocratique du Congo",
  "Luxembourg",
];

// Liste complète des pays
const countries = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Arabie saoudite", "Argentine", "Arménie", "Australie", "Autriche", "Azerbaïdjan",
  "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Bénin", "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi",
  "Cambodge", "Cameroun", "Canada", "Cap-Vert", "Chili", "Chine", "Chypre", "Colombie", "Comores", "Congo-Brazzaville", "République Démocratique du Congo", "Corée du Nord", "Corée du Sud", "Costa Rica", "Côte d’Ivoire", "Croatie", "Cuba",
  "Danemark", "Djibouti", "Dominique", "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", "Espagne", "Estonie", "Eswatini", "États-Unis", "Éthiopie", "Fidji", "Finlande", "France",
  "Gabon", "Gambie", "Géorgie", "Ghana", "Grèce", "Guatemala", "Guinée", "Guinée-Bissau", "Guinée équatoriale", "Guyana",
  "Haïti", "Honduras", "Hongrie", "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël", "Italie",
  "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan", "Koweït",
  "Laos", "Lesotho", "Lettonie", "Liban", "Libéria", "Libye", "Liechtenstein", "Lituanie", "Luxembourg",
  "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Maurice", "Mauritanie", "Mexique", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Mozambique",
  "Namibie", "Népal", "Nicaragua", "Niger", "Nigeria", "Norvège", "Nouvelle-Zélande",
  "Oman", "Ouganda", "Ouzbékistan",
  "Pakistan", "Palestine", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pologne", "Portugal",
  "Qatar", "République centrafricaine", "République dominicaine", "République tchèque", "Roumanie", "Royaume-Uni", "Russie", "Rwanda",
  "Saint-Marin", "Saint-Vincent-et-les-Grenadines", "Sainte-Lucie", "Salvador", "Samoa", "São Tomé-et-Principe", "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie",
  "Tadjikistan", "Tanzanie", "Tchad", "Thaïlande", "Timor oriental", "Togo", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie",
  "Ukraine", "Uruguay", "Vanuatu", "Vatican", "Venezuela", "Vietnam",
  "Yémen", "Zambie", "Zimbabwe"
];

const EditDate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [formData, setFormData] = useState({
    nom: "",
    date: "",
    ville: "",
    pays: "",
    lieu: "",
    isSoldOut: false,
  });

  const allCountries = [...new Set([...preferredCountries, ...countries])];

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "dates", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        alert("Aucune date trouvée.");
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    setFormData((prev) => ({ ...prev, isSoldOut: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const concertDate = new Date(formData.date);
    if (concertDate < today.setHours(0, 0, 0, 0)) {
      alert("Tu ne peux pas enregistrer une date passée.");
      return;
    }

    const docRef = doc(db, "dates", id);
    await updateDoc(docRef, {
      ...formData,
      updatedAt: Timestamp.now(),
    });
    alert("Date mise à jour !");
    navigate("/admin");
  };

  const handleLogout = () => {
    if (window.confirm("Tu veux te déconnecter ?")) {
      logout();
    }
  };

  return (
    <>
      <Header onLogout={handleLogout} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 64px)"
        px={2}
        bgcolor="background.default"
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            width: "100%",
            maxWidth: 650,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6" gutterBottom align="center" sx={{ mb: 3 }}>
            ✏️ Modifier le concert
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom de l’événement"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Ville"
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="pays-label">Pays</InputLabel>
              <Select
                labelId="pays-label"
                name="pays"
                value={allCountries.includes(formData.pays) ? formData.pays : ""}
                label="Pays"
                onChange={handleChange}
              >
                {preferredCountries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
                <MenuItem disabled>──────────────</MenuItem>
                {countries
                  .filter((c) => !preferredCountries.includes(c))
                  .sort()
                  .map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Lieu"
              name="lieu"
              value={formData.lieu}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isSoldOut}
                  onChange={handleCheckbox}
                />
              }
              label="Concert sold-out ?"
              sx={{ mt: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Mettre à jour
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default EditDate;
