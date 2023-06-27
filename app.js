const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/what_is_esg', (req, res) => {
  res.render('what_is_esg');
});

app.get('/contact_us', (req, res) => {
  res.render('contact_us');
});

app.post('/calculate_esg', (req, res) => {
  // Retrieve input parameters from the form
  const company_name = req.body.company_name;
  const carbon_footprint = parseFloat(req.body.carbon_footprint);
  const energy_consumption = parseFloat(req.body.energy_consumption);
  const water_usage = parseFloat(req.body.water_usage);
  const waste_management = parseFloat(req.body.waste_management);

  // Define weights for each parameter
  const carbon_footprint_weight = 0.3;
  const energy_consumption_weight = 0.25;
  const water_usage_weight = 0.2;
  const waste_management_weight = 0.25;

  // Normalize the input parameters to a scale of 0-100
  const normalized_carbon_footprint = normalizeParameter(carbon_footprint);
  const normalized_energy_consumption = normalizeParameter(energy_consumption);
  const normalized_water_usage = normalizeParameter(water_usage);
  const normalized_waste_management = normalizeParameter(waste_management);

  // Calculate the weighted averages for ESG score and environmental score
  const esg_score = (
    normalized_carbon_footprint * carbon_footprint_weight +
    normalized_energy_consumption * energy_consumption_weight +
    normalized_water_usage * water_usage_weight +
    normalized_waste_management * waste_management_weight
  );

  const environmental_score = esg_score; // In this example, environmental score is the same as the ESG score

  // Render the result page with the calculated scores
  res.render('result', { company_name, esg_score, environmental_score });
});

// Function to normalize a parameter to a scale of 0-100
function normalizeParameter(value) {
  // Replace min and max values with actual minimum and maximum ranges for each parameter
  const min = 0;
  const max = 100;

  return (value - min) / (max - min) * 100;
}

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

app.listen(process.env.PORT||3000,function(){
    console.log("Running on port 3000");
});

// Prompt the user to enter the desired port

