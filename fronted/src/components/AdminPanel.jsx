import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";
import "./adminPanel.css";
 

const AdminPanel = () => {
    const API_URL = import.meta.env.VITE_GOVERNMENTSCHEME_API_URL;
   
    const [schemes, setSchemes] = useState([]);
    const [newScheme, setNewScheme] = useState({
        title: '',
        description: '',
        publishDate: '',
        link: ''
    });
    const [editingScheme, setEditingScheme] = useState(null);

    const fetchSchemes = async () => {
        try {
            const response = await axios.get(API_URL);
            setSchemes(response.data);
        } catch (error) {
            console.error("Error fetching schemes:", error);
        }
    };

    useEffect(() => {
        fetchSchemes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewScheme({ ...newScheme,[name]: value });
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate required fields
            if (!newScheme.title || !newScheme.description || !newScheme.publishDate) {
                alert('Please fill in all required fields');
                return;
            }
    
            const response = await axios.post(
                API_URL, 
                newScheme,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.status === 201) {
                await fetchSchemes();
                setNewScheme({ 
                    title: '', 
                    description: '', 
                    publishDate: '', 
                    link: '' 
                });
                alert('Scheme added successfully!');
            }
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            alert(`Error adding scheme: ${error.response?.data?.message || 'Please try again'}`);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this scheme?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchSchemes();
                alert('Scheme deleted successfully!');
            } catch (error) {
                alert('Error deleting scheme');
            }
        }
    };

    const handleEdit = (scheme) => {
        setEditingScheme(scheme);
        setNewScheme({
            title: scheme.title,
            description: scheme.description,
            publishDate: scheme.publishDate.split('T')[0],
            link: scheme.link
        });
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${API_URL}/${editingScheme._id}`,
                newScheme,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.status === 200) {
                await fetchSchemes();
                setNewScheme({
                    title: '',
                    description: '',
                    publishDate: '',
                    link: ''
                });
                setEditingScheme(null);
                alert('Scheme updated successfully!');
            }
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            alert(`Error updating scheme: ${error.response?.data?.message || 'Please try again'}`);
        }
    };

    return (
        <>
            <Navbar />
            <div className="admin-container">
                <h2>Admin Panel - Government Schemes</h2>
                <div className="add-scheme-form">
                   <h3>{editingScheme ? 'Edit Scheme' : 'Add New Scheme'}</h3> 
                  <form onSubmit={editingScheme ? handleUpdate : handleSubmit}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={newScheme.title} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea 
                                name="description" 
                                value={newScheme.description} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Publish Date:</label>
                            <input 
                                type="date" 
                                name="publishDate" 
                                value={newScheme.publishDate} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Link:</label>
                            <input 
                                type="url" 
                                name="link" 
                                value={newScheme.link} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="submit-btn">{editingScheme ? 'Update Scheme' : 'Add Scheme'}</button>
                        {editingScheme && (
            <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                    setEditingScheme(null);
                    setNewScheme({
                        title: '',
                        description: '',
                        publishDate: '',
                        link: ''
                    });
                }}
            >
                Cancel Edit
            </button>
        )}
                    </form>
                </div>

                <div className="schemes-list">
                    <h3>Existing Schemes</h3>
                    <div className="schemes-grid">
                        {schemes.map((scheme) => (
                            <div key={scheme._id} className="scheme-card">
                                <h4>{scheme.title}</h4>
                                <p>{scheme.description}</p>
                                <div className="scheme-footer">
                                    <span>{new Date(scheme.publishDate).toLocaleDateString()}</span>
                                        <div className="button-group">
                                            <button 
                                              onClick={() => handleEdit(scheme)}
                                            className="edit-btn"
                                            >
                                           Edit
                                           </button>
                                           <button 
                                         onClick={() => handleDelete(scheme._id)}
                                        className="delete-btn"
                                           >
                                         Delete
                                         </button>
                                      </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AdminPanel;