'use client'
import { useState } from "react";
import Button from '../Button'
import './Contact.css'
import ContentContainer from '../ContentContainer'
import Heading from '../Heading'


const Contact = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/ping", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        setMessage(data.message);
        setEmail("");
    };

    return (
        <ContentContainer background="dark" id="contact" className="contact-container">
            <Heading heading="Contact Me">
                <Button title="Hire Me" style="default" />
            </Heading>
            <div className="d-flex flex-wrap justify-content-between" data-aos="fade-up" suppressHydrationWarning>
                <div className="contact-box">
                    <h4 className="bg-clip-text bg-gradient-1">Get in Touch</h4>
                    <p>Let me get you a beautiful website.</p>
                </div>
                <div className="contact-subscribe-box justify-self-end">
                    <div className="form-label">Want to Start new project</div>
                    <form onSubmit={handleSubmit} className="form-group d-flex flex-column flex-sm-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email here*"
                            required
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className="btn btn-gradient" > Ping Me </button>
                        {message && <p className="ml-4 text-white">{message}</p>}
                    </form>
                </div>
            </div>
        </ContentContainer>
    )
}

export default Contact