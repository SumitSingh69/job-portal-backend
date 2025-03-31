# JobConnect API Documentation

## Introduction

Welcome to the JobConnect API documentation. This guide provides comprehensive information about our backend services that power the JobConnect platform. The API is designed to be intuitive, well-structured, and scalable to support the needs of our recruitment platform.

## Recent Updates (March 14, 2023)
- Ongoing development and improvements to the JobConnect API.
- Added a new `/welcome` endpoint that returns a JSON response with a welcome message.
- Implemented logging functionality to capture request metadata, enhancing monitoring and debugging capabilities.

### Controller Updates
- Enhanced `job.controller.js` with improved error handling and validation.
- Added `job-seeker.controller.js` for managing job seeker specific operations.
- Optimized database queries for better performance.
- Updated user authentication routes in `user.routes.js` for improved security.
- Updated dependencies in `package.json` for better performance and security.

### Model Updates
- Updated `jobs.Model.js` with improved schema structure.
- Added proper indexing for faster job search operations.
- Enhanced relationship between jobs and companies.

## Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/company/jobconnect-api.git
   cd jobconnect-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your environment**
   ```bash
   cp .env.example .env
   # Edit the .env file with your local settings
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Verify the installation**
   The API should now be running at `http://localhost:4000`.

## System Architecture

### Directory Structure

```
jobconnect-api/
├── controller/         # API logic handlers
├── models/             # Database schemas
├── routes/             # API endpoint definitions
├── middleware/         # Request processors
├── enums/              # Constants and lookup values
├── config/             # Configuration files
├── utils/              # Helper functions
├── uploads/            # File storage (not tracked in git)
└── server.js           # Application entry point
```

### Key Components

- **Controllers**: Handle business logic for each API endpoint.
- **Models**: Define database structure and relationships.
- **Routes**: Map HTTP requests to controller functions.
- **Middleware**: Process requests before they reach controllers.

## Data Models

### User

The User model represents all platform users with role-based permissions.

| Field | Description | Example |
|-------|-------------|---------|
| `name` | User's full name | "Jane Smith" |
| `email` | User's email address (unique) | "jane@example.com" |
| `password` | Securely hashed password | [encrypted] |
| `role` | User type | "jobseeker", "recruiter", or "admin" |
| `avatar` | Profile picture | "uploads/avatars/jane-12345.jpg" |
| `resume` | Resume file (jobseekers only) | "uploads/resumes/jane-resume.pdf" |
| `skills` | Professional skills (jobseekers) | ["JavaScript", "React", "Node.js"] |
| `applications` | Job applications (jobseekers) | [References to Application IDs] |
| `savedJobs` | Bookmarked jobs (jobseekers) | [References to Job IDs] |
| `company` | Associated company (recruiters) | Reference to Company ID |

### Company

The Company model stores information about organizations posting jobs.

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Company name | "Acme Corporation" |
| `description` | Company overview | "Leading provider of..." |
| `logo` | Company logo | "uploads/logos/acme-logo.png" |
| `website` | Company website | "https://acme.example.com" |
| `industry` | Business sector | "Technology" |
| `location` | Headquarters location | "San Francisco, CA" |
| `employees` | Company staff | [References to User IDs] |

### Job

The Job model represents available positions.

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Position title | "Senior Developer" |
| `description` | Job details | "We are seeking a..." |
| `requirements` | Necessary qualifications | ["5+ years experience", "Bachelor's degree"] |
| `company` | Hiring organization | Reference to Company ID |
| `location` | Job location | "Remote" or "New York, NY" |
| `type` | Employment type | "Full-time", "Contract", etc. |
| `experience` | Required experience | "Mid-level" |
| `salary` | Compensation range | `{ min: 80000, max: 120000 }` |
| `skills` | Required skills | ["Python", "Django", "AWS"] |
| `applications` | Submitted applications | [References to Application IDs] |
| `postedBy` | Creator of listing | Reference to User ID |
| `isActive` | Listing status | `true` or `false` |

### Application

The Application model tracks job applications.

| Field | Description | Example |
|-------|-------------|---------|
| `job` | Position applied for | Reference to Job ID |
| `applicant` | Person applying | Reference to User ID |
| `resume` | Submitted resume | "uploads/resumes/application-12345.pdf" |
| `coverLetter` | Application letter | "I am writing to apply..." |
| `status` | Application state | "pending", "reviewed", "rejected", "accepted" |
| `appliedAt` | Submission date | "2025-03-01T14:30:00Z" |

