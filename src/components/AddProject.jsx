// src/components/AddProject.jsx
import { useState } from 'react';

function AddProject({ onAdd }) {
    // 🚀 State to toggle the form visibility
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tech: '',
        image: '',
        liveLink: '',
        repoLink: ''
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const techArray = formData.tech ? formData.tech.split(',').map(t => t.trim()) : [];
        onAdd({ ...formData, id: Date.now(), tech: techArray });

        // Reset form and close it
        setFormData({ title: '', description: '', tech: '', image: '', liveLink: '', repoLink: '' });
        setIsOpen(false);
    };

    // 1️⃣ Show ONLY the button if isOpen is false
    if (!isOpen) {
        return (
            <button
                className="toggle-form-btn"
                onClick={() => setIsOpen(true)}
            >
                + Add New Project
            </button>
        );
    }

    // 2️⃣ Show the full form if isOpen is true
    return (
        <div className="add-project-container">
            <form className="add-project-form" onSubmit={handleSubmit}>
                <div className="form-header">
                    <h3>New Project Details</h3>
                    <button type="button" className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />

                <div className="file-input-container">
                    <label>Upload Screenshot:</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {formData.image && <img src={formData.image} alt="Preview" className="upload-preview" />}
                </div>

                <input type="text" placeholder="Tech (React, Node)" value={formData.tech} onChange={(e) => setFormData({ ...formData, tech: e.target.value })} />
                <input type="text" placeholder="Live Demo Link" value={formData.liveLink} onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })} />
                <input type="text" placeholder="GitHub Repo Link" value={formData.repoLink} onChange={(e) => setFormData({ ...formData, repoLink: e.target.value })} />

                <button type="submit" className="submit-btn">+ Save Project</button>
            </form>
        </div>
    );
}

export default AddProject;