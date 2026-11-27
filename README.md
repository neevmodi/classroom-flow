# Classroom Flow

A clean, responsive learning planner for individuals, with a separate university workspace trial to demonstrate how a future multi-user version could work.

## What’s included

- Personal learning space that works immediately without an account
- Create tasks, set target dates, mark work complete, and retain progress in the browser
- University workspace trial with student and teacher dashboards (sample data only)
- Separate student and teacher interfaces (use the role switch in the app)
- Assignment cards with progress, status, and due dates
- Teacher assignment creation flow
- Student task overview, upcoming work, streak, score, and leaderboard
- Teacher activity feed, class completion data, student overview, and review queue
- Responsive browser UI with no backend required for the demo

## What works today

The personal learning space is local-first: tasks and completion progress are saved in the browser on the device being used. This means individuals can begin using it as soon as it is deployed, with no sign-up or database required.

Because it uses browser storage, clearing browser data or changing devices will not carry the plan across. Cloud accounts and sync are a future enhancement.

## University trial vs. real college privacy

The university workspace is a front-end demonstration. It does **not** authenticate people or protect real student data yet. Do not collect or upload real student information in this version.

To make it safe for real colleges, connect the app to Supabase (or Firebase) and add:

1. Verified sign-in using each college's allowed email domain or invitations.
2. An `organizations` table and an `organization_id` on every profile, class, assignment, submission, and resource.
3. Row-level security rules that only return data whose `organization_id` matches the signed-in person's organization.
4. Role checks so teachers can only manage classes they teach and students can only see their own submissions.
5. A privacy policy, secure file storage, audit logs, and consent/retention requirements appropriate to the college's region.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Deploy to Netlify

1. Push this folder to a GitHub repository.
2. In Netlify, choose **Add new site** → **Import an existing project**.
3. Select your GitHub repository.
4. Set build command to `npm run build` and publish directory to `dist`.
5. Deploy.

## Future ideas

- Connect Supabase Auth and row-level security for truly private college workspaces.
- Store classes, submissions, files, and feedback in a database, scoped by organization.
- Add teacher comments, attachments, notifications, and real-time leaderboard updates.

## Stack

Vanilla JavaScript, CSS, and [Vite](https://vite.dev/).

## Netlify website
https://classroom-flow.netlify.app/
