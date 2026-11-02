# Luntian – Tele-nutrition Platform (Next.js)

## Run
1. Install Node.js 18.17+ (LTS) from nodejs.org
2. In this folder: `npm install`
3. `npm run dev` then open http://localhost:3000

Production: `npm run build && npm start`. Deploy: push to GitHub and import on vercel.com.

Demo logins: patient@demo.ph / patient1234 · nutritionist@demo.ph / nutri1234

## Structure
- app/layout.js, app/page.js – Next.js App Router shell
- public/js/data.js – Data layer (users, meals, appointments, storage)
- public/js/domain.js – Domain layer (RDA, eNCPT rules, appointment rules)
- public/js/ui.js – UI layer (dashboards, meals, reports, appointments, video)
