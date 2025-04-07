import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; 

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Section - AgriConnect Logo & Address */}
        <div style={styles.brand}>
          <h2>🌱 AgriConnect</h2>
          <p><strong>Address:</strong> Patna, Bihar, India</p>
          <p><strong>CIN:</strong> 123456789012</p>
          {/* Social Media Icons */}
          <div style={styles.socialIcons}>
            <a href="#" style={styles.link}><i className="fab fa-facebook"></i></a>
            <a href="#" style={styles.link}><i className="fab fa-x-twitter"></i></a>
            <a href="#" style={styles.link}><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        {/* Center - General Links */}
        <div style={styles.section}>
          <h3>General</h3>
          <ul>
            <li><a href="/about" style={styles.link}>About Us</a></li>
            <li><a href="/contact" style={styles.link}>Contact Us</a></li>
          </ul>
        </div>

        {/* Services Section */}
        <div style={styles.section}>
          <h3>Services</h3>
          <ul>
            <li><a href="/mandi" style={styles.link}>Market Price</a></li>
            <li><a href="/weather" style={styles.link}>Weather Update</a></li>
            <li><a href="/government-schemes" style={styles.link}>Government Scheme</a></li>
            <li><a href="/cropsoilhealth" style={styles.link}>Check Soil Health</a></li>
          </ul>
        </div>

        {/* Policies Section */}
        <div style={styles.section}>
          <h3>Policies</h3>
          <ul>
            <li><a href="/terms" style={styles.link}>Terms & Conditions</a></li>
            <li><a href="/privacy" style={styles.link}>Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={styles.bottom}>
        <p>© 2025 AgriConnect | Digital Solutions for Farmers</p>
        <p>All rights reserved | Powered by AgriConnect</p>
      </div>
    </footer>
  );
};

// Inline CSS for styling
const styles = {
  footer: {
    backgroundColor: "#fcf9f5", 
    padding: "40px 20px",
    textAlign: "center",
    color: "black",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  brand: {
    maxWidth: "250px",
    textAlign: "left",
    marginLeft: "0",
  },
  section: {
    maxWidth: "250px",
    textAlign: "left",
  },
  socialIcons: {
    marginTop: "10px",
    paddingLeft:"5px"
  },
  bottom: {
    marginTop: "30px",
    borderTop: "1px solid #ccc",
    paddingTop: "10px",
  },
  link: {
    color: "black", 
    textDecoration: "none", 

  }
  
};

export default Footer;
