
"use client";
import React, { useState } from 'react';

export default function ResponsiveForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitState, setSubmitState] = useState({ status: 'idle', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    setSubmitState({ status: 'submitting', message: 'Submitting...' });

    try {
      const payload = new URLSearchParams({
        ...formData,
        source: 'website-contact-popup',
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });

      const response = await fetch('/api/submit-lead', { method: 'POST', body: payload });

      const data = await response.json();
      if (!response.ok || data.ok === false) {
        throw new Error(data.error || `Status ${response.status}`);
      }

      setSubmitState({ status: 'success', message: 'Thanks! Your message was sent successfully.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Submission failed. Please try again.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-2 sm:mx-4 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0022] via-black to-[#2d0036] border border-pink-500 rounded-2xl shadow-2xl overflow-hidden p-0">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#FF40EB] text-2xl font-bold hover:text-pink-400 focus:outline-none z-20"
          aria-label="Close"
        >
          ×
        </button>
        <div className="w-full flex items-center justify-center p-6 sm:p-8 md:p-10 bg-black/70">
          <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-pink-400 mb-2 font-medium text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-pink-500 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-pink-400 mb-2 font-medium text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-pink-500 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-pink-400 mb-2 font-medium text-sm">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={12}
                    value={formData.phone}
                    onChange={(e) => { const v = e.target.value.replace(/\D/g, ''); handleChange({ target: { name: 'phone', value: v } }); }}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-pink-500 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                    placeholder="9XXXXXXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-pink-400 mb-2 font-medium text-sm">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-pink-500 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-pink-400 mb-2 font-medium text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-pink-500 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-pink-500/50 transition-all resize-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              {submitState.status !== 'idle' && (
                <p className={`text-sm text-center ${submitState.status === 'success' ? 'text-green-400' : submitState.status === 'error' ? 'text-red-400' : 'text-gray-300'}`}>
                  {submitState.message}
                </p>
              )}
              <button
                type="submit"
                disabled={submitState.status === 'submitting'}
                className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-pink-500/50 transition-all transform hover:scale-105 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                style={{boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)'}}
              >
                {submitState.status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}