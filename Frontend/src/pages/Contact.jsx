import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const query = new URLSearchParams(useLocation().search);
  const role = query.get("role");

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: You can integrate EmailJS, Formspree, or backend endpoint here
    console.log(form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  const heading =
    role === "student"
      ? "Student Application"
      : role === "teacher"
      ? "Teacher Application"
      : "Get In Touch";

  const message =
    role === "student"
      ? "Please fill out the form below to apply as a student at Ingraham Institute Girls Degree College."
      : role === "teacher"
      ? "Apply now to join our distinguished faculty team at Ingraham Institute Girls Degree College. Fill in your details below."
      : "Contact us for admissions, faculty positions, or any general queries.";

  return (
    <section className="bg-white py-16 px-4 md:px-12 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-primary mb-4">{heading}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{message}</p>
      </div>

      <div className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-xl shadow-md">
        {submitted ? (
          <div className="text-center text-green-600 text-xl font-semibold">
            🎉 Thank you! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                value={form.message}
                onChange={handleChange}
                placeholder={
                  role === "student"
                    ? "Tell us why you want to join Ingraham Institute Girls Degree College..."
                    : role === "teacher"
                    ? "Tell us about your teaching experience and expertise..."
                    : "How can we help you?"
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
