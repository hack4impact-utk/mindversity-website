# mindversity-website
MindVersity is a national peer network dedicated to bridge the gap between access to mental health resources and students of color on college campuses nationwide. See [their existing site](https://mindversityorg.wixsite.com/site) for more information. 

---

## Tech Stack
- React: Front-end
- Typescript: Back-end
- Next.js: Server-side rendering, API routes, file-based routing
- MongoDB: Database
- Contentful: Content Management System


## Base Dependencies

1. node v10+ (recommend getting nvm to manage versions)
2. yarn (package manager - similar to npm)


## Run the Site

1. Clone the repo.
2. Run `yarn` or `yarn install` to update dependencies.
3. Run `yarn dev` for development mode with hot-code reloading, error reporting, and more.
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note: Running `yarn build` then `yarn start` will start the application in production mode.


## Tools

1. Linear for issue tracking
2. Figma for mockups
3. Google Docs for formalities
4. Slack for chat
5. Postman for API testing
6. MongoDB Compass for database access
7. Contentful for content management access


## Code/PR Workflow

- Create a new branch in the format `[USERNAME]/[LINEAR-ISSUE-NUMBER]-[SHORT_DESCRIPTION]` by running `git checkout -b [BRANCH NAME]`
    - example branch name: `KFidan1/H4I-12-init-project`
    - This way the issues are closed on Linear when we merge the PR with that branch name
    - see [https://docs.linear.app/GitHub-GitLab-fa4b88df484343e4989538f066c729f3](https://docs.linear.app/GitHub-GitLab-fa4b88df484343e4989538f066c729f3)
- Be sure to lint, format, and type-check your code occasionally to catch errors by running `yarn lint`.
- Commit changes.
- Then push your branch by running `git push -u origin [BRANCH NAME]`. This pushes your branch to remote.
- Create a pull request (PR) on GitHub to merge your branch into `develop`. `main` will serve as production.
- In your PR, briefly describe the changes, then tag me (KFidan1) and Vishal (VishalAiely) to the PR. Others are welcome to comment and give feedback as well.

## Project Structure

- `components/`: Contains almost all of our front-end code. This is where we put our React components.
- `pages/`: Contains files that are associated with a route based on its file name, see Next.js' [docs](https://nextjs.org/docs/basic-features/pages).
- `public/`: Stores static files like images, see Next.js' [docs](https://nextjs.org/docs/basic-features/static-file-serving).
- `requests/`: Contains several files, one for each entity/model in our application. We define code for fetching data on the client-side here.
- `server/`: Contains almost all of our back-end code. This is where we put our Mongoose models and business logic.
- `utils/`: For code used across root directories.

