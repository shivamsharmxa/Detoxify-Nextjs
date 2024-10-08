"use client";
import React, { FormEvent, useState } from "react";
import { Vortex } from "../components/ui/vortex"; // Adjust the path based on where Vortex is located
import Navbar from "../components/Navbar";

function ContactUs() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [showMessage, setShowMessage] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Show success message and reset form
        setStatusMessage('Message sent successfully!');
        setShowMessage(true);
        setEmail('');
        setMessage('');

        // Hide message after 5 seconds
        setTimeout(() => {
            setShowMessage(false);
        }, 5000); // Adjust duration as needed
    };

    return (
      <>
      <Navbar/>
        <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-36 overflow-hidden">
            {/* Vortex component with full-page coverage */}
            <Vortex className="absolute top-0 left-0 w-full h-full z-0" />
            {/* Content with higher z-index */}
            <div className="max-w-2xl mx-auto p-4 relative z-10">
                <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
                    Contact Us
                </h1>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">
                    Reach out and let us know how we can assist you
                    in your musical journey.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
                        required
                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Your message"
                        className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
                        rows={5}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        Send Message
                    </button>
                </form>
                {showMessage && (
                    <div className="mt-4 p-4 rounded-lg bg-teal-100 text-teal-800 transition-opacity opacity-0 animate-fade-in">
                        {statusMessage}
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

export default ContactUs;

