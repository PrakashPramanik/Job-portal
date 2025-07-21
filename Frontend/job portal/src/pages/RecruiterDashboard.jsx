import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; 
import MyNavbar from "../components/Navbar";
import Footer from "./Footer";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/job?recruiterId=${user._id}`);
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchJobs();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/job/${id}`, { withCredentials: true });
      fetchJobs();
    } catch (err) {
      alert("Unauthorized or error deleting job");
    }
  };

  const handleEdit = (jobId) => {
    window.location.href = `/edit-job/${jobId}`;
  };

  return (
    <>
      <MyNavbar />
      <div className="container mt-5" ><br /><br />
        <h2 className="mb-4 text-center">📋 Your Job Listings</h2>
        <div className="row">
          {jobs.length === 0 ? (
            <p className="text-center text-muted">No job postings found.</p>
          ) : (
            jobs.map((job) => (
              <div className="col-md-6 col-lg-4 mb-4" key={job._id}>
                <div className="card h-100 shadow-sm border-0 job-card">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary fw-bold">{job.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{job.type}</h6>
                    <p className="card-text small">{job.description?.slice(0, 100)}...</p>

                    <ul className="list-group list-group-flush mt-3 mb-3 small">
                      <li className="list-group-item"><strong>Company:</strong> {job.companyName || "Not specified"}</li>
                      <li className="list-group-item"><strong>Location:</strong> {job.location}</li>
                      <li className="list-group-item"><strong>Salary:</strong> ₹{job.salaryRange}</li>
                      <li className="list-group-item"><strong>Posted by:</strong> {job.createdBy?.fullName || "Unknown"}</li>
                    </ul>

                    <div className="mt-auto d-flex justify-content-between">
                      <button onClick={() => handleEdit(job._id)} className="btn btn-outline-primary btn-sm px-3">
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(job._id)} className="btn btn-outline-danger btn-sm px-3">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>

      <style jsx="true">{`
        .job-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s;
        }
        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
}
