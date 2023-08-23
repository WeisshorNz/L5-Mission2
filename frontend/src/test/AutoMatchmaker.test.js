import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
const axios = require("axios");
import AutoMatchmaker from "..components/AutoMatchmaker.js"; // Adjust the import path as needed

// Mock Axios to prevent actual API calls
jest.mock("axios");

test("it matches cars based on recognition result", async () => {
  // Mock the Axios response for image recognition
  axios.post.mockResolvedValue({
    data: {
      predictions: [{ tagName: "SUV" }], // Simulate the result of image recognition
    },
  });

  // Render the AutoMatchmaker component
  render(<AutoMatchmaker />);

  // Select the file input element
  const fileInput = screen.getByLabelText("uploadedImage");

  // Create a fake image file
  const imageFile = new File(["image content"], "image.png", {
    type: "image/png",
  });

  // Trigger the file upload event
  fireEvent.change(fileInput, { target: { files: [imageFile] } });

  // Wait for the API call and response
  await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

  // Assert that the recognition result is displayed
  expect(screen.getByText("SUV")).toBeInTheDocument();

  // You can also add more assertions to check the car cards if needed
});
