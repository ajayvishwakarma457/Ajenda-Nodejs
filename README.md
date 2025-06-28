# Agenda Node.js Job Scheduler

This project demonstrates a robust job scheduling system using **[Agenda](https://github.com/agenda/agenda)** in a **Node.js** environment. It supports one-time and recurring jobs like sending emails, SMS, fetching user data, and custom job execution with metrics exposure.

---

## 🚀 Features

- ⏱️ Schedule recurring and delayed jobs
- 📨 Send Email, SMS, and Welcome messages
- 🧠 Create high-priority and flaky jobs for testing
- 📊 Expose job queue metrics
- 📦 Modular folder structure with Agenda instance

---

## 📁 Folder Structure

Ajenda-Nodejs/
├── agenda/
│ ├── jobs/
│ │ ├── fetchUserDataJob.js
│ │ ├── flakyJob.js
│ │ ├── greetUserJob.js
│ │ ├── helloJob.js
│ │ ├── highPriorityJob.js
│ │ ├── recurringJobs.js
│ │ ├── sendEmailJob.js
│ │ ├── sendSMSJob.js
│ │ └── sendWelcomeEmailJob.js
│ └── agendaInstance.js # Configured Agenda scheduler instance
├── controllers/
│ └── metricsController.js # Exposes job metrics
├── routes/
│ ├── dashboardRoutes.js # Dashboard routes (optional monitoring)
│ └── jobRoutes.js # API routes to trigger or manage jobs
├── app.js # Main server entry
├── .gitignore
├── LICENSE
├── README.md
├── package.json
└── package-lock.json


---

## 🧪 Sample Jobs

- `sendEmailJob`: Send an email notification
- `sendSMSJob`: Trigger SMS
- `recurringJobs`: Set up repeated jobs (e.g., every 5 mins)
- `fetchUserDataJob`: Pull mock user data
- `highPriorityJob`: Test priority scheduling
- `flakyJob`: Simulate job failure for testing retries

---

## ⚙️ Setup Instructions

### 1. Prerequisites

- Node.js ≥ 14.x
- MongoDB instance (Agenda requires MongoDB)

---

### 2. Install & Run

```bash
git clone https://github.com/ajayvishwakarma457/Ajenda-Nodejs.git
cd Ajenda-Nodejs
npm install

Add your MongoDB URL to the environment:
  MONGO_URL=mongodb://localhost:27017/agenda-jobs

Start the server:
  node app.js

🧰 Tech Stack
  Node.js
  Agenda – Job scheduling
  MongoDB – Job storage and repeat tracking
  Express.js – Routing
  Custom Controllers & Routes

📈 Metrics Exposure
  The project includes a basic metrics controller to visualize:
  Job success/failure counts
  In-progress jobs
  Last run/next run data

🧑‍💻 Author
  **Author:** Ajay M Vishwakarma  
  **Email:** ajayvishwakarma457@gmail.com

📄 License
  This repository is licensed under the MIT License.
  See the LICENSE file for details.