## API Endpoints

### Authentication

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Create new account | None |
| POST | `/api/auth/login` | Sign in | None |
| POST | `/api/auth/refresh` | Renew access token | None |
| GET | `/api/auth/profile` | Get user profile | Any |
| PUT | `/api/auth/profile` | Update profile | Any |

### Jobs

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|--------------|
| GET | `/api/jobs` | List all jobs | None |
| GET | `/api/jobs/:id` | Get job details | None |
| POST | `/api/jobs` | Create job listing | Recruiter |
| PUT | `/api/jobs/:id` | Update job listing | Recruiter (owner) |
| DELETE | `/api/jobs/:id` | Remove job listing | Recruiter (owner) |
| GET | `/api/jobs/search` | Search jobs | None |
| GET | `/api/jobs/company/:id` | Company jobs | None |
| GET | `/api/jobs/recruiter/:id` | Recruiter's jobs | None |

### Applications

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|--------------|
| POST | `/api/applications` | Apply for job | Jobseeker |
| GET | `/api/applications/:id` | View application | Jobseeker (applicant) or Recruiter (job owner) |
| GET | `/api/applications/user` | List my applications | Jobseeker |
| GET | `/api/applications/job/:jobId` | View job applicants | Recruiter (job owner) |
| PATCH | `/api/applications/:id/status` | Update status | Recruiter (job owner) |
| DELETE | `/api/applications/:id` | Withdraw application | Jobseeker (applicant) |

### Companies

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|--------------|
| POST | `/api/companies` | Create company | Recruiter |
| GET | `/api/companies` | List all companies | None |
| GET | `/api/companies/:id` | Company details | None |
| PUT | `/api/companies/:id` | Update company | Recruiter (company member) |
| POST | `/api/companies/:id/logo` | Upload logo | Recruiter (company member) |
| GET | `/api/companies/:id/jobs` | Company job listings | None |

## Authentication System

### JWT Implementation

JobConnect uses JSON Web Tokens (JWT) for secure authentication:

1. **Access Token**: Short-lived token (24 hours) for API requests.
2. **Refresh Token**: Long-lived token (7 days) to get new access tokens.

### Using Authentication

1. Include the access token in the Authorization header:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

2. When the access token expires, use the refresh endpoint to get a new one.

## File Uploads

JobConnect supports file uploads for:
- User avatars (profile pictures)
- Resumes (PDF format)
- Company logos (image formats)

### Upload Endpoints

- **Avatar**: `POST /api/auth/profile/avatar`
- **Resume**: `POST /api/auth/profile/resume`
- **Company Logo**: `POST /api/companies/:id/logo`

## Response Formats

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "status": 400,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is already in use"
    }
  ]
}
```

## Environment Configuration

Create a `.env` file with these settings:

```
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/jobconnect

