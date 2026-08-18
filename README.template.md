# :memo: UbuntuBlog

> Write once, share everywhere.

UbuntuBlog is a multi-tenant headless blog platform built with React and Express. It allows developers to create, manage, and distribute blog content across multiple client websites from a single API.

![Frontend CI](https://github.com/Luka2Lkay/UbuntuBlog/actions/workflows/frontend-ci.yml/badge.svg)
![Backend CI](https://github.com/Luka2Lkay/UbuntuBlog/actions/workflows/backend-ci.yml/badge.svg)

## **Version**: `{{VERSION}}`

---

## :rocket: Overview

As a developer working with multiple local businesses, keeping websites updated with fresh content is a challenge—clients often lack the time or expertise to write blog posts.

UbuntuBlog solves this by giving you a centralized system to:

- :pencil2: Write blog content yourself
- :earth_africa: Distribute it across multiple websites
- :zap: Improve SEO and engagement for your clients

---

## :bulb: Key Concept

UbuntuBlog follows a headless CMS approach

Admin Dashboard (React)

:arrow_down:

Express API

:arrow_down:

Client Websites (fetch & display content)

Each client website fetches only its own content using the API.

---

## :star: Features

- :books: Blog post creation and management
- :earth_africa: multiple client websites
- :paperclip: API-based content delivery
- :hammer: Easy integration into any frontend
- :file_folder Categories and tags
- :date: Draft and publish system (planned)
- :mag_right: SEO-friendly structure

## Tech Stack

### Frontend

{{FRONTEND_STACK}}

### Backend

{{BACKEND_STACK}}

---

## Project Structure

```text
{{TREE}}
```

---

## :nut_and_bolt: Getting Started

### Prerequisites

Before running the application, make sure your system date, time, and time zone are configured correctly. Clerk authentication relies on time-sensitive JWTs, so an incorrect system clock can cause authentication failures.

1. Clone the repo

```
git clone git@github.com:Luka2Lkay/UbuntuBlog.git
cd ubuntublog

```

2. Install dependencies

```
cd backend && npm install
cd frontend && npm install
```

3. Run the app

```
# backend
npm run dev

# frontend
npm run dev

```

---

## Troubleshooting

### Clerk returns `401 Unauthorized`

If Clerk authentication works inconsistently, especially after refreshing the page, check your computer's **date, time, and time zone**.

Clerk uses time-sensitive JWTs. If your system clock is incorrect, JWT verification can fail because the token may appear to be expired or not yet valid.

#### Windows

Go to:

**Settings → Time & language → Date & time**

Make sure:

- **Set time automatically** is enabled.
- **Set time zone automatically** is enabled.
- Your date, time, and time zone are correct.
- Click **Sync now** to synchronize your clock.

Then restart the development server and reload the application.

> **Important:** An incorrect system clock can cause Clerk authentication to return `401 Unauthorized` even when the Clerk configuration, token generation, and authentication code are correct.

---

## :ok_hand: Contribution

Small team workflow:

- Create branches from `develop`
- Never push directly to `main`
- Open pull requests into `develop`
- Merge `develop` -> `main` for releases

## :page_facing_up: License

MIT
