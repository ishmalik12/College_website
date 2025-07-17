import { useState } from "react";

export default function TeacherApplicationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    jobProfile: "",
    fullName: "",
    mobile: "",
    email: "",
    gender: "",
    dob: "",
    city: "",
    ug: "",
    pg: "",
    specialization: "",
    otherQual: "",
    org: "",
    designation: "",
    currentSalary: "",
    expectedSalary: "",
    academicExp: "",
    industryExp: "",
    phdStatus: "",
    ugcNet: "",
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
          Teaching Positions
        </h2>
    
        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="jobProfile" required onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Select job/post/profile you are applying for</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Lecturer">Lecturer</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="fullName" required placeholder="Full Name" onChange={handleChange} className="p-2 border rounded" />
            <input name="mobile" required placeholder="Mobile" onChange={handleChange} className="p-2 border rounded" />
            <input name="email" required placeholder="Email" onChange={handleChange} className="p-2 border rounded" />
            <select name="gender" required onChange={handleChange} className="p-2 border rounded">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input type="date" name="dob" onChange={handleChange} className="p-2 border rounded" />
            <input name="city" placeholder="Your Current City" onChange={handleChange} className="p-2 border rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="ug" required onChange={handleChange} className="p-2 border rounded">
              <option value="">UG Qualification</option>
              <option value="B.Sc">B.Sc</option>
              <option value="B.Tech">B.Tech</option>
            </select>
            <select name="pg" required onChange={handleChange} className="p-2 border rounded">
              <option value="">PG Qualification</option>
              <option value="M.Sc">M.Sc</option>
              <option value="M.Tech">M.Tech</option>
            </select>
          </div>

          <input name="specialization" required placeholder="Area of Specialization/Key Skills" onChange={handleChange} className="w-full p-2 border rounded" />

          <input name="otherQual" placeholder="Any other qualification" onChange={handleChange} className="w-full p-2 border rounded" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="org" placeholder="Current organization's name" onChange={handleChange} className="p-2 border rounded" />
            <input name="designation" placeholder="Designation in current organization" onChange={handleChange} className="p-2 border rounded" />
            
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <select name="academicExp" required onChange={handleChange} className="p-2 border rounded">
              <option value="">Academic Experience</option>
              <option value="0-2 years">0-2 years</option>
              <option value="2-5 years">2-5 years</option>
            </select>
            <select name="phdStatus" onChange={handleChange} className="p-2 border rounded">
              <option value="">PhD Status</option>
              <option value="Completed">Completed</option>
              <option value="Pursuing">Pursuing</option>
            </select>
            <select name="ugcNet" onChange={handleChange} className="p-2 border rounded">
              <option value="">UGC NET Qualified?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-red-600">
              Select your updated resume/CV in PDF format (Size less than 5MB)
            </label>
            <input type="file" accept="application/pdf" name="resume" onChange={handleChange} className="w-full p-2 border rounded" />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
              Close
            </button>
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
