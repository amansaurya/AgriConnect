import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import "./AboutUs.css";


export default function AboutUs() {

    return (
        <>
        <Navbar/>
        <div className='about-container'>
       <h2>About AgriConnect</h2> 
       <p>AgriConnect is a digital platform designed to revolutionize the agricultural landscape by providing farmers with real-time market information, AI-powered tools, and government scheme updates. Our mission is to bridge the gap between farmers and essential agricultural resources, empowering them with knowledge and technology to enhance productivity and profitability.</p>

<p>The agricultural sector faces multiple challenges, including a lack of transparent pricing information, limited access to government support programs, and inadequate awareness of scientific farming techniques. Recognizing these issues, the founders of AgriConnect—coming from both agricultural and technological backgrounds—have built a platform that integrates digital innovation with agribusiness to create a more efficient and informed farming community.</p>


       <div class="about-objectives">
         <h3>Objectives</h3>
            <ul>
             <li>Providing Real-Time Market Prices</li>
             <li>Weather Forecasting</li>
             <li>AI-Powered Crop & Soil Health Analysis</li>
             <li>Government Scheme Awareness & Management</li>
             
           </ul>
         </div>


 </div>
       <Footer/>
        </>
    )
}