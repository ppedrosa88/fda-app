import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { Drug, Packaging } from "../utils/ts/interfaces";

export const RenderDrugDetails = ({
  drug,
  handleGoBack,
}: {
  drug: Drug;
  handleGoBack: () => void;
}): JSX.Element => {
  // Destructure drug object to extract necessary properties
  const {
    generic_name,
    brand_name,
    active_ingredients,
    packaging,
    marketing_start_date,
    listing_expiration_date,
    pharm_class,
    openfda,
    dosage_form,
    marketing_category,
    product_type,
    route,
    application_number,
    product_ndc,
    finished,
  } = drug;

  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: "2rem",
        marginBottom: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "end",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ mb: 2 }}
      >
        Go back
      </Button>
      <Card variant="outlined" sx={{ boxShadow: 3 }}>
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
              {active_ingredients?.map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <Chip
                        label={`${ingredient.name} - ${ingredient.strength}`}
                        color="primary"
                      />
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box mt={2}>
            <Typography variant="h6" color="secondary" gutterBottom>
              Packaging:
            </Typography>
            <Grid container spacing={2}>
              {packaging.map((pack: Packaging, index: number) => (
                <Grid item xs={12} sm={6} md={12} key={index}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography gutterBottom>{pack.description}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Sample: {pack.sample ? "Yes" : "No"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box mt={2}>
            <Typography variant="h6" color="secondary" gutterBottom>
              Pharmacological Classifications:
            </Typography>
            <List>
              {pharm_class?.map((pharm, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={
                      <Chip
                        label={pharm}
                        color="secondary"
                        variant="outlined"
                      />
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider style={{ margin: "1rem 0" }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Marketing Start Date:</strong>{" "}
                {new Date(marketing_start_date).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Listing Expiration Date:</strong>{" "}
                {new Date(listing_expiration_date).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Manufacturer:</strong>{" "}
                {openfda?.manufacturer_name?.join(", ") || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Dosage Form:</strong> {dosage_form || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Marketing Category:</strong>{" "}
                {marketing_category || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Product Type:</strong> {product_type || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Route:</strong> {route?.join(", ") || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Application Number:</strong>{" "}
                {application_number || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Product NDC:</strong> {product_ndc || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Finished Product:</strong> {finished ? "Yes" : "No"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>RxCUI:</strong> {openfda?.rxcui?.join(", ") || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>UNII:</strong> {openfda?.unii?.join(", ") || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>SPL Set ID:</strong>{" "}
                {openfda?.spl_set_id?.join(", ") || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography>
                <strong>Is Original Packager:</strong>{" "}
                {openfda?.is_original_packager
                  ? openfda.is_original_packager[0]
                    ? "Yes"
                    : "No"
                  : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};
