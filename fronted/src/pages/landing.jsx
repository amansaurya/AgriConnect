
import { Link, Route,useNavigate} from "react-router-dom";
import Navbar from "../components/navbar";

import MainSection from "../components/mainsection";
import"../components/landing.css"
import Footer from "../components/footer";

export default function Landing() {
  const router=useNavigate();
  return(
    <>
    <Navbar />
    <div className="landing-page">
        {/* //short info regarding price and temperature  , slide, alternate*/}
        <div className="short_notice">
            <div className="temperature">
               temperature: 31°C
            </div>
             <div className="price_show">
                  <marquee behavior="alternate" direction="">rice=4732 |&nbsp;&nbsp;&nbsp; wheat= 3632 |&nbsp;&nbsp;&nbsp; maize=6743|&nbsp;&nbsp;&nbsp;potato=4567 |&nbsp;&nbsp;&nbsp; onion=5672|&nbsp;&nbsp;&nbsp; masur dal= 10243</marquee>
              </div>

        </div>
       <div className="image">
        
       </div>
     

     <div className="intro-container">
       <div className="leaders">
        
            <div className="leader">
                <img src="/nitishKumar.jpeg" alt="Nitish Kumar" />
                <p>श्री नीतीश कुमार<br />माननीय मुख्यमंत्री</p>
           </div>
       
              <div className="leader">
                 <img src="/vijaykumarsinha.jpeg" alt="Vijay Kumar Sinha" />
                 <p>श्री विजय कुमार सिन्हा<br />माननीय कृषि मंत्री</p>
              </div>
               <div className="leader small">
                  <img src="/sanjay.jpeg" alt="Sanjay Kumar" />
                 <p>श्री संजय कुमार अग्रवाल<br />सचिव, कृषि</p>
              </div>
               <div className="leader small">
                 <img src="/nitin.jpg" alt="Nitin Kumar" />
                <p>श्री नितिन कुमार सिंह<br />निदेशक कृषि</p>
              </div>
       </div>

       <div className="intro-text">
          <h2>
          🌱 AgriConnect – किसानों के लिए एक सशक्त डिजिटल प्लेटफॉर्म 🌱
          </h2>
           <p>
           AgriConnect is a digital platform that helps farmers enhance their productivity by providing up-to-date agricultural information, market trends, and AI-powered tools. It is a complete solution that integrates technology and government support to make farming easier and more profitable..
          </p>
      
           <p className="about">
           Farmers often lack access to accurate market prices, government schemes, and scientific farming techniques. AgriConnect solves this problem by providing fast and precise information, enabling them to make better decisions.
             </p>

             {/* <div className="intro-image">
              <img src="/intoImg.jpg" alt="Crop Image" />
             </div> */}

        </div>

      
      </div>
      <h2 className="services">our services</h2>
      <div className="container">
        
        <div className="card">
            <img src="/mandiimg.jpg" alt="Mandi Price"/>
            <h2>📉 Live Mandi Price</h2>
            <p>Check the latest mandi prices and market updates.</p>
            <button onClick={()=>{
                router("/mandi")
            }}>🔍 View Prices</button>
        </div>

        
        <div className="card">
            <img src="/weatherimg.jpg" alt="Weather"/>
            <h2>🌦 Weather Updates</h2>
            <p>Get accurate weather forecasts for your location.</p>
            <button  onClick={()=>{
                router("/weather")
            }}>🌤 Check Now</button>
        </div>

        
        <div className="card">
            <img src="/scheme.jpg" alt="Gov Schemes"/>
            <h2>📜 Govt Schemes</h2>
            <p>Get information of government schemes for farmers.</p>
            <button onClick={()=>{
                router("/government-schemes")
            }} >📋 Know More</button>
        </div>

       
        <div className="card">
            <img src="/aihealthcheck.jpg" alt="AI Crop Analysis"/>
            <h2>🤖 AI  Soil Processing</h2>
            <p>Check Soil health using AI technology.</p>
            <button  onClick={()=>{
                router("/cropsoilhealth")
            }}>🚜 Start Analysis</button>
        </div>
    </div>

    <div className="app-coming">
        <img src="/mobileapp.jpg" alt="" className="app-img" />
    </div>

    <Footer/>
    </div>

    
    </>
  )
}