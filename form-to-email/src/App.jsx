import { useState, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   CONFIG — edit these three lines and you're done.
   1. Get your key free at https://web3forms.com (sign up with the
      Gmail you want messages delivered to, copy the Access Key).
   2. Paste it below. While it stays "YOUR_ACCESS_KEY", the form
      runs in PREVIEW mode (it fakes a send so you can see the flow).
      The moment you paste a real key, it sends for real.
   ───────────────────────────────────────────────────────────── */
const WEB3FORMS_ACCESS_KEY = "4a767f2e-cf01-4a81-bfdc-9bda47d1cb65";
const DELIVER_TO = "you@gmail.com"; // shown in the UI only
const SITE_NAME = "Your Site";

const PREVIEW_MODE = WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY";

export default function App() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [sentAt, setSentAt] = useState(null);
  const firstFieldRef = useRef(null);

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = "Add a name so I know who wrote in.";
    if (!values.email.trim()) next.email = "I need an email to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = "That email doesn't look right.";
    if (!values.message.trim()) next.message = "The message can't be empty.";
    return next;
  }

  async function send() {
    const found = validate();
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    setStatus("sending");

    // PREVIEW MODE: simulate so you can see the receipt without a key.
    if (PREVIEW_MODE) {
      await new Promise((r) => setTimeout(r, 900));
      setSentAt(new Date());
      setStatus("sent");
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New message from ${values.name} · ${SITE_NAME}`,
          from_name: SITE_NAME,
          replyto: values.email, // reply straight from your inbox
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSentAt(new Date());
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setStatus("idle");
    setSentAt(null);
    requestAnimationFrame(() => firstFieldRef.current?.focus());
  }

  const onKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send();
  };

  return (
    <div className="dispatch">
      <style>{CSS}</style>

      <div className="card" onKeyDown={onKeyDown}>
        <header className="band">
          <span className="eyebrow">✶ Dispatch</span>
          <h1 className="title">Send me a message</h1>
          <span className="route">
            delivers to <b>{DELIVER_TO}</b>
          </span>
        </header>

        {status === "sent" ? (
          <Receipt values={values} sentAt={sentAt} onReset={reset} />
        ) : (
          <div className="body">
            {status === "error" && (
              <div className="banner" role="alert">
                That didn't go through. Check your connection and send again.
              </div>
            )}

            <Field label="Name" id="name" error={errors.name}>
              <input
                ref={firstFieldRef}
                id="name"
                value={values.name}
                onChange={update("name")}
                placeholder="Jane Mehta"
                autoComplete="name"
              />
            </Field>

            <div className="row">
              <Field label="Email" id="email" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  value={values.email}
                  onChange={update("email")}
                  placeholder="jane@email.com"
                  autoComplete="email"
                />
              </Field>
              <Field label="Phone" id="phone" optional error={errors.phone}>
                <input
                  id="phone"
                  value={values.phone}
                  onChange={update("phone")}
                  placeholder="Optional"
                  autoComplete="tel"
                />
              </Field>
            </div>

            <Field label="Message" id="message" error={errors.message}>
              <textarea
                id="message"
                rows={4}
                value={values.message}
                onChange={update("message")}
                placeholder="What's on your mind?"
              />
            </Field>

            <button
              className="send"
              onClick={send}
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <span className="spinner" aria-hidden />
              ) : (
                <>
                  Send message <span className="arrow">→</span>
                </>
              )}
            </button>

            <p className="foot">
              {PREVIEW_MODE
                ? "Preview mode — add your key to send for real."
                : "Your details are emailed to me, not stored here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, id, error, optional, children }) {
  return (
    <label className={`field ${error ? "has-error" : ""}`} htmlFor={id}>
      <span className="lbl">
        {label}
        {optional && <em> · optional</em>}
      </span>
      {children}
      {error && <span className="err">{error}</span>}
    </label>
  );
}

function Receipt({ values, sentAt, onReset }) {
  const stamp = sentAt
    ? sentAt.toLocaleString(undefined, {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  return (
    <div className="body">
      <div className="receipt">
        <div className="receipt-top">
          <span className="delivered">Delivered</span>
          <span className="ts">{stamp}</span>
        </div>
        <dl className="lines">
          <div>
            <dt>From</dt>
            <dd>{values.name}</dd>
          </div>
          <div>
            <dt>Reply to</dt>
            <dd>{values.email}</dd>
          </div>
          {values.phone && (
            <div>
              <dt>Phone</dt>
              <dd>{values.phone}</dd>
            </div>
          )}
          <div>
            <dt>Note</dt>
            <dd className="note">{values.message}</dd>
          </div>
        </dl>
        <div className="perf" aria-hidden />
        <p className="receipt-foot">
          Landed in the inbox. I'll get back to you.
        </p>
      </div>
      <button className="ghost" onClick={onReset}>
        Send another →
      </button>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

.dispatch{
  --ink:#16201E; --muted:#6E7B77; --line:#E4E9E6;
  --teal:#103C36; --teal-2:#17514A; --cream:#F4EFE6;
  --amber:#DC8A3C; --amber-d:#C5772B; --brick:#B4453A;
  min-height:100%; display:grid; place-items:center; padding:40px 18px;
  background:
    radial-gradient(120% 90% at 50% -10%, #EBF0ED 0%, #DBE5E1 55%, #CFDBD6 100%);
  font-family:'Inter',system-ui,sans-serif; color:var(--ink);
  box-sizing:border-box;
}
.dispatch *{box-sizing:border-box}

.dispatch .card{
  width:100%; max-width:460px; background:#fff; border-radius:18px;
  overflow:hidden; border:1px solid rgba(16,60,54,.08);
  box-shadow:0 1px 0 rgba(255,255,255,.6) inset, 0 24px 60px -24px rgba(16,60,54,.45),
    0 6px 18px -10px rgba(16,60,54,.25);
}

.dispatch .band{
  background:linear-gradient(150deg,var(--teal) 0%,var(--teal-2) 100%);
  color:var(--cream); padding:26px 28px 24px; position:relative;
}
.dispatch .band:after{
  content:""; position:absolute; left:28px; right:28px; bottom:0; height:1px;
  background:linear-gradient(90deg,transparent,rgba(244,239,230,.35),transparent);
}
.dispatch .eyebrow{
  font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.22em;
  text-transform:uppercase; color:var(--amber); display:block;
}
.dispatch .title{
  font-family:'Fraunces',serif; font-weight:500; font-size:29px; line-height:1.05;
  margin:9px 0 14px; letter-spacing:-.01em;
}
.dispatch .route{
  font-family:'Space Mono',monospace; font-size:12px; color:rgba(244,239,230,.72);
}
.dispatch .route b{color:var(--cream); font-weight:700}

.dispatch .body{padding:24px 28px 26px}

.dispatch .banner{
  background:#FBEDEB; border:1px solid #EBC7C2; color:var(--brick);
  font-size:13px; padding:11px 13px; border-radius:10px; margin-bottom:16px;
}

.dispatch .field{display:block; margin-bottom:15px}
.dispatch .row{display:flex; gap:13px}
.dispatch .row .field{flex:1; min-width:0}
.dispatch .lbl{
  font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.13em;
  text-transform:uppercase; color:var(--muted); display:block; margin-bottom:7px;
}
.dispatch .lbl em{font-style:normal; color:#A9B3AF; text-transform:none; letter-spacing:0}
.dispatch input,.dispatch textarea{
  width:100%; font:inherit; font-size:15px; color:var(--ink);
  background:#FAFBFA; border:1px solid var(--line); border-radius:11px;
  padding:11px 13px; outline:none; transition:border-color .15s, box-shadow .15s, background .15s;
  resize:vertical;
}
.dispatch input::placeholder,.dispatch textarea::placeholder{color:#AEB7B3}
.dispatch input:focus,.dispatch textarea:focus{
  border-color:var(--teal); background:#fff;
  box-shadow:0 0 0 3px rgba(16,60,54,.10);
}
.dispatch .has-error input,.dispatch .has-error textarea{
  border-color:var(--brick); background:#FFFBFA;
}
.dispatch .err{
  display:block; margin-top:6px; font-size:12.5px; color:var(--brick);
}

.dispatch .send{
  width:100%; margin-top:6px; height:50px; border:none; cursor:pointer;
  background:linear-gradient(180deg,var(--amber),var(--amber-d));
  color:#fff; font:inherit; font-weight:600; font-size:15px; border-radius:12px;
  display:flex; align-items:center; justify-content:center; gap:9px;
  box-shadow:0 8px 18px -8px rgba(197,119,43,.7); transition:transform .12s, box-shadow .12s, filter .12s;
}
.dispatch .send:hover:not(:disabled){transform:translateY(-1px); filter:brightness(1.03)}
.dispatch .send:active:not(:disabled){transform:translateY(0)}
.dispatch .send:disabled{cursor:default; opacity:.85}
.dispatch .arrow{transition:transform .15s}
.dispatch .send:hover:not(:disabled) .arrow{transform:translateX(3px)}

.dispatch .spinner{
  width:18px; height:18px; border-radius:50%;
  border:2.5px solid rgba(255,255,255,.45); border-top-color:#fff;
  animation:spin .7s linear infinite;
}
@keyframes spin{to{transform:rotate(360deg)}}

.dispatch .foot{
  margin:14px 0 0; text-align:center; font-size:12px; color:var(--muted);
}

/* focus-visible accessibility */
.dispatch button:focus-visible,.dispatch input:focus-visible,.dispatch textarea:focus-visible{
  outline:2px solid var(--teal); outline-offset:2px;
}

/* ── Receipt (the signature) ── */
.dispatch .receipt{
  border:1px solid var(--line); border-radius:13px; overflow:hidden;
  background:
    repeating-linear-gradient(180deg,#fff 0 27px, #FCFBF8 27px 28px);
  animation:rise .45s cubic-bezier(.2,.7,.2,1) both;
}
@keyframes rise{from{opacity:0; transform:translateY(8px)}to{opacity:1; transform:none}}
.dispatch .receipt-top{
  display:flex; align-items:baseline; justify-content:space-between;
  padding:18px 20px 14px; border-bottom:1px dashed var(--line);
}
.dispatch .delivered{
  font-family:'Fraunces',serif; font-size:22px; font-weight:600; color:var(--teal);
  letter-spacing:.01em;
}
.dispatch .ts{font-family:'Space Mono',monospace; font-size:12px; color:var(--muted)}
.dispatch .lines{margin:0; padding:14px 20px 6px}
.dispatch .lines>div{display:flex; gap:14px; padding:7px 0}
.dispatch .lines dt{
  font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.1em;
  text-transform:uppercase; color:var(--muted); width:78px; flex-shrink:0; padding-top:2px;
}
.dispatch .lines dd{margin:0; font-size:14.5px; color:var(--ink); word-break:break-word}
.dispatch .lines .note{white-space:pre-wrap; line-height:1.5}
.dispatch .perf{height:14px; position:relative}
.dispatch .perf:before{
  content:""; position:absolute; inset:0;
  background:radial-gradient(circle at 7px 50%, transparent 5px, var(--line) 5px 6px, transparent 6px);
  background-size:14px 14px; opacity:.5;
}
.dispatch .receipt-foot{
  margin:0; padding:4px 20px 18px; font-size:13px; color:var(--muted);
}
.dispatch .ghost{
  width:100%; margin-top:16px; height:46px; cursor:pointer;
  background:transparent; border:1px solid var(--line); color:var(--teal);
  font:inherit; font-weight:600; font-size:14px; border-radius:12px;
  transition:background .15s, border-color .15s;
}
.dispatch .ghost:hover{background:#F3F7F5; border-color:#CFE0DA}

@media (max-width:420px){
  .dispatch .row{flex-direction:column; gap:0}
  .dispatch .title{font-size:25px}
}
@media (prefers-reduced-motion:reduce){
  .dispatch *{animation:none !important; transition:none !important}
}
`;
