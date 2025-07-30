import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import cllgimg from "../assets/cllgimg.jpeg";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/contact/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      toast.error(data.message || "Submission failed.");
    }
  } catch (error) {
    console.error("Submission error:", error);
    toast.error("Server error. Try again.");
  }
};

  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white p-6 md:p-16 flex flex-col items-center justify-center font-sans"
      style={{
        backgroundImage: `url(${cllgimg})`,
        backgroundAttachment: "fixed",
      }}
    >
      
      <Toaster position="top-right" />

      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-10 text-red-700 drop-shadow"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl shadow-2xl p-8">
        {/* College Info */}
        <motion.div
          className="space-y-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-cyan-100">College Info</h3>
          <p className="text-gray-300">
            Drop us a message, visit our campus, or just say hi! We're always happy to connect.
          </p>
          <div className="text-gray-300 space-y-3 text-sm md:text-base">
            <div>
              <strong>📍 Address:</strong><br />
              Ingraham Institute Girls’ Degree College<br />
              Hapur Road, Ghaziabad<br />
              Pincode – 201001
            </div>
            <div>
              <strong>📞 Phone:</strong> 01204207573, 4204826, 8744061586
            </div>
            <div>
              <strong>✉️ Email:</strong> contact@abcengg.edu.in
            </div>
          </div>

          <iframe
            className="rounded-lg w-full h-64 border border-cyan-300 shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4639196958847!2d77.45257595!3d28.675766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf196c9efbc6b%3A0x1fb5920aa4478e88!2sRaj%20Kunj%2C%20Raj%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201002!5e0!3m2!1sen!2sin!4v1753879131013!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            title="College Location"
          ></iframe>
          
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 text-white"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <label className="block mb-1 text-sm text-cyan-200">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-cyan-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-cyan-200">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Your query or message..."
              required
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-white text-[red] font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
