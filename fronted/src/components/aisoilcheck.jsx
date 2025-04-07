import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const SoilHealthChecker = () => {
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");

  // Load Model from Public Folder
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/model/model.json");
        setModel(loadedModel);
        console.log("Model loaded successfully!");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };
    loadModel();
  }, []);

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Preprocess Image and Make Prediction
  const predictImage = async () => {
    if (!model || !image) {
      alert("Please upload an image and wait for the model to load!");
      return;
    }

    const img = new Image();
    img.src = image;
    img.onload = async () => {
      const tensor = tf.browser
        .fromPixels(img)
        .resizeNearestNeighbor([224, 224]) // Resize to model's input size
        .toFloat()
        .expandDims(); // Add batch dimension

      const predictions = model.predict(tensor);
      const predictedClass = predictions.argMax(1).dataSync()[0];

      // Change this based on your trained classes
      const labels = ["Healthy", "Diseased"];
      setPrediction(labels[predictedClass]);
    };
  };

  return (
    <div>
      <h2>Soil & Crop Health Checker</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" width="200" />}
      <button onClick={predictImage}>Check Health</button>
      {prediction && <h3>Result: {prediction}</h3>}
    </div>
  );
};

export default SoilHealthChecker;
