import React, { useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import "./manualSoilChecker.css";

const ManualSoilChecker = () => {
  // State management
  const [formData, setFormData] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    moisture: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  // Optimal ranges for soil parameters
  const optimalRanges = {
    ph: { min: 6.5, max: 7.5, unit: '' },
    nitrogen: { min: 250, max: 500, unit: 'ppm' },
    phosphorus: { min: 20, max: 40, unit: 'ppm' },
    potassium: { min: 120, max: 250, unit: 'ppm' },
    moisture: { min: 20, max: 30, unit: '%' }
  };

  // Soil health analysis function
  const analyzeSoilHealth = (data) => {
    const { ph, nitrogen, phosphorus, potassium, moisture } = data;
    let soilHealth = '';
    let crops = [];
    let recommendations = [];

    // Check each parameter and build recommendations
    if (ph < 5.5) {
      recommendations.push('Add agricultural lime to increase soil pH');
    } else if (ph > 8.0) {
      recommendations.push('Add sulfur or gypsum to decrease soil pH');
    }

    if (nitrogen < 150) {
      recommendations.push('Add nitrogen-rich fertilizers or organic matter');
    } else if (nitrogen > 500) {
      recommendations.push('Reduce nitrogen application');
    }

    if (phosphorus < 10) {
      recommendations.push('Add phosphate fertilizers');
    } else if (phosphorus > 40) {
      recommendations.push('Avoid phosphorus fertilizers');
    }

    if (potassium < 80) {
      recommendations.push('Add potassium-rich fertilizers');
    } else if (potassium > 250) {
      recommendations.push('Reduce potassium application');
    }

    if (moisture < 15) {
      recommendations.push('Improve irrigation');
    } else if (moisture > 35) {
      recommendations.push('Improve drainage');
    }

    // Determine soil health and suitable crops
    if (
      ph >= 6.5 && ph <= 7.5 &&
      nitrogen >= 250 && nitrogen <= 500 &&
      phosphorus >= 20 && phosphorus <= 40 &&
      potassium >= 120 && potassium <= 250 &&
      moisture >= 20 && moisture <= 30
    ) {
      soilHealth = 'Good';
      crops = ['Wheat', 'Rice', 'Maize', 'Sugarcane', 'Vegetables'];
    } else if (
      (ph >= 5.5 && ph <= 8.0) &&
      (nitrogen >= 150) &&
      (phosphorus >= 10) &&
      (potassium >= 80) &&
      (moisture >= 15 && moisture <= 35)
    ) {
      soilHealth = 'Moderate';
      crops = ['Pulses', 'Barley', 'Millet', 'Oilseeds'];
    } else {
      soilHealth = 'Poor';
      crops = ['Hardy crops', 'Drought-resistant varieties'];
    }

    return {
      soilHealth,
      crops,
      recommendations: recommendations.join('. ') + '.'
    };
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      if (!value) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      } else if (isNaN(value)) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be a number`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const numericData = Object.keys(formData).reduce((acc, key) => ({
        ...acc,
        [key]: parseFloat(formData[key])
      }), {});

      const analysis = analyzeSoilHealth(numericData);
      setResult(analysis);
    } catch (error) {
      setErrors({ submit: 'Error analyzing soil data. Please check your inputs.' });
    }
  };

  return (
    <>
    <Navbar/>
    <div className="soil-checker">
      <h2>🌱 Soil Health Analyzer</h2>
      <form onSubmit={handleSubmit} className="soil-form">
        {Object.keys(formData).map(key => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
              <span className="range-hint">
                (Optimal: {optimalRanges[key].min}-{optimalRanges[key].max}
                {optimalRanges[key].unit})
              </span>
            </label>
            <input
              type="number"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${key} value`}
              step={key === 'ph' || key === 'moisture' ? "0.1" : "1"}
              className={errors[key] ? 'error' : ''}
              required
            />
            {errors[key] && <span className="error-message">{errors[key]}</span>}
          </div>
        ))}
        
        {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
        
        <button type="submit" className="analyze-btn">
          Analyze Soil
        </button>
      </form>

      {result && (
        <div className={`result-container ${result.soilHealth.toLowerCase()}`}>
          <h3>Results</h3>
          <div className="result-item">
            <span className="result-label">Soil Health:</span>
            <span className={`health-status ${result.soilHealth.toLowerCase()}`}>
              {result.soilHealth}
            </span>
          </div>
          <div className="result-item">
            <span className="result-label">Suitable Crops:</span>
            <span>{result.crops.join(', ')}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Recommendations:</span>
            <p>{result.recommendations}</p>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default ManualSoilChecker;