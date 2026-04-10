// src/components/ContactForm.jsx
import React from 'react';

function ContactForm() {
    return (
        /* 🚀 We use the Formspree link in the 'action' attribute */
        <form
            className="contact-form"
            action="https://formspree.io/f/xnjorzae"
            method="POST"
        >
            <h2>Send a Message</h2>

            <div className="input-group">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                />
            </div>

            <div className="input-group">
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                />
            </div>

            <div className="input-group">
                <textarea
                    name="message"
                    placeholder="How can I help you?"
                    required
                ></textarea>
            </div>

            {/* 🛡️ This hidden input prevents spam bots from filling your form */}
            <input type="hidden" name="_subject" value="New Message from Portfolio!" />

            <button type="submit">Send Message</button>
        </form>
    );
}

export default ContactForm;