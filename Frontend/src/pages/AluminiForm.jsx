import { useState } from "react";
import AlumniBanner from "../assets/slideshow3.jpeg";
import HeroSection from "./HeroSection";
import AlumniCarousel from "./AlumniCarousel";




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
    photo: null,
  });
  const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();
  for (const key in formData) {
    form.append(key, formData[key]);
  }

  try {
    const response = await fetch("http://localhost:5000/api/alumni-applications/submit", {
      method: "POST",
      body: form,
    });

    const data = await response.json();
    if (data.success) {
      alert("Alumni form submitted successfully!");
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
        photo: null,
      });
    } else {
      alert("Failed to submit. " + (data.message || "Please try again."));
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong. Please try again later.");
  }
};


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <>
     <HeroSection
       title="ALUMNI"
       description=""
       backgroundImage={AlumniBanner}
     />
         
    <AlumniCarousel />
    
      <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-20">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-red-700">
            Alumni Registration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Faculty & Program */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
           
              <select
                name="program"
                required
                onChange={handleChange}
                className="p-2 border rounded"
              >
                <option value="">Select Program *</option>
              <option value="Bachelor of Arts (B.A.)">Bachelor of Arts (B.A.)</option>
              <option value="Bachelor of Commerce (B.Com.)">Bachelor of Commerce (B.Com.)</option>
              <option value="Bachelor of Science (B.Sc.)">Bachelor of Science (B.Sc.)</option>
              <option value="B.Sc. Maths">B.Sc. Maths</option>
              <option value="B.Sc. Biology">B.Sc. Biology</option>
              </select>
            </div>

            {/* Name, Gender, Passing Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="fullName"
                required
                placeholder="Full Name *"
                onChange={handleChange}
                className="p-2 border rounded"
              />
             
              <input
                name="passingYear"
                required
                type="number"
                placeholder="Year of Passing *"
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            {/* Mobile, Email, DOB */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="mobile"
                required
                placeholder="Mobile *"
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                name="email"
                required
                type="email"
                placeholder="Email *"
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                name="dob"
                type="date"
                placeholder="Date of Birth"
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            {/* Organization & Designation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="organization"
                required
                placeholder="Current Organization's Name *"
                onChange={handleChange}
                className="p-2 border rounded"
              />
              <input
                name="designation"
                required
                placeholder="Designation in Current Org. *"
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>

            {/* Job Description*/}
            <div>
  <label className="block text-sm text-red-700 font-semibold mb-1">
    Job Description
  </label>
  <textarea
    name="testimonial"
    rows="4"
    placeholder="Your Job Description here..."
    onChange={handleChange}
    className="w-full p-2 border rounded"
  />
</div>


            {/* Photo Upload */}
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
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
              >
                Register Now
              </button>
              <button
                type="reset"
                onClick={() =>
                  setFormData({
                    faculty: "",
                    program: "",
                    fullName: "",
                    gender: "",
                    passingYear: "",
                    mobile: "",
                    email: "",
                    dob: "",
                    organization: "",
                    designation: "",
                    testimonial: "",
                    photo: null,
                  })
                }
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
