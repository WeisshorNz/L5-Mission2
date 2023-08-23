const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 4000;
app.use(express.raw({ type: "image/jpeg", limit: "10mb" }));
app.use(cors());

app.post("/api", async (req, res) => {
  try {
    const imageBinary = req.body;
    const predictionKey = process.env.PREDICTION_KEY;
    const contentType = process.env.CONTENT_TYPE;

    const headers = {
      "Prediction-Key": predictionKey,
      "Content-Type": contentType,
    };

    const response = await axios.post(
      "https://southeastasia.api.cognitive.microsoft.com/customvision/v3.0/Prediction/7389928b-4f78-4fbc-8f08-62b7344e48e0/detect/iterations/Iteration2/image",
      imageBinary,
      { headers }
    );

    // res.json(response.data);

    const highProbabilityPredictions = [];
    for (const prediction of response.data.predictions) {
      if (prediction.probability >= 0.6) {
        highProbabilityPredictions.push(prediction);
      }
    }

    res.json(highProbabilityPredictions);
  } catch (error) {
    console.error("Error making the prediction:", error);
    res
      .status(500)
      .json({ error: "An error occurred while making the prediction." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}, yeah boy!`);
});
