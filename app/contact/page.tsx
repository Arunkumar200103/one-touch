"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/breadcrumb";
import { InfoCard } from "@/components/info-card";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import Image from "next/image";

const colors = getPageColor("contact");

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      title: "Call Us",
      description: "Speak directly with our support team",
      icon: "📞",
      details: "+91 1234-567-890",
      availability: "24/7 Support",
    },
    {
      title: "Email Us",
      description: "Send us your questions anytime",
      icon: "📧",
      details: "support@onetouch.com",
      availability: "Response within 2 hours",
    },
    {
      title: "WhatsApp",
      description: "Quick messaging support",
      icon: "💬",
      details: "+91 9876-543-210",
      availability: "Chat now",
    },
    {
      title: "Office Location",
      description: "Visit us in person",
      icon: "📍",
      details: "123 Service Street, Chennai, India",
      availability: "Mon-Fri, 9AM-6PM",
    },
  ];

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.bgGradient}`}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-4 mt-[-5rem]">
        <BackToHome />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
      <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Contact Us" },
          ]}
          accentColor={colors.primary}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: colors.primary }}
            >
              Get in Touch
            </h2>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-2">{method.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {method.description}
                  </p>
                  <div className="text-sm font-bold" style={{ color: colors.primary }}>
                    {method.details}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {method.availability}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: colors.primary }}
            >
              Send us a Message
            </h2>

            {submitted && (
              <div className="mb-8 p-6 rounded-2xl text-white animate-fade-in-up" style={{ backgroundColor: colors.primary }}>
                <div className="text-3xl mb-2">✓</div>
                <h3 className="text-xl font-bold">Thank you!</h3>
                <p className="opacity-90">We've received your message and will get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-xl">
              {/* Name */}
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none"
                  required
                >
                  <option value="">Choose a reason for contacting us</option>
                  <option value="support">Technical Support</option>
                  <option value="complaint">Report a Problem</option>
                  <option value="feedback">General Feedback</option>
                  <option value="business">Business Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-lg font-bold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none h-40 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                Send Message
              </button>

              <p className="text-sm text-gray-500 text-center">
                We'll get back to you as soon as possible. Thank you for your patience!
              </p>
            </form>
          </div>
        </div>

        {/* FAQ CTA */}
        <div className="bg-white p-12 rounded-3xl shadow-lg border-2" style={{ borderColor: colors.primary }}>
          <h3 className="text-3xl font-bold mb-4 text-gray-900">
            Common Questions?
          </h3>
          <p className="text-gray-700 mb-6">
            Check our FAQs for answers to frequently asked questions about One Touch.
          </p>
          <a href="/faqs">
            <button
              className="text-white font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              View FAQs
            </button>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Additional contact info */}
      </div>
    </main>
  );
}
