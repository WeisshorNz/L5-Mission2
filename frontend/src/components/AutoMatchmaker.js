import React, { useState } from "react";
import axios from "axios";
import "../styling/autoMatchmaker.css";
import tHeart from "../images/tHeart.png";

function AutoMatchmaker() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    // Check if a file was selected
    if (!file) {
      return;
    }

    // Set up the API endpoint and request headers
    const apiUrl = "YOUR_AZURE_API_ENDPOINT"; // Replace with your Azure API endpoint
    const apiKey = "YOUR_AZURE_API_KEY"; // Replace with your Azure API key

    const headers = {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": apiKey,
    };

    try {
      // Convert the selected image file to a binary format
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        // Make the API request to Azure
        const response = await axios.post(apiUrl, reader.result, { headers });

        // Extract the recognition result from the response
        const result = response.data;

        // Update the recognitionResult state with the result
        setRecognitionResult(result.description.captions[0].text);
      };
    } catch (error) {
      console.error("Error uploading and recognizing the image:", error);
    }
  };
  return (
    <div className="autoMatchmaker-container">
      <div className="heading-container">
        <img src={tHeart} alt="Heart Logo" className="heart-logo" />
        <h1>Turner's AutoMatchmaker</h1>
        <img src={tHeart} alt="Heart Logo" className="heart-logo" />
      </div>
      <div className="hero-container">
        {/* <img src={blueCar} alt="blueCar" className="blue-car" /> */}
        <br></br>
        <div className="input-container">
          <h3>
            Upload an image below of what you're liking the look of, and we'll
            match you with one of our similar current cars for sale!
          </h3>
          <input
            type="file"
            className="file-upload"
            alt="uploadedImage"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <br></br> <br></br> <br></br>
          <button>Match Me!</button>
        </div>{" "}
      </div>{" "}
      <div className="result-container">
        <h2>Auto-Matchmaking Result:</h2>
        <div className="result-image">
          {selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
          )}
        </div>
      </div>
      <p>{recognitionResult}</p>
    </div>
  );
}

export default AutoMatchmaker;
