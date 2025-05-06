'use client';
import { useState, useEffect } from "react";

const MessageForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message || "Thanks for your message!");
      setShowMessage(true);
      setEmail("");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        setMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <>
      <form onSubmit={handleSubmit} className="form-group d-flex flex-column flex-sm-row gap-3">
        <input
          type="email"
          placeholder="Enter your email here*"
          required
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <button type="submit" className="btn btn-gradient" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Message Me"}
        </button>
      </form>
      {showMessage && (
        <p className="mt-1 text-white" role="alert">{message}</p>
      )}
    </>
  );
};

export default MessageForm;
