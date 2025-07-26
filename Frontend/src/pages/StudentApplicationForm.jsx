import { useState } from "react";

export default function StudentApplicationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    city: "",
    course: "",
    branch: "",
    qualification12: "",
    percentage12: "",
    entranceExam: "",
    fatherName: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with your submission logic
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-red-600 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Apply as a Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="fullName" required placeholder="Full Name" onChange={handleChange} className="p-2 border rounded" />
            <input name="email" required placeholder="Email" onChange={handleChange} className="p-2 border rounded" />
            <input name="mobile" required placeholder="Mobile Number" onChange={handleChange} className="p-2 border rounded" />
         
            <input type="date" name="dob" required onChange={handleChange} className="p-2 border rounded" />
            <input name="city" required placeholder="City" onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="course" required onChange={handleChange} className="p-2 border rounded">
              <option value="">Select Course</option>
              <option value="Bachelor of Arts (B.A.)">Bachelor of Arts (B.A.)</option>
              <option value="Bachelor of Commerce (B.Com.)">Bachelor of Commerce (B.Com.)</option>
              <option value="Bachelor of Science (B.Sc.)">Bachelor of Science (B.Sc.) Maths</option>
                            <option value="Bachelor of Science (B.Sc.)">Bachelor of Science (B.Sc.) biology</option>

              
            
            </select>
            {/* <input name="branch" required placeholder="Preferred Branch / Stream" onChange={handleChange} className="p-2 border rounded" /> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="qualification12" required placeholder="12th Board Name" onChange={handleChange} className="p-2 border rounded" />
            <input name="percentage12" required type="number" step="0.01" placeholder="12th % Marks" onChange={handleChange} className="p-2 border rounded" />
            <input name="entranceExam" placeholder="Entrance Exam Rank / Score (if any)" onChange={handleChange} className="p-2 border rounded" />
          </div>

          <input name="fatherName" required placeholder="Father's Name" onChange={handleChange} className="w-full p-2 border rounded" />

          

          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
              Close
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
