import { useState, useRef } from "react";

/* ════════════════════════════════════════════════════════════════
   EDIT THIS ONE LINE TO GO LIVE
   Paste your Web3Forms key (sign up at web3forms.com with the Gmail
   you want enquiries delivered to). Leave it as YOUR_ACCESS_KEY and
   the form runs in PREVIEW mode (fakes the send so you can demo it).
   ──────────────────────────────────────────────────────────────── */
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY";

/* Your details — change these to your real business info. */
const BRAND = "Sankalp Admissions";
const PHONE_DISPLAY = "+91 98765 43210";
const PHONE_TEL = "+919876543210";
const EMAIL = "hello@sankalpadmissions.in";
const CITY = "Meerut, Uttar Pradesh";

/* Preview mode auto-detects the placeholder — you don't touch this.
   A real key is a long id like 4a767f2e-cf01-...; the placeholder isn't. */
const PREVIEW_MODE = !/^[0-9a-f-]{30,}$/i.test(WEB3FORMS_ACCESS_KEY);

/* Stats / stories below are placeholders — swap in your real numbers. */
const STATS = [
  { n: "12+", l: "years guiding families" },
  { n: "2,000+", l: "students admitted" },
  { n: "120+", l: "partner colleges" },
  { n: "Recognised", l: "seats only" },
];

const STORIES = [
  { name: "Aarav S.", course: "MBBS", college: "Private Medical College, UP", year: "2024" },
  { name: "Priya R.", course: "B.Tech · CSE (AI)", college: "Deemed University, NCR", year: "2024" },
  { name: "Mohammed F.", course: "BDS", college: "Dental College, Uttarakhand", year: "2023" },
];

export default function App() {
  return (
    <div className="site">
      <style>{CSS}</style>
      <Nav />
      <Hero />
      <Services />
      <Trust />
      <Process />
      <Results />
      <QuoteBand />
      <Contact />
      <Footer />
    </div>
  );
}

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

