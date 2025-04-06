# task-queue-nestjs

This project is a rate-limited task queue API built using **NestJS**, **MongoDB**, **Bull (Redis)**, and **TypeScript**.

### ✨ Features:

- Submit tasks to a queue
- Store and track task status in MongoDB
- Process tasks in the background at a controlled rate
- Retry failed tasks
- Query task status counts (`pending`, `processing`, `completed`, `failed`)
- REST API endpoints using NestJS

---

## Getting Started

```bash
# install deps
npm install

# run in dev mode
npm run start:dev
```
