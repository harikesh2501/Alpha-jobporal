# Full-Stack Job Board Application (MySQL Edition)

This is a complete, working job board application built with React for the frontend and a Node.js/Express backend, using a **MySQL** database with Sequelize.

## Features

- **Admin Panel**: Secure login for administrators.
  - Create new job postings.
  - View all submitted applications across all jobs.
  - Accept or Reject applications.
- **Public Job Board**:
  - View a list of all available jobs.
  - Click to view detailed information about a specific job.
  - Apply for jobs with a simple form.
- **Application Logic**:
  - Resume uploads (PDF only), saved locally.
  - **Constraints**:
    - An applicant can only apply once per job.
    - A job cannot have more than 10 active applications.
    - An applicant cannot submit more than 5 applications in a 24-hour period (rejected applications do not count towards this limit).

## Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: **MySQL** with Sequelize ORM
- **File Uploads**: Multer
- **Environment**: dotenv, nodemon, concurrently

---

##  Prerequisites

- Node.js and npm (or yarn)
- **MySQL Server** running locally.

---

## 🚀 Setup & Running the Application

### 1. Initial Setup

Clone the repository and install all dependencies for the root, backend, and frontend projects with one command.

```bash
git clone <your-repo-url> job-board-app
cd job-board-app
npm run install-all