function Nav() {
  return (
    <header className="nav">
      <a className="brand" href="#top" onClick={scrollTo("top")}>
        <Seal small />
        <span>{BRAND}</span>
      </a>
      <nav className="nav-links">
        <a href="#services" onClick={scrollTo("services")}>Services</a>
        <a href="#process" onClick={scrollTo("process")}>How it works</a>
        <a href="#results" onClick={scrollTo("results")}>Results</a>
      </nav>
      <a className="nav-cta" href={`tel:${PHONE_TEL}`}>
        <PhoneIcon /> {PHONE_DISPLAY}
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grain" aria-hidden />
      <div className="hero-inner">
        <span className="eyebrow gold">MBBS &amp; B.Tech Admissions · {CITY.split(",")[0]}</span>
        <h1 className="hero-title">
          The right medical or engineering seat — secured with guidance you can trust.
        </h1>
        <p className="hero-sub">
          {BRAND} helps students across Meerut win MBBS and B.Tech seats through management
          and NRI quota — with transparent fees, recognised colleges, and counselling that
          puts your future first.
        </p>
        <div className="hero-cta">
          <a className="btn-gold" href="#contact" onClick={scrollTo("contact")}>
            Request a free callback <span className="arrow">→</span>
          </a>
          <a className="btn-ghost-light" href={`tel:${PHONE_TEL}`}>
            <PhoneIcon /> Call now
          </a>
        </div>
        <ul className="hero-strip">
          {STATS.map((s) => (
            <li key={s.l}>
              <b>{s.n}</b>
              <span>{s.l}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <SectionHead eyebrow="What we do" title="Two paths. One honest guide." />
      <div className="svc-grid">
        <article className="svc">
          <div className="svc-ic"><MedIcon /></div>
          <h3>MBBS &amp; Medical Sciences</h3>
          <p>
            Seats in private and deemed medical colleges through management &amp; NRI quota —
            MBBS, BDS, BAMS, BHMS and allied health, across UP and neighbouring states.
          </p>
          <div className="tags">
            <span>MBBS</span><span>BDS</span><span>BAMS</span><span>NRI quota</span>
          </div>
        </article>
        <article className="svc">
          <div className="svc-ic"><ChipIcon /></div>
          <h3>Engineering &amp; Technology</h3>
          <p>
            B.Tech and diploma admissions in Computer Science, AI &amp; Data Science, IT,
            Electronics and core branches at reputed private universities.
          </p>
          <div className="tags">
            <span>CSE</span><span>AI / ML</span><span>IT</span><span>ECE</span>
          </div>
        </article>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { ic: <ShieldIcon />, t: "Transparent fees", d: "You see the college fee structure and our advisory fee upfront — written down, before you decide. No hidden charges, no surprises." },
    { ic: <CheckSeal />, t: "Recognised colleges only", d: "We recommend NMC and AICTE-approved, accredited institutions. We will never push an unrecognised seat." },
    { ic: <HeartIcon />, t: "Counselling, not sales", d: "If a college doesn't fit your marks, budget or goals, we say so. We'd rather lose a deal than mislead a family." },
    { ic: <RouteIcon />, t: "One counsellor, start to finish", d: "From shortlisting to final document submission, the same person stays with you the whole way." },
  ];
  return (
    <section className="section band-soft" id="trust">
      <SectionHead eyebrow="Why families trust us" title="Built on transparency, not promises." />
      <div className="trust-grid">
        {items.map((i) => (
          <article className="trust" key={i.t}>
            <div className="trust-ic">{i.ic}</div>
            <div>
              <h3>{i.t}</h3>
              <p>{i.d}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { t: "Free enquiry & counselling", d: "Share your marks, budget and preferred branch or city. We assess your options honestly." },
    { t: "College shortlist", d: "A clear list with fees, recognition status and real seat availability — no guesswork." },
    { t: "Compare & verify", d: "We help you weigh the options and verify each college before you commit a rupee." },
    { t: "Documentation", d: "Forms, deadlines and paperwork handled with you, so nothing slips." },
    { t: "Seat confirmed", d: "You join your college with every document in order and full clarity on costs." },
  ];
  return (
    <section className="section" id="process">
      <SectionHead eyebrow="How it works" title="A clear path, start to seat." />
      <ol className="steps">
        {steps.map((s, i) => (
          <li className="step" key={s.t}>
            <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Results() {
  return (
    <section className="section band-soft" id="results">
      <SectionHead eyebrow="Success stories" title="Families who trusted us, admitted." />
      <div className="results-grid">
        {STORIES.map((s) => (
          <article className="result" key={s.name}>
            <div className="stamp">Admitted</div>
            <h3>{s.name}</h3>
            <p className="result-course">{s.course}</p>
            <p className="result-college">{s.college}</p>
            <span className="result-year">{s.year}</span>
          </article>
        ))}
      </div>
      <p className="results-note">Names shortened for privacy. Replace with your own verified testimonials.</p>
    </section>
  );
}

function QuoteBand() {
  return (
    <section className="quote-band">
      <p className="quote">
        “They told us plainly which college fit our budget and which didn't.
        That honesty is why we trusted them with our daughter's MBBS admission.”
      </p>
      <p className="quote-by">— A parent, Meerut · <em>sample testimonial</em></p>
    </section>
  );
}

function Contact() {
  const [values, setValues] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const nameRef = useRef(null);

  const update = (f) => (e) => {
    setValues((v) => ({ ...v, [f]: e.target.value }));
    if (errors[f]) setErrors((er) => ({ ...er, [f]: undefined }));
  };

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    const digits = values.phone.replace(/\D/g, "");
    if (!values.phone.trim()) next.phone = "We need a number to call you back.";
    else if (digits.length < 10 || digits.length > 13) next.phone = "Enter a valid phone number.";
    return next;
  }

  async function send() {
    const found = validate();
    if (Object.keys(found).length) return setErrors(found);
    setStatus("sending");

    if (PREVIEW_MODE) {
      await new Promise((r) => setTimeout(r, 900));
      return setStatus("sent");
    }
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New admission enquiry: ${values.name}`,
          from_name: BRAND,
          name: values.name,
          phone: values.phone,
          message: `Callback request\nName: ${values.name}\nPhone: ${values.phone}`,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues({ name: "", phone: "" });
    setErrors({});
    setStatus("idle");
    requestAnimationFrame(() => nameRef.current?.focus());
  }

  return (
    <section className="section contact" id="contact">
      <div className="contact-card">
        <div className="contact-left">
          <span className="eyebrow gold">Talk to us</span>
          <h2>Request a free callback</h2>
          <p>
            Leave your name and number. A senior counsellor calls you back — usually within
            a few hours, never with spam.
          </p>
          <ul className="contact-points">
            <li><CheckMini /> Free, no-obligation first call</li>
            <li><CheckMini /> Honest advice on colleges &amp; fees</li>
            <li><CheckMini /> Your details stay private</li>
          </ul>
          <a className="contact-phone" href={`tel:${PHONE_TEL}`}>
            <PhoneIcon /> Prefer to talk now? {PHONE_DISPLAY}
          </a>
        </div>

        <div className="contact-right">
          {status === "sent" ? (
            <div className="ack">
              <div className="ack-seal"><Seal /></div>
              <h3>We've got your request</h3>
              <p>Thank you, {values.name || "there"}. A counsellor will call you on your number shortly.</p>
              <button className="btn-ghost" onClick={reset}>Send another →</button>
            </div>
          ) : (
            <>
              {status === "error" && (
                <div className="banner" role="alert">
                  That didn't go through. Please check your connection and try again.
                </div>
              )}
              <label className={`field ${errors.name ? "has-error" : ""}`} htmlFor="c-name">
                <span className="lbl">Full name</span>
                <input
                  ref={nameRef}
                  id="c-name"
                  value={values.name}
                  onChange={update("name")}
                  placeholder="e.g. Rohan Sharma"
                  autoComplete="name"
                />
                {errors.name && <span className="err">{errors.name}</span>}
              </label>
              <label className={`field ${errors.phone ? "has-error" : ""}`} htmlFor="c-phone">
                <span className="lbl">Phone number</span>
                <input
                  id="c-phone"
                  type="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={update("phone")}
                  placeholder="e.g. 98XXXXXXXX"
                  autoComplete="tel"
                />
                {errors.phone && <span className="err">{errors.phone}</span>}
              </label>
              <button className="btn-gold full" onClick={send} disabled={status === "sending"}>
                {status === "sending" ? <span className="spinner" aria-hidden /> : <>Request callback <span className="arrow">→</span></>}
              </button>
              <p className="form-foot">
                {PREVIEW_MODE ? "Preview mode — paste your key to receive real enquiries." : "By submitting, you agree to be contacted about admissions."}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="brand"><Seal small /><span>{BRAND}</span></div>
          <p>Honest admissions guidance for MBBS and engineering aspirants in {CITY}.</p>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>{CITY}</span>
          <span>Mon–Sat, 10am–7pm</span>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <a href="#services" onClick={scrollTo("services")}>Services</a>
          <a href="#process" onClick={scrollTo("process")}>How it works</a>
          <a href="#results" onClick={scrollTo("results")}>Results</a>
          <a href="#contact" onClick={scrollTo("contact")}>Request callback</a>
        </div>
      </div>
      <p className="disclaimer">
        Admissions are subject to college eligibility, regulatory norms and seat availability.
        {" "}{BRAND} provides guidance and counselling and does not guarantee admission.
      </p>
      <p className="copyright">© {new Date().getFullYear()} {BRAND}. All rights reserved.</p>
    </footer>
  );
}

/* ── small pieces ── */
function SectionHead({ eyebrow, title }) {
  return (
    <div className="sec-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

function Seal({ small }) {
  return (
    <svg className={`seal ${small ? "seal-sm" : ""}`} viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="22" className="seal-ring" />
      <circle cx="24" cy="24" r="16" className="seal-ring2" />
      <path d="M16 24.5l5.5 5.5L33 18.5" className="seal-check" />
    </svg>
  );
}

const PhoneIcon = () => (<svg viewBox="0 0 24 24" className="i" aria-hidden><path d="M6.5 3.5h3l1.5 5-2 1.5a12 12 0 005.5 5.5l1.5-2 5 1.5v3a2 2 0 01-2 2A16 16 0 014.5 5.5a2 2 0 012-2z"/></svg>);
const MedIcon = () => (<svg viewBox="0 0 24 24" className="i" aria-hidden><path d="M9 3v4M15 3v4M7 7h10v5a5 5 0 01-10 0V7zM12 17v2a3 3 0 003 3 3 3 0 003-3v-2"/><circle cx="18" cy="13" r="1.4"/></svg>);
const ChipIcon = () => (<svg viewBox="0 0 24 24" className="i" aria-hidden><rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3"/></svg>);
const ShieldIcon = () => (<svg viewBox="0 0 24 24" className="i" aria-hidden><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></svg>);
const CheckSeal = () => (<svg viewBox="0 0 24 24" className="i" aria-hidden><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>);
const HeartIcon = () => (<svg viewBox="0 0 24 24" className="i" aria-hidden><path d="M12 20s-7-4.5-7-9.5A3.5 3.5 0 0112 7a3.5 3.5 0 017 3.5C19 15.5 12 20 12 20z"/></svg>);
const RouteIcon = () => (<svg viewBox="0 0 24 24" className="i" aria-hidden><circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M8 6h6a3 3 0 010 6H10a3 3 0 000 6h6"/></svg>);
const CheckMini = () => (<svg viewBox="0 0 24 24" className="i-mini" aria-hidden><path d="M5 12.5l4 4L19 7"/></svg>);

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

.site{
  --ink:#15211E; --muted:#586B65; --line:#E3E9E5; --paper:#F6F3EC;
  --teal:#0F3A34; --teal-2:#16524A; --cream:#F4EFE6;
  --gold:#D89A3C; --gold-d:#BC7C26; --gold-ink:#7A4E12; --brick:#B4453A;
  font-family:'Inter',system-ui,sans-serif; color:var(--ink); line-height:1.55;
  background:#fff;
}
.site *{box-sizing:border-box}
.site h1,.site h2,.site h3,.site h4{margin:0; font-family:'Fraunces',serif; font-weight:600; letter-spacing:-.01em; line-height:1.1}
.site p{margin:0}
.site a{color:inherit; text-decoration:none}
.site section{scroll-margin-top:74px}

.site .eyebrow{font-family:'Space Mono',monospace; font-size:11.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--muted); display:block}
.site .eyebrow.gold{color:var(--gold-d)}
.site .arrow{display:inline-block; transition:transform .15s}
.site .i{width:22px; height:22px; fill:none; stroke:currentColor; stroke-width:1.7; stroke-linecap:round; stroke-linejoin:round}
.site .i-mini{width:16px; height:16px; fill:none; stroke:var(--gold-d); stroke-width:2.2; stroke-linecap:round; stroke-linejoin:round; flex:none}

.site .seal{width:30px; height:30px; flex:none}
.site .seal-sm{width:24px; height:24px}
.site .seal-ring{fill:none; stroke:var(--gold); stroke-width:2}
.site .seal-ring2{fill:none; stroke:var(--gold); stroke-width:1; opacity:.5}
.site .seal-check{fill:none; stroke:var(--gold); stroke-width:3; stroke-linecap:round; stroke-linejoin:round}

.site .nav{
  position:sticky; top:0; z-index:20; display:flex; align-items:center; gap:20px;
  padding:14px 28px; background:rgba(255,255,255,.86); backdrop-filter:blur(10px);
  border-bottom:1px solid var(--line);
}
.site .brand{display:flex; align-items:center; gap:9px; font-family:'Fraunces',serif; font-weight:600; font-size:18px; color:var(--teal)}
.site .nav-links{display:flex; gap:24px; margin-left:auto; font-size:14px; font-weight:500}
.site .nav-links a{color:var(--muted)} .site .nav-links a:hover{color:var(--teal)}
.site .nav-cta{display:inline-flex; align-items:center; gap:7px; font-size:13.5px; font-weight:600; color:var(--teal); border:1px solid var(--line); padding:8px 13px; border-radius:9px}
.site .nav-cta:hover{border-color:var(--gold); color:var(--gold-d)}
.site .nav-cta .i{width:16px;height:16px}

.site .hero{position:relative; overflow:hidden; background:linear-gradient(155deg,var(--teal),var(--teal-2)); color:var(--cream); padding:74px 28px 64px}
.site .hero-grain{position:absolute; inset:0; opacity:.5; background:
  radial-gradient(60% 50% at 80% 0%, rgba(216,154,60,.18), transparent 60%),
  radial-gradient(50% 60% at 0% 100%, rgba(216,154,60,.10), transparent 60%);}
.site .hero-inner{position:relative; max-width:860px; margin:0 auto; text-align:center}
.site .hero-title{font-size:46px; font-weight:600; margin:16px auto 18px; max-width:14ch}
.site .hero-sub{font-size:17px; color:rgba(244,239,230,.82); max-width:60ch; margin:0 auto}
.site .hero-cta{display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin:28px 0 0}
.site .hero-strip{list-style:none; margin:42px auto 0; padding:18px 0 0; display:flex; gap:34px; justify-content:center; flex-wrap:wrap; border-top:1px solid rgba(244,239,230,.18)}
.site .hero-strip li{display:flex; flex-direction:column; gap:2px}
.site .hero-strip b{font-family:'Fraunces',serif; font-size:24px; color:#fff}
.site .hero-strip span{font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.08em; color:rgba(244,239,230,.7); text-transform:uppercase}

.site .btn-gold{display:inline-flex; align-items:center; gap:9px; background:linear-gradient(180deg,var(--gold),var(--gold-d)); color:#fff; font-weight:600; font-size:15px; padding:13px 22px; border-radius:11px; border:none; cursor:pointer; box-shadow:0 10px 22px -10px rgba(188,124,38,.8); transition:transform .12s, filter .12s}
.site .btn-gold:hover:not(:disabled){transform:translateY(-1px); filter:brightness(1.04)}
.site .btn-gold:hover:not(:disabled) .arrow{transform:translateX(3px)}
.site .btn-gold.full{width:100%; justify-content:center; height:50px}
.site .btn-gold:disabled{opacity:.8; cursor:default}
.site .btn-ghost-light{display:inline-flex; align-items:center; gap:8px; color:var(--cream); border:1px solid rgba(244,239,230,.35); padding:12px 20px; border-radius:11px; font-weight:600; font-size:15px}
.site .btn-ghost-light:hover{border-color:var(--gold); color:#fff}
.site .btn-ghost-light .i{width:18px;height:18px}
.site .btn-ghost{background:transparent; border:1px solid var(--line); color:var(--teal); font-weight:600; font-size:14px; padding:11px 18px; border-radius:10px; cursor:pointer}
.site .btn-ghost:hover{background:var(--paper)}

.site .section{max-width:1040px; margin:0 auto; padding:72px 28px}
.site .band-soft{max-width:none; background:var(--paper)}
.site .band-soft > *{max-width:1040px; margin-left:auto; margin-right:auto}
.site .sec-head{text-align:center; margin-bottom:40px}
.site .sec-head h2{font-size:33px; margin-top:10px; color:var(--teal)}

.site .svc-grid{display:grid; grid-template-columns:1fr 1fr; gap:22px}
.site .svc{background:#fff; border:1px solid var(--line); border-radius:16px; padding:30px; box-shadow:0 18px 40px -28px rgba(15,58,52,.4)}
.site .svc-ic{width:50px; height:50px; border-radius:12px; display:grid; place-items:center; background:var(--paper); color:var(--teal); margin-bottom:16px}
.site .svc h3{font-size:21px; color:var(--ink); margin-bottom:9px}
.site .svc p{color:var(--muted); font-size:15px}
.site .tags{display:flex; flex-wrap:wrap; gap:8px; margin-top:16px}
.site .tags span{font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.05em; color:var(--gold-ink); background:rgba(216,154,60,.12); border:1px solid rgba(216,154,60,.3); padding:4px 9px; border-radius:20px}

.site .trust-grid{display:grid; grid-template-columns:1fr 1fr; gap:20px}
.site .trust{display:flex; gap:16px; background:#fff; border:1px solid var(--line); border-radius:14px; padding:22px}
.site .trust-ic{width:42px; height:42px; flex:none; border-radius:10px; display:grid; place-items:center; background:var(--teal); color:var(--gold)}
.site .trust h3{font-size:17px; color:var(--teal); margin-bottom:5px}
.site .trust p{font-size:14.5px; color:var(--muted)}

.site .steps{list-style:none; margin:0 auto; padding:0; max-width:760px}
.site .step{display:flex; gap:22px; padding:22px 0; border-bottom:1px dashed var(--line)}
.site .step:last-child{border-bottom:none}
.site .step-n{font-family:'Fraunces',serif; font-size:30px; font-weight:600; color:var(--gold); width:52px; flex:none; line-height:1}
.site .step h3{font-size:18px; color:var(--teal); margin-bottom:4px}
.site .step p{color:var(--muted); font-size:15px}

.site .results-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:20px}
.site .result{position:relative; background:#fff; border:1px solid var(--line); border-radius:14px; padding:26px 22px 22px; overflow:hidden}
.site .stamp{position:absolute; top:14px; right:-30px; transform:rotate(12deg); background:rgba(216,154,60,.14); color:var(--gold-d); border:1.5px solid var(--gold); font-family:'Space Mono',monospace; font-size:10.5px; letter-spacing:.18em; text-transform:uppercase; padding:4px 36px; font-weight:700}
.site .result h3{font-size:19px; color:var(--ink); margin-bottom:10px}
.site .result-course{font-weight:600; color:var(--teal); font-size:15px}
.site .result-college{color:var(--muted); font-size:14px; margin-top:2px}
.site .result-year{display:inline-block; margin-top:14px; font-family:'Space Mono',monospace; font-size:12px; color:var(--muted)}
.site .results-note{text-align:center; margin-top:24px; font-size:12.5px; color:var(--muted)}

.site .quote-band{background:var(--teal); color:var(--cream); padding:56px 28px; text-align:center}
.site .quote{font-family:'Fraunces',serif; font-size:25px; font-weight:500; max-width:50ch; margin:0 auto; line-height:1.35}
.site .quote-by{margin-top:16px; font-family:'Space Mono',monospace; font-size:12px; letter-spacing:.06em; color:rgba(244,239,230,.7)}
.site .quote-by em{font-style:italic; opacity:.8}

.site .contact{padding-top:64px; padding-bottom:72px}
.site .contact-card{display:grid; grid-template-columns:1.05fr .95fr; gap:0; border:1px solid var(--line); border-radius:20px; overflow:hidden; box-shadow:0 30px 70px -40px rgba(15,58,52,.5)}
.site .contact-left{background:linear-gradient(160deg,var(--teal),var(--teal-2)); color:var(--cream); padding:38px 34px}
.site .contact-left h2{font-size:28px; color:#fff; margin:12px 0 12px}
.site .contact-left p{color:rgba(244,239,230,.82); font-size:15px}
.site .contact-points{list-style:none; margin:22px 0; padding:0; display:flex; flex-direction:column; gap:11px}
.site .contact-points li{display:flex; align-items:center; gap:10px; font-size:14.5px; color:#fff}
.site .contact-phone{display:inline-flex; align-items:center; gap:9px; margin-top:8px; font-family:'Space Mono',monospace; font-size:13px; color:var(--gold); border-top:1px solid rgba(244,239,230,.2); padding-top:18px}
.site .contact-phone .i{width:17px;height:17px}
.site .contact-right{background:#fff; padding:34px}

.site .field{display:block; margin-bottom:16px}
.site .lbl{font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.13em; text-transform:uppercase; color:var(--muted); display:block; margin-bottom:7px}
.site .field input{width:100%; font:inherit; font-size:15px; color:var(--ink); background:#FAFBFA; border:1px solid var(--line); border-radius:11px; padding:12px 14px; outline:none; transition:border-color .15s, box-shadow .15s, background .15s}
.site .field input::placeholder{color:#AEB7B3}
.site .field input:focus{border-color:var(--teal); background:#fff; box-shadow:0 0 0 3px rgba(15,58,52,.1)}
.site .has-error input{border-color:var(--brick); background:#FFFBFA}
.site .err{display:block; margin-top:6px; font-size:12.5px; color:var(--brick)}
.site .banner{background:#FBEDEB; border:1px solid #EBC7C2; color:var(--brick); font-size:13px; padding:11px 13px; border-radius:10px; margin-bottom:16px}
.site .form-foot{margin-top:13px; text-align:center; font-size:12px; color:var(--muted)}
.site .spinner{width:18px; height:18px; border-radius:50%; border:2.5px solid rgba(255,255,255,.45); border-top-color:#fff; animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

.site .ack{text-align:center; padding:14px 6px; animation:rise .45s cubic-bezier(.2,.7,.2,1) both}
@keyframes rise{from{opacity:0; transform:translateY(8px)}to{opacity:1; transform:none}}
.site .ack-seal{display:grid; place-items:center; margin-bottom:14px}
.site .ack-seal .seal{width:54px; height:54px}
.site .ack h3{font-size:22px; color:var(--teal); margin-bottom:8px}
.site .ack p{color:var(--muted); font-size:15px; margin-bottom:20px}

.site a:focus-visible,.site button:focus-visible,.site input:focus-visible{outline:2px solid var(--gold); outline-offset:2px}

.site .footer{background:#0C2C28; color:rgba(244,239,230,.82); padding:54px 28px 30px}
.site .footer-top{max-width:1040px; margin:0 auto; display:grid; grid-template-columns:1.6fr 1fr 1fr; gap:30px}
.site .footer .brand{color:#fff; margin-bottom:12px}
.site .footer-brand p{font-size:14px; max-width:38ch}
.site .footer-col h4{font-family:'Space Mono',monospace; font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--gold); font-weight:700; margin-bottom:14px}
.site .footer-col a,.site .footer-col span{display:block; font-size:14px; margin-bottom:9px; color:rgba(244,239,230,.82)}
.site .footer-col a:hover{color:#fff}
.site .disclaimer{max-width:1040px; margin:36px auto 0; padding-top:20px; border-top:1px solid rgba(244,239,230,.14); font-size:12.5px; color:rgba(244,239,230,.6); line-height:1.6}
.site .copyright{max-width:1040px; margin:14px auto 0; font-size:12px; color:rgba(244,239,230,.5)}

@media (max-width:860px){
  .site .nav-links{display:none}
  .site .hero-title{font-size:34px}
  .site .svc-grid,.site .trust-grid,.site .results-grid,.site .contact-card,.site .footer-top{grid-template-columns:1fr}
  .site .results-grid{gap:16px}
  .site .section{padding:54px 22px}
  .site .quote{font-size:21px}
}
@media (prefers-reduced-motion:reduce){.site *{animation:none !important; transition:none !important}}
`;
