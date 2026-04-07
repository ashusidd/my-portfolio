// src/components/ContactForm.jsx
import { useState } from 'react';

function ContactForm({ onSendMessage }) {
    const [formData, setFormData] = useState({ name: '', email: '', text: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        // 🚀 We pass a COPY of the data to ensure App.jsx receives it perfectly
        onSendMessage({ ...formData });

        // Clear form
        setFormData({ name: '', email: '', text: '' });
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>

            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                /* 🚀 Best Practice: ...prev ensures other fields aren't deleted */
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
            />

            <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
            />

            <textarea
                placeholder="Message"
                value={formData.text}
                onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                required
            />

            <button type="submit">Send Message</button>
        </form>
    );
}

export default ContactForm;