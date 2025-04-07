import React, { useState, useEffect } from "react";
import './GovernmentSchemes.css';
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";

const GovernmentSchemes = () => {
    const [schemes, setSchemes] = useState([]);

    // Fetch Government Schemes
    const API_URL = import.meta.env.VITE_GOVERNMENTSCHEME_API_URL;
    const fetchSchemes = async () => {
        try {
            const response = await axios.get( API_URL);
            console.log(response.data); // Log the response data for debugging
            const fetchedSchemes = Array.isArray(response.data) ? response.data : [];
            fetchedSchemes.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
            setSchemes(fetchedSchemes);
        } catch (error) {
            console.error("Error fetching government schemes:", error);
        }
    };

 // Format date to show only DD-MM-YYYY
 const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};



    useEffect(() => {
        fetchSchemes();
    }, []);

    return (
        <>
        <Navbar/>
        <div>
            <h2 className="scheme-gov-heading">📜 Government Schemes for Farmers</h2>

            <table>
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {schemes.length > 0 ? (
                        schemes.map((scheme, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{formatDate(scheme.publishDate)}</td>
                                <td>{scheme.title}</td>
                                <td>{scheme.description}</td>
                                <td ><a href={scheme.link} target="_blank" rel="noopener noreferrer" className="scheme-link">Apply &Check Eligibility</a></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No schemes available at the moment.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <Footer/>
        </>
    );
};

export default GovernmentSchemes;
