import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Header from "../components/Header";

// Pays prioritaires
const preferredCountries = [
  "France",
  "Belgique",
  "Suisse",
  "République Démocratique du Congo", 
  "Luxembourg",
];

// Liste complète des pays (triés)
const countries = [
  "Afghanistan", "Afrique du Sud", "Albanie", "Algérie", "Allemagne", "Andorre", "Angola", "Antigua-et-Barbuda", "Arabie saoudite", "Argentine", "Arménie", "Australie", "Autriche", "Azerbaïdjan",
  "Bahamas", "Bahreïn", "Bangladesh", "Barbade", "Belgique", "Belize", "Bénin", "Bhoutan", "Biélorussie", "Birmanie", "Bolivie", "Bosnie-Herzégovine", "Botswana", "Brésil", "Brunei", "Bulgarie", "Burkina Faso", "Burundi",
  "Cambodge", "Cameroun", "Canada", "Cap-Vert", "Chili", "Chine", "Chypre", "Colombie", "Comores", "Congo-Brazzaville", "Congo-Kinshasa", "Corée du Nord", "Corée du Sud", "Costa Rica", "Côte d’Ivoire", "Croatie", "Cuba",
  "Danemark", "Djibouti", "Dominique", "Égypte", "Émirats arabes unis", "Équateur", "Érythrée", "Espagne", "Estonie", "Eswatini", "États-Unis", "Éthiopie", "Fidji", "Finlande", "France",
  "Gabon", "Gambie", "Géorgie", "Ghana", "Grèce", "Grenade", "Guatemala", "Guinée", "Guinée-Bissau", "Guinée équatoriale", "Guyana",
  "Haïti", "Honduras", "Hongrie", "Inde", "Indonésie", "Irak", "Iran", "Irlande", "Islande", "Israël", "Italie",
  "Jamaïque", "Japon", "Jordanie", "Kazakhstan", "Kenya", "Kirghizistan", "Kiribati", "Koweït",
  "Laos", "Lesotho", "Lettonie", "Liban", "Libéria", "Libye", "Liechtenstein", "Lituanie", "Luxembourg",
  "Macédoine du Nord", "Madagascar", "Malaisie", "Malawi", "Maldives", "Mali", "Malte", "Maroc", "Marshall", "Maurice", "Mauritanie", "Mexique", "Micronésie", "Moldavie", "Monaco", "Mongolie", "Monténégro", "Mozambique",
  "Namibie", "Nauru", "Népal", "Nicaragua", "Niger", "Nigeria", "Norvège", "Nouvelle-Zélande",
  "Oman", "Ouganda", "Ouzbékistan",
  "Pakistan", "Palaos", "Palestine", "Panama", "Papouasie-Nouvelle-Guinée", "Paraguay", "Pays-Bas", "Pérou", "Philippines", "Pologne", "Portugal",
  "Qatar", "République centrafricaine", "République démocratique du Congo", "République dominicaine", "République tchèque", "Roumanie", "Royaume-Uni", "Russie", "Rwanda",
  "Saint-Kitts-et-Nevis", "Saint-Marin", "Saint-Vincent-et-les-Grenadines", "Sainte-Lucie", "Salvador", "Samoa", "São Tomé-et-Principe", "Sénégal", "Serbie", "Seychelles", "Sierra Leone", "Singapour", "Slovaquie", "Slovénie", "Somalie", "Soudan", "Soudan du Sud", "Sri Lanka", "Suède", "Suisse", "Suriname", "Syrie",
  "Tadjikistan", "Tanzanie", "Tchad", "Thaïlande", "Timor oriental", "Togo", "Tonga", "Trinité-et-Tobago", "Tunisie", "Turkménistan", "Turquie", "Tuvalu",
  "Ukraine", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican", "Venezuela", "Vietnam",
  "Yémen", "Zambie", "Zimbabwe"
];

const AddDate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    date: "",
    ville: "",
    pays: "",
    lieu: "",
    isSoldOut: false,
  });

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
      alert("Tu ne peux pas ajouter une date passée.");
      return;
    }

    try {
      await addDoc(collection(db, "dates"), {
        ...formData,
        createdAt: Timestamp.now(),
      });
      alert("Concert ajouté !");
      navigate("/admin");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <>
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: 500 }}>
          <Typography variant="h6" gutterBottom align="center">
            ➕ Ajouter un concert
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
                value={formData.pays}
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
            />
            <Button type="submit" variant="contained" fullWidth>
              Ajouter
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default AddDate;