# JWT Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=7d

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5000000  # 5MB
```

## Data Flow Diagram (DFD)

Below is the Level 1 Data Flow Diagram (DFD) for the JobConnect platform:

[![](https://mermaid.ink/img/pako:eNqFVE1vozAQ_SuWT42UVuSLpWi1UhtOq-1l0-5hQw9OcAlqsJEx6naj_PcdM8YxSdD6YMbz3rPHw4MD3cqM05i-7eXHdseUJs9JKgiMl5qrm7WZX0eYwbluNrli1Y48NHq3-qw1L9cpNQsudLFlupCCYD6lr6gx44fMCwHM9tlDfvK8ALoCEEPVbtLjPMt3Lp7yUgOpjckTEyznJRzqiFxkVyv9LjdWCtE1oRlLxZnmQAAaxkbXo7xUmaNgfEFJ-J53FIx7lKEKH6rKVgjRvuviQKWrZlMWGohAx5h4qh71V8E_kGiiQRpeZqWZburT3fxSEPvvPZJHc2-m2YbVvH8EGKle37SPkZeH7kDazH52KcuKiYID5EIf90oDir8aXa_QnEu-3t5-82x7jlibXAjw3fi7nfZASvKIebtDP2n1_STO7beAgDM4It03QQzWNs3XOa8SW7dFnUHP8s6VZ3mcnZ-Iva5rJuLWRAOo750Bii26e5Gu2_Wp1bXr9ZnW0C4xOqa5KjIaa9XwMS25KplZ0oNRpRR-RiX4L4YwY-o9pak4ggbO_y1l2cmUbPIdjd_YvoZV014kKRhY-UQBH3G1lI3QNJ5O2i1ofKB_aDwLJnfzxXxxPw2jcD6ZTcf0E7LhXfRlfh9NgmAWRkEULo5j-rc9NABkcfwHNyyvqA?type=png)](https://mermaid.live/edit#pako:eNqFVE1vozAQ_SuWT42UVuSLpWi1UhtOq-1l0-5hQw9OcAlqsJEx6naj_PcdM8YxSdD6YMbz3rPHw4MD3cqM05i-7eXHdseUJs9JKgiMl5qrm7WZX0eYwbluNrli1Y48NHq3-qw1L9cpNQsudLFlupCCYD6lr6gx44fMCwHM9tlDfvK8ALoCEEPVbtLjPMt3Lp7yUgOpjckTEyznJRzqiFxkVyv9LjdWCtE1oRlLxZnmQAAaxkbXo7xUmaNgfEFJ-J53FIx7lKEKH6rKVgjRvuviQKWrZlMWGohAx5h4qh71V8E_kGiiQRpeZqWZburT3fxSEPvvPZJHc2-m2YbVvH8EGKle37SPkZeH7kDazH52KcuKiYID5EIf90oDir8aXa_QnEu-3t5-82x7jlibXAjw3fi7nfZASvKIebtDP2n1_STO7beAgDM4It03QQzWNs3XOa8SW7dFnUHP8s6VZ3mcnZ-Iva5rJuLWRAOo750Bii26e5Gu2_Wp1bXr9ZnW0C4xOqa5KjIaa9XwMS25KplZ0oNRpRR-RiX4L4YwY-o9pak4ggbO_y1l2cmUbPIdjd_YvoZV014kKRhY-UQBH3G1lI3QNJ5O2i1ofKB_aDwLJnfzxXxxPw2jcD6ZTcf0E7LhXfRlfh9NgmAWRkEULo5j-rc9NABkcfwHNyyvqA)

Below is a textual representation of the Level 1 Data Flow Diagram (DFD) for the JobConnect platform:

```
User
├── Authentication System
│   ├── Login
│   ├── Registration
│   └── Token Management
├── Job Management
│   ├── Create Job
│   ├── Update Job
│   └── Delete Job
├── Application Management
│   ├── Submit Application
│   ├── View Application
│   └── Update Application Status
└── Database
    ├── Users
    ├── Jobs
    ├── Companies
    └── Applications
```

### Description:
1. **User**: Interacts with the system via the frontend or API to perform actions like job search, application, or profile updates.
2. **Authentication System**: Handles user login, registration, and token management.
3. **Job Management**: Manages job postings, updates, and deletions by recruiters.
4. **Application Management**: Tracks job applications submitted by job seekers.
5. **Database**: Stores all data related to users, jobs, companies, and applications.

---

## Entity-Relationship (ER) Diagram

Below is the ER Diagram representing the relationships between entities in the JobConnect platform:

[![](https://mermaid.ink/img/pako:eNqdVE1z2yAQ_SsMp2bGycjxRxTd3PTU6bWXji9IrBUSxKoLcqLa_u8FyXZU47ppOMHu2327j4UNL1ACzzjQFyVKEtXSML--WyC23V5f44Yt6lqrQjiFhmVsyW2TV8rZJR9Adx663bIHrGph2g6Wg0ZTWuaQfVIrRlBQoxzQ1SHwAN7TfMW8i6vRviU_wXRcAQRVrbE9wkLsX6r1vKDWcIQOit70-7CsI2VKpmRkMqKCyAiVUDqy1sLaF6Q4B6GOc4i1cIJiLNhmyCiIRMvss9LanlrFW6-Rz4o1SK_LwEGwYkUvaG_cDSU5SP1xVSTYglQdyol8GkuMjC-QWz8SMaGRjd-2Z7L03Z42248DgD3TV5iNd_XklNPvbKpnJfjZKIIKjLuk8sX6D9xtfWbKXmsgBaYYuDB_gsL529ViqM__T0koMzw1kJ8HeXL0oyoMU3ZROP9szug5fGCXdQ0UT5j_adhXY9w_J39vLnAN9A2c_zoin3XCNYOmpHDQM4Bc7Bl2fMRLUpJnjhoY8QrIv15_5F31S-4e_RUuefgspKDn8FGEGH-BPxCrQxhhUz7ybCW09aemDlT7L_MIASOBHrAxjmfjuy4Fzzb8lWeTZHwznU1n97fzdD4dT25HvPXW-U16N71Px0kymadJOp_tRvxXR5p4z2z3G_N9uKg?type=png)](https://mermaid.live/edit#pako:eNqdVE1z2yAQ_SsMp2bGycjxRxTd3PTU6bWXji9IrBUSxKoLcqLa_u8FyXZU47ppOMHu2327j4UNL1ACzzjQFyVKEtXSML--WyC23V5f44Yt6lqrQjiFhmVsyW2TV8rZJR9Adx663bIHrGph2g6Wg0ZTWuaQfVIrRlBQoxzQ1SHwAN7TfMW8i6vRviU_wXRcAQRVrbE9wkLsX6r1vKDWcIQOit70-7CsI2VKpmRkMqKCyAiVUDqy1sLaF6Q4B6GOc4i1cIJiLNhmyCiIRMvss9LanlrFW6-Rz4o1SK_LwEGwYkUvaG_cDSU5SP1xVSTYglQdyol8GkuMjC-QWz8SMaGRjd-2Z7L03Z42248DgD3TV5iNd_XklNPvbKpnJfjZKIIKjLuk8sX6D9xtfWbKXmsgBaYYuDB_gsL529ViqM__T0koMzw1kJ8HeXL0oyoMU3ZROP9szug5fGCXdQ0UT5j_adhXY9w_J39vLnAN9A2c_zoin3XCNYOmpHDQM4Bc7Bl2fMRLUpJnjhoY8QrIv15_5F31S-4e_RUuefgspKDn8FGEGH-BPxCrQxhhUz7ybCW09aemDlT7L_MIASOBHrAxjmfjuy4Fzzb8lWeTZHwznU1n97fzdD4dT25HvPXW-U16N71Px0kymadJOp_tRvxXR5p4z2z3G_N9uKg)

Below is a textual representation of the ER Diagram for the JobConnect platform:

```
User
├── Attributes: id, name, email, password, role, avatar, resume, skills, applications, savedJobs, company
├── Relationships:
│   ├── Applies to → Job (many-to-many)
│   └── Belongs to → Company (one-to-one, if recruiter)

