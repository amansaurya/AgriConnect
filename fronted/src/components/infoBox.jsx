
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './infoBox.css';

export default function InfoBox({ info }) {
  // Add comprehensive checks for data structure
  if (!info || !info.forecast || !Array.isArray(info.forecast) || info.forecast.length === 0) {
      return (
          <div className="forecast-container">
              <Card className="empty-state-card">
                  <CardContent>
                      <Typography variant="h6" align="center">
                          Enter a city name above to see the weather forecast
                      </Typography>
                  </CardContent>
              </Card>
          </div>
      );
  }

  // Helper function to get date for next 5 days
  const getDateString = (daysFromNow = 0) => {
      const date = new Date();
      date.setDate(date.getDate() + daysFromNow);
      return date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric'
      });
  };

  return (
      <div className="forecast-container">
          <h2>{info.location?.name || 'Weather Forecast'},{info.location?.region || ''},{info.location?.country || ''}</h2>
          <Grid container spacing={2}>
              {info.forecast.map((day, index) => (
                  <Grid item xs={12} sm={6} md={2.4} key={index}>
                      <Card className="weather-card">
                          <CardContent>
                              <Typography variant="h6" component="div">
                                  {getDateString(index)}
                              </Typography>
                              {day.icon && (
                                  <img 
                                      src={day.icon} 
                                      alt={day.condition || 'weather'} 
                                      className="weather-icon"
                                  />
                              )}
                              <Typography variant="body2" color="text.secondary">
                                  <div>Temp: {day.avgTemp || day.temp_c}°C</div>
                                  {day.maxTemp && <div>Max: {day.maxTemp}°C</div>}
                                  {day.minTemp && <div>Min: {day.minTemp}°C</div>}
                                  <div>Humidity: {day.humidity}%</div>
                                  {day.rainfall && <div>Rainfall: {day.rainfall}mm</div>}
                                  <div className="condition">{day.condition}</div>
                              </Typography>
                          </CardContent>
                      </Card>
                  </Grid>
              ))}
          </Grid>
      </div>
  );
}