import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { drugByNdc } from "../utils/API/openFdaApi";
import {
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import { Drug } from "../utils/ts/interfaces";

export const DrugDetails = () => {
  const { id } = useParams();
  const [drug, setDrug] = useState<Drug>({} as Drug);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const handleGet = async () => {
      if (id) {
        const drugData = await drugByNdc(id);
        setDrug(drugData);
        setLoading(false);
      }
    };

    handleGet();
  }, [id]);

  const renderLoading = () => (
    <Container
      maxWidth="md"
      style={{ marginTop: "2rem", marginBottom: "2rem", textAlign: "center" }}
    >
      <CircularProgress />
    </Container>
  );

  const renderDrugDetails = () => {
    const {
      generic_name,
      brand_name,
      active_ingredients,
      packaging,
      marketing_start_date,
      listing_expiration_date,
      pharm_class,
    } = drug;
    console.log(drug);

    return (
      <Container
        maxWidth="md"
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/`)}
        >
          Go back
        </Button>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4" color="primary" gutterBottom>
              {brand_name}
            </Typography>
            <Typography variant="h5" color="textSecondary" gutterBottom>
              {generic_name}
            </Typography>

            <Box mt={2}>
              <Typography variant="h6" color="secondary" gutterBottom>
                Active Ingredients:
              </Typography>
              <List>
                {active_ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${ingredient.name} - ${ingredient.strength}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box mt={2}>
              <Typography variant="h6" color="secondary" gutterBottom>
                Packaging:
              </Typography>
              <List>
                {packaging.map((pack, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={pack.description} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box mt={2}>
              <Typography variant="h6" color="secondary" gutterBottom>
                Pharmacological Classifications:
              </Typography>
              <List>
                {pharm_class.map((pharm, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={pharm} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider style={{ margin: "1rem 0" }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Marketing Start Date:</strong>{" "}
                  {new Date(marketing_start_date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Listing Expiration Date:</strong>{" "}
                  {new Date(listing_expiration_date).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
  };

  return loading ? renderLoading() : renderDrugDetails();
};
