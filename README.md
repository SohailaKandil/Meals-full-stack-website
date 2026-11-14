# Recipe Sharing Website

A full-stack website for discovering and sharing recipes. Users can create accounts, browse published recipes, and submit their own recipes. Administrators review submissions and decide which recipes appear on the website.


![Recipe Sharing Website](screenshots/home.png)


## Project Overview

The website has two main roles:

- **User:** browses recipes and submits recipes for review.
- **Admin:** manages the website’s recipe submissions and approves recipes for publication.

A submitted recipe is reviewed before it becomes publicly visible. This helps keep the published recipe collection organized and appropriate for visitors.

## Features

### User features

- Create an account and log in securely.
- Browse and read published recipes.
- View recipe details, such as ingredients and preparation steps.
- Submit a recipe with details such as:
  - Recipe name
  - Description
  - Ingredients
  - Preparation instructions
  - Category
  - Image, when available
- See whether a submitted recipe is awaiting review, approved, or rejected.

### Admin features

- Access admin features using an administrator account.
- View recipes submitted by users.
- Review recipe details before making a decision.
- Approve a recipe so it can be published.
- Reject a recipe that should not be published.
- Manage the collection of published recipes.

## How Recipe Approval Works

1. A user signs in and fills out the recipe submission form.
2. The submitted recipe is marked **Pending**.
3. An administrator reviews the recipe.
4. The administrator either:
   - **Approves** it, making it visible in the public recipe collection, or
   - **Rejects** it, keeping it off the public recipe collection.
5. Users can check the status of their submissions.

Only approved recipes are shown as published recipes to general visitors.

## Typical User Journey

1. Open the website and browse published recipes.
2. Create an account or log in.
3. Open the recipe submission page.
4. Enter the recipe information and submit it.
5. Wait for an administrator to review it.
6. Check the submission status later.

## Typical Admin Journey

1. Log in using an administrator account.
2. Open the recipe review area.
3. Select a pending submission.
4. Review the ingredients, instructions, and other details.
5. Approve or reject the submission.

## Technology

- **Frontend:** React and Vite
- **Backend:** Laravel and PHP
- **API:** Laravel REST API
- **Authentication:** Laravel Sanctum
- **Database:** SQLite.

- 
## Deployment

The project is hosted on **Alwaysdata**.

- **Frontend:** React.js (Vite)
- **Backend:** Laravel (PHP)
- **Database:** SQLite
- **Hosting:** Alwaysdata

The React application is built and deployed inside Laravel's `public` directory. Laravel handles API requests, user authentication, and database operations.

**Live Demo:** [Meals App](https://sohaila-kandil.alwaysdata.net/)
