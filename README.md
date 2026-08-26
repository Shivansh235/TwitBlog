# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# TwitBlog

TwitBlog is a modern blog and publishing platform built with React, Vite, and Appwrite. It allows users to create accounts, write blog posts, upload featured images, and publish content in a clean and minimal interface.

## Overview

TwitBlog solves the problem of managing a blog without setting up a heavy backend or a complicated CMS. It provides a simple content publishing workflow for creators, writers, and small teams who want to publish articles quickly and efficiently.

Instead of building a backend from scratch, the project uses Appwrite for:
- Authentication
- Database storage
- File uploads / media management

## Problem It Solves

Many small creators and teams need a lightweight blogging platform that:
- is easy to use
- supports rich content writing
- allows image uploads
- provides user authentication
- avoids complex server setup
- supports quick publishing workflows

TwitBlog addresses this by combining a modern frontend with Appwrite backend services.

## Key Features

- User signup and login
- Secure session-based authentication using Appwrite
- Create, edit, and delete blog posts
- Post listing page
- Individual blog post view
- Featured image upload support
- Rich text editing support with TinyMCE
- Light/dark theme toggle
- Responsive UI for desktop and mobile
- React Router-based navigation

## Tech Stack

- React
- Vite
- JavaScript
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Appwrite
- TinyMCE Editor

## Project Structure

```bash
twitblog/
├── src/
│   ├── appwrite/
│   ├── components/
│   ├── conf/
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.sample
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
├── README.md
└── public/

```

#### Imp Credentails - 

VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key


#### BAAS Appwrite 

You need to configure these services in Appwrite:

# Create a new Appwrite project
# Enable Authentication
# Create a database
# Create a collection for blog posts
# Add required attributes such as:
- title
- content
- featuredImg
- status
- userId
# Create a storage bucket for uploading images
# Copy the project and bucket IDs into your .env
