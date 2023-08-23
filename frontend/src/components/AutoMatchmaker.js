import React, { useState } from "react";
import axios from "axios";
import "../styling/autoMatchmaker.css";
import tHeart from "../images/tHeart.png";

function AutoMatchmaker() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState("");
  const [matchingCars, setMatchingCars] = useState([]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const apiUrl = "YOUR_CUSTOM_VISION_API_ENDPOINT";
    const apiKey = "APIKEY";

    const headers = {
      "Content-Type": "application/octet-stream",
      "Prediction-Key": apiKey,
    };

    try {
      // Convert the selected image file to a binary format
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = async () => {
        // Make the API request to Custom Vision
        const response = await axios.post(apiUrl, reader.result, { headers });

        // Extract the recognition result from the response
        const result = response.data;

        // Update the recognitionResult state with the result
        setRecognitionResult(result.predictions[0].tagName);

        // Fetch that JSON file and filter matching cars
        axios.get("../data/carData.json").then((response) => {
          const carOptions = response.data;
          const matchingCars = carOptions.filter(
            (car) => car.carType === result.predictions[0].tagName
          );
          setMatchingCars(matchingCars);
        });
      };
    } catch (error) {
      console.error("Error uploading and recognising the image:", error);
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
        <br />
        <div className="input-container">
          <h3>
            Upload an image below of what you're liking the look of, and we'll
            match you with one of our sweet rides for sale that's just your
            style!
          </h3>
          <input
            type="file"
            className="file-upload"
            alt="uploadedImage"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <br /> <br /> <br />
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
        <p>{recognitionResult}</p>
        <h3>Matching Car Options:</h3>
        <div className="matching-cars">
          {matchingCars.map((car, index) => (
            <div className="car-card" key={index}>
              <img
                className="car-image"
                src={car.image}
                alt={`${car.make} ${car.model}`}
              />
              <p>Car Type: {car.carType}</p>
              <p>Make: {car.make}</p>
              <p>Model: {car.model}</p>
              <p>Year: {car.year}</p>
              <p>Price: ${car.price}</p>
              <p>Color: {car.color}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AutoMatchmaker;
