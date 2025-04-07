import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import "./mandi.css"
const LivePrices = () => {
    const [date, setDate] = useState("20/03/2025"); // Default Date
    const [mandiData, setMandiData] = useState([]);

    const API_URL = import.meta.env.VITE_MANDI_API_URL;

    // Fetch Mandi Prices
    const fetchMandiPrices = async () => {
        try {
            const response = await axios.get(`${API_URL}${date}`);
            // console.log(response);
            const price= response.data.records;
            console.log(price);
             setMandiData(response.data.records);
            // setMandiData(response.data);
        } catch (error) {
            console.error("Error fetching Mandi Prices:", error);
        }
    };

    useEffect(() => {
        fetchMandiPrices();
    }, [date]); // Fetch data when date changes

    return (
        <>
        <Navbar/>
        <div className="mandi-price">
            <h2>📈 Mandi Prices</h2>
            <label>Select Date: </label>
            <input 
                type="date" 
                value={date.split("/").reverse().join("-")} 
                onChange={(e) => setDate(e.target.value.split("-").reverse().join("/"))}
            />
            <button onClick={fetchMandiPrices} className="btn-price">Get Prices</button>

            <table border="1" className="table-container">
                <thead>
                    <tr>
                        <th>Commodity</th>
                        <th>District</th>
                        <th>Market</th>
                        <th>Price (₹/Qtl)</th>
                    </tr>
                </thead>
                <tbody  className="tbody">
                    {mandiData.length > 0 ? (
                        mandiData.map((item, index) => (
                            <tr key={index}>
                                <td>{item["Commodity"]}</td>
                                <td>{item["District"]}</td>

                                <td>{item["Market"]}</td>
                                <td>{item["Modal_Price"]}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <Footer/>
        </>
    );
};

export default LivePrices;