Company
├── Attributes: id, name, description, logo, website, industry, location, employees
├── Relationships:
│   ├── Posts → Job (one-to-many)
│   └── Employs → User (one-to-many)

Job
├── Attributes: id, title, description, requirements, company, location, type, experience, salary, skills, applications, postedBy, isActive
├── Relationships:
│   ├── Belongs to → Company (one-to-one)
│   └── Receives → Application (one-to-many)

Application
├── Attributes: id, job, applicant, resume, coverLetter, status, appliedAt
├── Relationships:
│   ├── Belongs to → Job (one-to-one)
│   └── Belongs to → User (one-to-one)
```

### Key Entities:
1. **User**:
   - Attributes: `id`, `name`, `email`, `password`, `role`, `avatar`, `resume`, `skills`, `applications`, `savedJobs`, `company`
   - Relationships:
     - Can apply to multiple **Jobs**.
     - Can belong to one **Company** (if recruiter).

2. **Company**:
   - Attributes: `id`, `name`, `description`, `logo`, `website`, `industry`, `location`, `employees`
   - Relationships:
     - Can post multiple **Jobs**.
     - Can have multiple **Users** as employees.

3. **Job**:
   - Attributes: `id`, `title`, `description`, `requirements`, `company`, `location`, `type`, `experience`, `salary`, `skills`, `applications`, `postedBy`, `isActive`
   - Relationships:
     - Belongs to one **Company**.
     - Can have multiple **Applications**.

4. **Application**:
   - Attributes: `id`, `job`, `applicant`, `resume`, `coverLetter`, `status`, `appliedAt`
   - Relationships:
     - Belongs to one **Job**.
     - Belongs to one **User** (applicant).

---

## Database Relationships

- A **Recruiter** belongs to one **Company**.
- A **Company** can have many **Jobs**.
- A **Jobseeker** can apply to many **Jobs**.
- A **Job** can receive many **Applications**.

## Development Guidelines

### Code Style

- Use ESLint for JavaScript linting.
- Follow the Airbnb JavaScript Style Guide.
- Use async/await for asynchronous operations.

### Git Workflow

1. Create feature branches from main: `feature/feature-name`.
2. Make pull requests for code review.
3. Squash commits when merging.

### Testing

Run tests with:
```bash
npm test
```

## Support Resources

- **Internal Documentation**: [Confluence Link]
- **Issue Tracker**: [JIRA Link]
- **API Support**: api-support@jobconnect.example.com

---

© 2025 JobConnect, Inc. All rights reserved.
