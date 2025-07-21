import { Job } from "../model/Job.js";



export const createJob = async (req, res) => {
  try {
    const { title, description, location, type, salaryRange, companyName } = req.body;
    // console.log(title, description, location, type, salaryRange)

    if (!title || !description || !location || !type || !salaryRange || !companyName) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'Unauthorized. User ID missing.' });
    }

    const job = new Job({
      title,
      description,
      location,
      type,
      salaryRange,
      companyName,
      createdBy: req.user.userId, 
    });


    await job.save();

    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.error('Create Job Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// backend/controller/jobController.js
export const getAllJobs = async (req, res) => {
  try {
    const { recruiterId } = req.query;
    let jobs;

    if (recruiterId) {
      // Only jobs created by that recruiter
      jobs = await Job.find({ createdBy: recruiterId }).populate('createdBy', 'fullName');
    } else {
      // All jobs (e.g., for students)
      jobs = await Job.find().populate('createdBy', 'fullName');
    }

    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
};






// export const getAllJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find().populate("createdBy", "fullName email");
//     // console.log("Job ID param:", req.params.id);



//     // console.log(jobs)
//     res.json(jobs);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching jobs" });
//   }
// };

// controllers/jobController.js
export const updateJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updates = req.body;

    const updatedJob = await Job.findByIdAndUpdate(jobId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Failed to update job" });
  }
};




// import Job from "../models/Job.js";

export const deleteJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.deleteOne(); // or: await Job.findByIdAndDelete(jobId);
    res.status(200).json({ message: "Job deleted successfully" });

  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error while deleting job" });
  }
};








export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate('createdBy', 'fullName email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

