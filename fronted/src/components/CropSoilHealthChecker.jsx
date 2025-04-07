import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Navbar from "./navbar";
import Footer from "./footer";
import "./CropSoilHealthChecker.css";

const SoilHealthChecker = () => {
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(true); // Track model loading state

  // Load Model from Public Folder
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/model/model.json");
        setModel(loadedModel);
        setLoading(false); // Set loading to false once model is ready
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
    if (loading) {
      alert("Model is still loading. Please wait a few seconds!");
      return;
    }

    if (!model || !image) {
      alert("Please upload an image first!");
      return;
    }

    const img = new Image();
    img.src = image;
    img.onload = async () => {
      try {
        tf.engine().startScope(); 
        const tensor = tf.browser
          .fromPixels(img)
          .resizeNearestNeighbor([224, 224]) // Resize to model input size
          .toFloat()
          .expandDims(); // Add batch dimension

        const predictions = model.predict(tensor);
        const predictionArray = await predictions.data();
        const predictedClass = predictions.argMax(1).dataSync()[0];

        // Updated class labels
        const labels = [
          "Healthy Soil",
          "Diseased Soil",
          "Human",
          "Car",
          "Water",
          "Flower",
          "Building",
          "Animal",
          "Other Objects"
        ];
        const predictedLabel = labels[predictedClass] || "Unknown";
        const confidence = (predictionArray[predictedClass] * 100).toFixed(2);

        if (predictedLabel === "Human" || predictedLabel === "Car"|| predictedLabel === "Flower"|| predictedLabel === "water"|| predictedLabel === "flower"||
          predictedLabel === "Animal"|| predictedLabel === "Building"|| confidence < 60) {
            console.log(predictedLabel)  
          setPrediction("⚠️ Invalid Image! Please upload a valid soil photo.");
          
        }else {
          setPrediction(`✅ ${labels[predictedClass]} (Confidence: ${confidence}%)`);
          console.log(predictedLabel)
          console.log(labels)
        }

        tf.dispose([tensor, predictions]);
      } catch (error) {
        console.error("Error during prediction:", error);
        setPrediction(" Error in processing image!");
      }
      finally {
        //  End TensorFlow.js Memory Scope (Frees GPU Memory)
        tf.engine().endScope();}
    };
  };

  return (
    <>
    <Navbar/>
    <div className="check-container">
      <h2>🌱 Soil Health Checker</h2>
      {loading && <p>Loading AI Model... Please Wait ⏳</p>}
      <input className="get-image-predict" type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" width="200" />}
      <button className="btn-predict" onClick={predictImage} disabled={loading}>
        🔍 Check Health
      </button>
      {prediction && <h3 className="prediction-result">{prediction}</h3>}
    </div>
    <Footer/>
    </>
  )
};

export default SoilHealthChecker;
