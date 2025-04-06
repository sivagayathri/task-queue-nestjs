# README.md

# Task Queue System with Rate Limiting (NestJS + MongoDB + Bull)

This is a **rate-limited task queue system** built using **NestJS**, **MongoDB**, and **Bull (Redis)**. It supports asynchronous task processing, queue status tracking, and retry mechanisms, making it ideal for scalable backend workflows like email sending, data processing, etc.

---

## 🚀 Features

- Task submission API
- Task storage in MongoDB
- Background job processing with Bull
- Rate-limiting using queue configuration
- Retry mechanism for failed jobs
- Status tracking: `pending`, `processing`, `completed`
- Queue monitoring (with optional UI like Bull Board)

---

## 🧱 Tech Stack

- **NestJS** - Backend Framework
- **MongoDB** - Task storage
- **Bull** - Job queue management
- **Redis** - Queue backend (required by Bull)
- **Docker** - (Optional) for local setup

---

## 📂 Folder Structure

```
.
├── src
│   ├── tasks
│   │   ├── task.schema.ts
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   ├── tasks.processor.ts
│   │   └── dto/create-task.dto.ts
│   ├── app.module.ts
│   └── main.ts
├── test
├── package.json
└── README.md
```

---

## 🧪 Sample API Endpoints

- `POST /tasks` – Add a task to the queue
- `GET /tasks/:id` – Check status of a specific task

---

## 🐳 Running Locally with Docker

1. Make sure Docker Desktop is installed and running.
2. Start services:
   ```bash
   docker-compose up
   ```

---

## 📌 TODO (Roadmap)

- [ ] Add Bull Board for queue monitoring
- [ ] Add authentication and rate limiting per user
- [ ] Add webhook/event system for task status change
- [ ] Integrate email or Slack notifications

---

## 👩‍💻 Author

**Siva Gayathri**

- [GitHub](https://github.com/sivagayathri)

---
