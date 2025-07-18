import { useState } from "react";
import { alumniService } from "../firebase/services";
import toast, { Toaster } from "react-hot-toast";
import AlumniBanner from "../assets/slideshow3.jpeg";

export default function AlumniFormPage() {
  const [formData, setFormData] = useState({
    program: "",
    fullName: "",
    passingYear: "",
    mobile: "",
    email: "",
    dob: "",
    organization: "",
    designation: "",
    testimonial: "",
    linkedin: "",
    photo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await alumniService.submitAlumni(formData);
      toast.success("Alumni registration submitted successfully!");
      setFormData({
        program: "",
        fullName: "",
        passingYear: "",
        mobile: "",
        email: "",
        dob: "",
        organization: "",
        designation: "",
        testimonial: "",
        linkedin: "",
        photo: null,
      });
    } catch (error) {
      toast.error("Error submitting registration. Please try again.");
      console.error("Error submitting alumni form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <section
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${AlumniBanner})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center m-8 text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Alumni</h1>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-20">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-red-700">
            Alumni Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <select
                name="program"
                required
                onChange={handleChange}
                className="p-2 border rounded"
                disabled={isSubmitting}
              >
                <option value="">Select Program *</option>
                <option value="Bachelor of Arts (B.A.)">Bachelor of Arts (B.A.)</option>
                <option value="Bachelor of Commerce (B.Com.)">Bachelor of Commerce (B.Com.)</option>
                <option value="Bachelor of Science (B.Sc.)">Bachelor of Science (B.Sc.)</option>
                <option value="Skill Development Programs">Skill Development Programs</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="fullName"
                required
                placeholder="Full Name *"
                onChange={handleChange}
                className="p-2 border rounded"
                disabled={isSubmitting}
              />
              <input
                name="passingYear"
                required
                type="number"
                placeholder="Year of Passing *"
                onChange={handleChange}
                className="p-2 border rounded"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="mobile"
                required
                placeholder="Mobile *"
                onChange={handleChange}
                className="p-2 border rounded"
                disabled={isSubmitting}
              />
              <input
                name="email"
                required
                type="email"
                placeholder="Email *"
                onChange={handleChange}
                className="p-2 border rounded"
                disabled={isSubmitting}
              />
              <input
                name="dob"
                type="date"
                placeholder="Date of Birth"
                onChange={handleChange}
                className="p-2 border rounded"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="organization"
                required
                placeholder="Current Organization's Name *"
                onChange={handleChange}
                className="p-2 border rounded"
                disabled={isSubmitting}
              />
              <input
                name="designation"
                required
                placeholder="Designation in Current Org. *"
                onChange={handleChange}
                className="p-2 border rounded"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm text-red-700 font-semibold mb-1">
                Testimonial *
              </label>
              <textarea
                name="testimonial"
                required
                rows="4"
                placeholder="Your testimonial here..."
                onChange={handleChange}
                className="w-full p-2 border rounded"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="linkedin"
                placeholder="LinkedIn Profile URL"
                onChange={handleChange}
                className="p-2 border rounded"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm text-red-600 font-medium mb-1">
                Upload Photograph (JPG/PNG, Max 5MB) *
              </label>
              <input
                type="file"
                name="photo"
                accept="image/png, image/jpeg"
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-center gap-6 mt-6">
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Register Now"}
              </button>
              <button
                type="reset"
                onClick={() =>
                  setFormData({
                    program: "",
                    fullName: "",
                    passingYear: "",
                    mobile: "",
                    email: "",
                    dob: "",
                    organization: "",
                    designation: "",
                    testimonial: "",
                    linkedin: "",
                    photo: null,
                  })
                }
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
                disabled={isSubmitting}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}