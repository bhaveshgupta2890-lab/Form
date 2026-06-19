# Form → your Gmail

A small React app: a visitor fills the form, and the message lands in your
Gmail inbox. No backend to run, no database, no WhatsApp.

It uses **Web3Forms** — a free service that emails you each submission. Your
"access key" is meant to live in the frontend (it can only send to the one
inbox tied to it), so a plain React app is all you need.

---

## 1. Run it locally

You need [Node.js](https://nodejs.org) installed (v18+). Then:

```bash
cd form-to-email
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173). You'll see the form in
**preview mode** — it fakes a send so you can watch the flow. No email goes out
yet.

## 2. Make it send to your Gmail

1. Go to https://web3forms.com and sign up **with the Gmail address** you want
   messages delivered to.
2. Copy your **Access Key**.
3. Open `src/App.jsx` and edit the three lines at the top:

   ```js
   const WEB3FORMS_ACCESS_KEY = "paste-your-key-here";
   const DELIVER_TO = "youremail@gmail.com"; // just shown in the UI
   const SITE_NAME = "Your Site";
   ```

Save. The form now sends for real — every submission arrives in your Gmail,
with the visitor's email set as **reply-to**, so you can reply straight from
your inbox.

## 3. Put it online

Build the static files:

```bash
npm run build
```

This creates a `dist/` folder. Drag that folder onto
[Netlify Drop](https://app.netlify.com/drop) or
[Vercel](https://vercel.com), or push the repo and connect it. Done — your
form is live.

---

## Cost at your volume

Web3Forms' free tier covers **250 submissions/month**. For hundreds a day,
upgrade to their paid plan (around **$5/month**) for higher limits. Spam can eat
your quota, so the form includes the standard fields Web3Forms uses for
filtering; you can also add their free hCaptcha later.

## If you'd rather not pay per volume — Amazon SES

When you outgrow Web3Forms, the cheapest route is sending the email yourself via
**Amazon SES** (~$0.10 per 1,000 emails). That needs a tiny serverless function
to hold the secret key (it can't live in React). The form stays almost
identical — you just change the `fetch` in `send()` to call **your** endpoint
(e.g. `/api/notify`) instead of Web3Forms, and the function calls SES. Ask and
this can be wired up for you.

## Notes

- The access key in the frontend is fine to expose for Web3Forms by design.
  An Amazon SES / SendGrid key is **not** — those must stay on a server.
- Submissions are not stored in this app; they live in your inbox (and in
  Web3Forms for 30 days on the free plan).
