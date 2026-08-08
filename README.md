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

├──backend/
|   ├──.env/
|   ├──.env.example/
|   ├──.gitignore/
|   ├──eslint.config.mjs/
|   ├──package-lock.json/
|   ├──package.json/
|   ├──server.js/
|   └──src/
|      ├──config/
|      |   └──db_config.js/
|      ├──controllers/
|      |   ├──post_controller.js/
|      |   ├──site_controller.js/
|      |   └──webhook_controller.js/
|      ├──helpers/
|      |   └──message_helpers.js/
|      ├──middleware/
|      |   └──validation.js/
|      ├──models/
|      |   ├──post_model.js/
|      |   ├──site_model.js/
|      |   └──user_model.js/
|      └──routes/
|         ├──post_routes.js/
|         └──site_routes.js/
├──frontend/
|   ├──.env/
|   ├──.env.example/
|   ├──.gitignore/
|   ├──eslint.config.js/
|   ├──index.html/
|   ├──package-lock.json/
|   ├──package.json/
|   ├──src/
|   |   ├──App.css/
|   |   ├──App.tsx/
|   |   ├──components/
|   |   |   ├──confirmation_modal/
|   |   |   |   └──ConfirmationModal.tsx/
|   |   |   ├──header/
|   |   |   |   └──Header.tsx/
|   |   |   ├──postform/
|   |   |   |   └──PostForm.tsx/
|   |   |   ├──sidebar/
|   |   |   |   └──Sidebar.tsx/
|   |   |   ├──site_card/
|   |   |   |   └──SiteCard.tsx/
|   |   |   ├──siteform/
|   |   |   |   └──SiteForm.tsx/
|   |   |   ├──statistics_card/
|   |   |   |   └──StatisticsCard.tsx/
|   |   |   └──tiptap/
|   |   |      └──Tiptap.tsx/
|   |   ├──helpers/
|   |   |   └──messages_helper.ts/
|   |   ├──hooks/
|   |   |   └──redux_hooks.ts/
|   |   ├──index.css/
|   |   ├──interfaces/
|   |   |   ├──Post.ts/
|   |   |   └──Site.ts/
|   |   ├──main.tsx/
|   |   ├──pages/
|   |   |   ├──create_post/
|   |   |   |   └──CreatePost.tsx/
|   |   |   ├──create_site/
|   |   |   |   └──CreateSite.tsx/
|   |   |   ├──dashboard/
|   |   |   |   └──Dashboard.tsx/
|   |   |   ├──edit_site/
|   |   |   |   └──EditSite.tsx/
|   |   |   ├──home/
|   |   |   |   └──Home.tsx/
|   |   |   ├──layout/
|   |   |   |   └──Layout.tsx/
|   |   |   ├──posts/
|   |   |   |   └──Posts.tsx/
|   |   |   ├──signin/
|   |   |   |   └──SigninPage.tsx/
|   |   |   ├──signup/
|   |   |   |   └──SignupPage.tsx/
|   |   |   └──site_details/
|   |   |      └──SiteDetails.tsx/
|   |   ├──services/
|   |   |   └──api.ts/
|   |   └──state/
|   |      ├──context/
|   |      |   ├──post/
|   |      |   |   ├──PostContext.tsx/
|   |      |   |   └──PostProvider.tsx/
|   |      |   └──site/
|   |      |      ├──SiteContext.tsx/
|   |      |      ├──SiteProvider.tsx/
|   |      |      └──useSiteContext.tsx/
|   |      └──redux/
|   |         ├──reducers/
|   |         |   ├──post_slice.ts/
|   |         |   └──site_slice.ts/
|   |         ├──store.ts/
|   |         └──thunks/
|   |            ├──post_thunk.ts/
|   |            └──site_thunk.ts/
|   ├──tsconfig.app.json/
|   ├──tsconfig.json/
|   ├──tsconfig.node.json/
|   └──vite.config.ts/
├──README.md/
├──README.template.md/
└──scripts/
   ├──data/
   |   └──technologies.json/
   └──generate_readme.js/


---