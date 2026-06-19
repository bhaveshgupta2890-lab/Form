# Sankalp Admissions — homepage

A one-page React website for an MBBS & engineering admissions consultancy in
Meerut, with a built-in **callback form** (just Name + Phone) that emails each
enquiry to your Gmail via Web3Forms.

## Run it

Needs [Node.js](https://nodejs.org) v18+.

```bash
cd admission-site
npm install
npm run dev
```

Open the localhost URL it prints. The site loads in **preview mode** — the form
fakes a send so you can demo it without a key.

## Make the form send real enquiries

Open `src/App.jsx` and edit **one line** near the top:

```js
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY";
```

Replace `"YOUR_ACCESS_KEY"` with your real key from
[web3forms.com](https://web3forms.com) (sign up with the Gmail you want
enquiries delivered to). That's it — preview mode switches off automatically and
every callback request lands in your inbox.

> Only this line changes. Don't edit anything else for the key — the preview
> check now detects a real key on its own.

## Customise your business details

Right below that line, edit:

```js
const BRAND = "Sankalp Admissions";
const PHONE_DISPLAY = "+91 98765 43210";
const PHONE_TEL = "+919876543210";   // no spaces, for the call button
const EMAIL = "hello@sankalpadmissions.in";
const CITY = "Meerut, Uttar Pradesh";
```

Then update the `STATS` and `STORIES` arrays with your real numbers and
testimonials (the ones included are placeholders).

## Put it online

```bash
npm run build
```

Drag the `dist/` folder onto [Netlify Drop](https://app.netlify.com/drop) or
deploy with [Vercel](https://vercel.com).

## Notes

- The Web3Forms key is safe in the frontend — it can only send to your inbox.
- Enquiries arrive in your Gmail; check Spam/Promotions on the first one.
- The footer disclaimer (guidance, not guaranteed admission) is there on
  purpose — keep it for trust and compliance.
