# :memo: UbuntuBlog

> Write once, share everywhere.

UbuntuBlog is a multi-tenant headless blog platform built with React and Express. It allows developers to create, manage, and distribute blog content across multiple client websites from a single API.

![Frontend CI](https://github.com/Luka2Lkay/UbuntuBlog/actions/workflows/frontend-ci.yml/badge.svg)
![Backend CI](https://github.com/Luka2Lkay/UbuntuBlog/actions/workflows/backend-ci.yml/badge.svg)

## **Version**: `0.0.0`

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

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Redux Toolkit
- ^Clerk Auth
- Tip Tap

### Backend

- Express
- Mongoose
- Clerk Auth

---

## Project Structure

```text
{{TREE}}
```

---