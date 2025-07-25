
  

# OTA Coding Assignment

  

A full-stack job posting and moderation platform built with Express, Prisma, and Vue.js.

### User Story 1
As a job board moderator I would like to notified every time someone posts a job for a first time,  so I can properly flag it

#### Conditions of Satisfaction:
- [x] Every time someone posts a job for a first time (based on email address), job board  moderator should be notified about it   
- [x] Notification should contain title and description of submission, as well as links to approve  (publish) or mark it as a spam.

### User Story 2
As a Job Seeker, I would like to go to a web page and see a list of external job offers from a  specific URL combined with posts directly posted on the job board.

#### Conditions of Satisfaction:
- [x] External API Integration: The job board should automatically fetch job listings from this [URL](https://mrge-group-gmbh.jobs.personio.de/xml )  
- [ ] Data Parsing and Display: Parse the data from the external source and display it in a user-friendly format on the job board. Each listing should at least include the job title,  description, and a link to the full job posting.

### Expectations
● Your implementation should meet the conditions of satisfaction for each user story.  
● Be prepared to share your screen and walk us through your code during the evaluation session.   
● Be ready to explain your choice of packages, architectural / design decisions, and any  challenges you encountered.  
● Have a clear understanding of your code to confidently walk us through your  implementation.

  

### Project Structure

  

-  `backend/` – Node.js Express API, Prisma ORM, authentication, job management

-  `frontend/` – Vue.js SPA, Vite, job browsing and posting UI

-  `docker-compose.yml` – Container orchestration for local development

  

### Features

  

- User authentication and role-based access (Moderator, User)

- Job posting, approval, and spam marking

- Notifications for moderators

- RESTful API with Prisma ORM

- Modern Vue.js frontend

  

### Getting Started

  

#### Prerequisites

  

- Node.js (v18+)

- Docker & Docker Compose

  

#### Local Development

  

1. Clone the repo:

```

git clone https://github.com/allanshelly/ota-coding-assignment.git

cd ota-coding-assignment

```

  

2. Start services:

```

docker-compose up --build

```

  

3. Backend: Runs on `http://localhost:3000`

4. Frontend: Runs on `http://localhost:5173`

  

### Manual Setup

  

- Install backend dependencies: `cd backend && npm install`

- Install frontend dependencies: `cd frontend && npm install`

- Set up environment variables as needed

  

## API Endpoints

  

-  `POST /auth/register` – Register a user(Jobseeker or Moderator)

-  `POST /auth/login` – Login as a user(Jobseeker or Moderator)

-  `GET /jobs` – List jobs (filter by status, role-based access)

-  `POST /jobs` – Create a job

-  `PATCH /jobs/:id/approve` – Approve a job (Moderator only)

-  `PATCH /jobs/:id/spam` – Mark job as spam (Moderator only)

-  `PATCH /jobs/notifications/:id/read` – Mark a notification as read (Moderator only)

-  `PATCH /jobs/notifications/read-all` – Mark all notification as read (Moderator only)

-  `GET /jobs/notifications` – Fetch all notification (Moderator only)

  

## Technologies

  

- Express.js, Prisma, SQLite

- Vue.js, Vite

- Docker

  

## License

  

MIT