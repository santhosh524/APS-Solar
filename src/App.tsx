import { useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Phone,
  MessageCircle,
  ArrowRight,
  Calculator,
  CheckCircle2,
} from "lucide-react";
import { business } from "./config";
import { estimate } from "./calculations";

const money = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header>
        <div className="nav wrap">
          <Link className="brand" to="/">
            <span className="logo">
              <Sun />
            </span>
            {business.name}
          </Link>
          <button
            className="menu"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav className={open ? "show" : ""}>
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/solar-calculator", "Solar calculator"],
              ["/contact", "Contact"],
            ].map(([url, label]) => (
              <NavLink
                end={url === "/"}
                onClick={() => setOpen(false)}
                to={url}
                key={url}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solar-calculator" element={<CalculatorPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer>
        <div className="wrap foot">
          <div>
            <h3>{business.name}</h3>
            <p>Solar solutions made easier to understand.</p>
          </div>
          <div>
            <b>Explore</b>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/solar-calculator">Solar calculator</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <b>Contact</b>
            <a href={"tel:" + business.phone}>{business.phone}</a>
            <a href={"mailto:" + business.email}>{business.email}</a>
            <span>{business.location}</span>
          </div>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </footer>
      <div className="floating">
        <a href={"https://wa.me/" + business.whatsapp} aria-label="WhatsApp">
          <MessageCircle />
        </a>
        <a href={"tel:" + business.phone} aria-label="Call">
          <Phone />
        </a>
      </div>
    </>
  );
}
function Hero({ title, desc }: { title: string; desc: string }) {
  return (
    <section className="intro">
      <div className="wrap">
        <small>POWERING A CLEANER TOMORROW</small>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap heroText">
          <small>SMARTER ENERGY. BRIGHTER FUTURE.</small>
          <h1>
            Make the switch to solar.
            <br />
            <em>Power a brighter future.</em>
          </h1>
          <p>
            Explore rooftop solar solutions designed around your electricity
            needs and your property.
          </p>
          <div className="actions">
            <Link className="btn" to="/solar-calculator">
              Calculate your savings <ArrowRight />
            </Link>
            <Link className="btn outline" to="/contact">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <small className="eyebrow">SOLAR SOLUTIONS</small>
        <h2>Find a system that fits your home</h2>
        <p className="muted">
          Explore common system sizes. Final recommendations depend on usage and
          site assessment.
        </p>
        <div className="cards">
          {["3 kW Home Solar", "5 kW Home Solar", "10 kW Solar System"].map(
            (x, i) => (
              <article className="card" key={x}>
                <Sun />
                <h3>{x}</h3>
                <p>
                  {
                    [
                      "A practical starting point for many homes.",
                      "More generation for higher electricity use.",
                      "A larger rooftop solution for high consumption.",
                    ][i]
                  }
                </p>
                <Link to="/solar-calculator">Estimate this system →</Link>
              </article>
            ),
          )}
        </div>
      </section>
      <section className="section pale">
        <div className="wrap">
          <small className="eyebrow">WHY GO SOLAR</small>
          <h2>A practical step towards energy independence</h2>
          <div className="cards">
            <article className="card">
              <CheckCircle2 />
              <h3>Lower electricity bills</h3>
              <p>
                Generate clean electricity at your property and reduce grid
                consumption.
              </p>
            </article>
            <article className="card">
              <CheckCircle2 />
              <h3>Designed around your roof</h3>
              <p>
                Explore a system based on usage, roof space and site conditions.
              </p>
            </article>
            <article className="card">
              <CheckCircle2 />
              <h3>Long-term value</h3>
              <p>
                Understand your investment with clear estimates and product
                information.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
function About() {
  return (
    <>
      <Hero
        title="About us"
        desc="Helping customers make a confident, informed move to solar."
      />
      <section className="section wrap">
        <h2>Clean energy should feel simple</h2>
        <p className="long">
          We believe customers deserve clear information, practical
          recommendations and transparent conversations before investing in
          solar. Our goal is to help households understand their options and
          make decisions that suit their needs. Final system recommendations
          should always be confirmed through a site assessment.
        </p>
        <div className="cards">
          <article className="card">
            <h3>Customer first</h3>
            <p>Understand needs before recommending a system.</p>
          </article>
          <article className="card">
            <h3>Responsible energy</h3>
            <p>Encourage informed adoption of renewable energy.</p>
          </article>
          <article className="card">
            <h3>Clear communication</h3>
            <p>Explain equipment, scope, estimates and expectations.</p>
          </article>
        </div>
      </section>
    </>
  );
}
function Contact() {
  const [name, setName] = useState(""),
    [phone, setPhone] = useState(""),
    [message, setMessage] = useState("");
  return (
    <>
      <Hero
        title="Let's talk about your solar plans"
        desc="Have a question or want to understand your options? Send us an enquiry."
      />
      <section className="section wrap contact">
        <div>
          <h2>Get in touch</h2>
          <p>
            Call or message our team to discuss your property and solar
            requirements.
          </p>
          <p>
            <Phone /> <a href={"tel:" + business.phone}>{business.phone}</a>
          </p>
          <p>
            <MessageCircle />{" "}
            <a href={"https://wa.me/" + business.whatsapp}>WhatsApp us</a>
          </p>
          <p>{business.email}</p>
          <p>{business.location}</p>
        </div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            const text = encodeURIComponent(
              "Solar enquiry\nName: " +
                name +
                "\nPhone: " +
                phone +
                "\nMessage: " +
                message,
            );
            window.open(
              "https://wa.me/" + business.whatsapp + "?text=" + text,
              "_blank",
            );
          }}
        >
          <h2>Send an enquiry</h2>
          <label>
            Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </label>
          <label>
            Mobile number
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your mobile number"
            />
          </label>
          <label>
            How can we help?
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your requirements"
            />
          </label>
          <button className="btn">Continue to WhatsApp</button>
          <small>
            The form opens WhatsApp with your enquiry. It does not save
            submissions.
          </small>
        </form>
      </section>
    </>
  );
}
function CalculatorPage() {
  const [bill, setBill] = useState("2000"),
    [tariff, setTariff] = useState("7.5"),
    [type, setType] = useState("residential");
  const r = estimate(
    Math.max(Number(bill) || 0, 0),
    Math.max(Number(tariff) || 0.01, 0.01),
  );
  const sub = type === "residential" ? r.sub : 0;
  return (
    <>
      <Hero
        title="Solar cost estimator"
        desc="Estimate a suitable system size, project cost, indicative subsidy and potential savings."
      />
      <section className="section pale">
        <div className="wrap calc">
          <div className="form">
            <h2>
              <Calculator /> Your electricity details
            </h2>
            <label>
              Average monthly electricity bill (₹)
              <input
                type="number"
                min="0"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </label>
            <label>
              Electricity tariff (₹ per unit)
              <input
                type="number"
                min=".01"
                step=".01"
                value={tariff}
                onChange={(e) => setTariff(e.target.value)}
              />
            </label>
            <label>
              Connection type
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </label>
            <p className="hint">
              Illustrative assumptions: 125 units/kW/month, 80% self-consumption
              and ₹3/unit export credit. Actual values vary by location, roof
              and DISCOM rules.
            </p>
          </div>
          <div className="results">
            <small className="eyebrow">YOUR ESTIMATED SOLAR PLAN</small>
            <div className="capacity">
              <span>Recommended system capacity</span>
              <strong>{r.kw.toFixed(1)} kW</strong>
              <small>{r.panels} panels × 600 Wp (approx.)</small>
            </div>
            <div className="stats">
              <div>
                <small>Monthly generation</small>
                <b>{Math.round(r.generation)} units</b>
              </div>
              <div>
                <small>Monthly savings</small>
                <b>{money(r.monthly)}</b>
              </div>
              <div>
                <small>Estimated project cost</small>
                <b>{money(r.cost)}</b>
              </div>
              <div>
                <small>Indicative subsidy</small>
                <b>{money(sub)}</b>
              </div>
              <div>
                <small>Customer investment</small>
                <b>{money(Math.max(r.cost - sub, 0))}</b>
              </div>
              <div>
                <small>Annual savings</small>
                <b>{money(r.annual)}</b>
              </div>
              <div>
                <small>Estimated payback</small>
                <b>{r.payback ? r.payback.toFixed(1) + " years" : "—"}</b>
              </div>
              <div>
                <small>25-year net benefit*</small>
                <b>{money(r.net25)}</b>
              </div>
            </div>
            <a
              className="btn full"
              href={
                "https://wa.me/" +
                business.whatsapp +
                "?text=" +
                encodeURIComponent(
                  "Please contact me for a solar quotation. Monthly bill: " +
                    money(Number(bill) || 0) +
                    ". Estimated system: " +
                    r.kw.toFixed(1) +
                    " kW.",
                )
              }
            >
              Get a detailed quotation
            </a>
            <p className="disclaimer">
              *Indicative estimate after assumed maintenance and panel
              degradation. Not a quotation, guaranteed saving, engineering
              design or subsidy approval. Subsidy estimate is only for eligible
              residential customers; verify current scheme rules and
              eligibility. Actual results depend on site assessment, metering,
              tariffs, equipment and usage.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}


export default function App() {
  return <Layout />;
}
