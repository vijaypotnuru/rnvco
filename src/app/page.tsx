import { PowerRing } from "@/components/landing/power-ring";
import { ScrollReveal } from "@/components/landing/scroll-reveal";
import { SiteNav } from "@/components/landing/site-nav";
import { WaitlistForm } from "@/components/landing/waitlist-form";
import { FAQ_ITEMS } from "@/lib/site";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <div className="grid-bg" />

      <SiteNav />

      <main id="main">
        <p className="seo-summary">
          RNVCO is a unit of Rycoon building a 2.4 GWh sovereign AI data centre
          network across India. Phase 1 launches with 400 MWh capacity. The
          platform is designed for data sovereignty, Tier 4-style facilities,
          pan-India low-latency coverage, and DPDP Act 2023 / MEITY compliance.
          RNVCO is coming soon — register early interest for enterprise,
          investor, government, and partner access.
        </p>

        <section className="hero" aria-labelledby="hero-heading">
          <PowerRing />

          <div className="hero-tag">
            India&apos;s Futuristic AI Infrastructure
          </div>

          <h1 id="hero-heading" className="hero-title">
            POWER
            <br />
            THE <span className="orange">FUTURE</span>
          </h1>

          <p className="hero-sub">
            <em>2.4 GWh</em> · AI Data Centre Network · Across India
          </p>

          <div className="hero-stats">
            <div className="hstat">
              <div className="hstat-num">
                2.4<span className="hstat-unit">GWh</span>
              </div>
              <div className="hstat-label">Total Capacity</div>
            </div>
            <div className="hstat">
              <div className="hstat-num">3</div>
              <div className="hstat-label">Deployment Phases</div>
            </div>
            <div className="hstat">
              <div className="hstat-num">
                400<span className="hstat-unit">MWh</span>
              </div>
              <div className="hstat-label">Phase 1 Launch</div>
            </div>
            <div className="hstat">
              <div className="hstat-num">PAN</div>
              <div className="hstat-label">India Network</div>
            </div>
          </div>

          <div className="hero-btns">
            <a href="#waitlist" className="btn-primary">
              Register Interest
            </a>
            <a href="#phases" className="btn-secondary">
              View Phases
            </a>
          </div>
        </section>

        <section className="phases" id="phases" aria-labelledby="phases-heading">
          <div className="sec-label reveal">Deployment Roadmap</div>
          <h2 id="phases-heading" className="rnv-h2 reveal">
            Three Phases.
            <br />
            <em>One Vision.</em>
          </h2>

          <div className="phases-grid reveal">
            <div className="phase phase-1">
              <div className="phase-badge">
                <span className="dot" />
                Active · Launching
              </div>
              <div className="phase-num">01</div>
              <div className="phase-mwh">
                400<span className="unit-dim"> MWh</span>
              </div>
              <div className="phase-unit">Initial Deployment Capacity</div>
              <div className="phase-title">Foundation Layer</div>
              <div className="phase-body">
                The first 400 MWh of sovereign AI data centre infrastructure
                commissioned, engineered, and operational. Establishing RNVCO as
                India&apos;s premier AI compute provider from day one.
              </div>
              <div className="phase-bar">
                <div className="bar-track">
                  <div className="bar-fill" />
                </div>
                <div className="bar-label">
                  <span>Phase 1 of 2.4 GWh</span>
                  <span>17%</span>
                </div>
              </div>
            </div>

            <div className="phase phase-2">
              <div className="phase-badge">
                <span className="dot" />
                Planned · Phase 2
              </div>
              <div className="phase-num">02</div>
              <div className="phase-mwh">
                1<span className="unit-faint">.0 GWh</span>
              </div>
              <div className="phase-unit">Expansion Capacity</div>
              <div className="phase-title">Scale Layer</div>
              <div className="phase-body">
                Massive horizontal expansion across multiple locations in India
                multiplying compute density, increasing geographic redundancy,
                and deepening the sovereign AI infrastructure grid.
              </div>
              <div className="phase-bar">
                <div className="bar-track">
                  <div className="bar-fill" />
                </div>
                <div className="bar-label">
                  <span>Planned</span>
                  <span>TBA</span>
                </div>
              </div>
            </div>

            <div className="phase phase-3">
              <div className="phase-badge">
                <span className="dot" />
                Planned · Phase 3
              </div>
              <div className="phase-num">03</div>
              <div className="phase-mwh">
                1<span className="unit-faint">.0 GWh</span>
              </div>
              <div className="phase-unit">Full Network Capacity</div>
              <div className="phase-title">Dominance Layer</div>
              <div className="phase-body">
                Completing the 2.4 GWh network the full-scale sovereign AI
                infrastructure platform that will power India&apos;s next
                generation of AI systems, enterprises, and research institutions.
              </div>
              <div className="phase-bar">
                <div className="bar-track">
                  <div className="bar-fill" />
                </div>
                <div className="bar-label">
                  <span>Planned</span>
                  <span>TBA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="power-stat"
          id="capacity"
          aria-labelledby="capacity-heading"
        >
          <div className="pw-left reveal">
            <div className="sec-label" id="capacity-heading">
              Total Network Power
            </div>
            <div className="pw-num">
              2<span className="orange">.</span>4
            </div>
            <div className="pw-unit">Gigawatt Hours</div>
            <div className="pw-desc">
              The largest planned sovereign AI data centre network in India
            </div>
          </div>
          <div className="pw-right reveal">
            <div className="pw-breakdown">
              <div className="pw-row">
                <div className="pw-row-ph">Phase 1</div>
                <div className="pw-row-bar ph1-bar">
                  <div className="pw-row-bar-fill" />
                </div>
                <div className="pw-row-val ph1-val">400 MWh</div>
              </div>
              <div className="pw-row">
                <div className="pw-row-ph">Phase 2</div>
                <div className="pw-row-bar ph2-bar">
                  <div className="pw-row-bar-fill" />
                </div>
                <div className="pw-row-val ph2-val">1.0 GWh</div>
              </div>
              <div className="pw-row">
                <div className="pw-row-ph">Phase 3</div>
                <div className="pw-row-bar ph3-bar">
                  <div className="pw-row-bar-fill" />
                </div>
                <div className="pw-row-val ph3-val">1.0 GWh</div>
              </div>
              <div className="pw-total-row">
                <div className="pw-total-lbl">Total Capacity</div>
                <div className="pw-total-val">2.4 GWh</div>
              </div>
            </div>
          </div>
        </section>

        <section className="vision" id="vision" aria-labelledby="vision-heading">
          <div className="sec-label reveal">What We Are Building</div>
          <h2 id="vision-heading" className="rnv-h2 reveal">
            The Infrastructure
            <br />
            India <em>Deserves</em>
          </h2>

          <div className="vision-grid reveal">
            <div className="vis-item">
              <div className="vis-num">01</div>
              <div className="vis-title">Sovereign AI Compute</div>
              <div className="vis-body">
                Purpose-built GPU and AI compute infrastructure that keeps
                India&apos;s data and intelligence within Indian borders
                sovereign, secure, and built for the age of generative AI.
              </div>
              <span className="vis-tag">Data Sovereignty</span>
            </div>

            <div className="vis-item">
              <div className="vis-num">02</div>
              <div className="vis-title">Futuristic Data Centres</div>
              <div className="vis-body">
                Next-generation facility design immersion cooling, renewable
                energy integration, ultra-low latency fibre, and Tier 4
                redundancy architecture built for AI workloads at petawatt
                scale.
              </div>
              <span className="vis-tag">Tier 4 Standard</span>
            </div>

            <div className="vis-item">
              <div className="vis-num">03</div>
              <div className="vis-title">Pan-India Network</div>
              <div className="vis-body">
                A distributed network of strategically located facilities across
                India - Hyderabad, Mumbai, Delhi, Bangalore, Chennai designed
                for sub-10ms latency to every major economic hub.
              </div>
              <span className="vis-tag">National Grid</span>
            </div>

            <div className="vis-item">
              <div className="vis-num">04</div>
              <div className="vis-title">Enterprise &amp; Government Ready</div>
              <div className="vis-body">
                Designed from the ground up for India&apos;s largest
                enterprises, financial institutions, government bodies, and
                research organisations fully DPDP Act 2023 and MEITY
                compliant.
              </div>
              <span className="vis-tag">DPDP · MEITY Compliant</span>
            </div>
          </div>
        </section>

        <section className="faq" id="faq" aria-labelledby="faq-heading">
          <div className="sec-label reveal">FAQ</div>
          <h2 id="faq-heading" className="rnv-h2 reveal">
            Clear Answers.
            <br />
            <em>Straight Facts.</em>
          </h2>
          <div className="faq-list reveal">
            {FAQ_ITEMS.map((item) => (
              <div className="faq-item" key={item.question}>
                <h3 className="faq-q">{item.question}</h3>
                <p className="faq-a">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="waitlist"
          id="waitlist"
          aria-labelledby="waitlist-heading"
        >
          <div className="container">
            <div className="sec-label centered reveal">
              <span>Early Interest</span>
            </div>
            <h2 id="waitlist-heading" className="rnv-h2 waitlist-title reveal">
              BE FIRST
              <br />
              IN <em>LINE</em>
            </h2>
            <p className="waitlist-intro reveal">
              RNVCO is not yet operational. Register your interest now
              infrastructure partners, enterprise clients, government bodies,
              and investors are welcome.
            </p>

            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="rnv-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              RN<span>V</span>CO
            </div>
            <div className="footer-tag">AI Infrastructure · Coming Soon</div>
            <div className="footer-unit">
              A unit of <strong>Rycoon</strong>.
              <br />
              Building sovereign AI data centres across India.
            </div>
          </div>
          <div className="footer-cols">
            <div>
              <div className="footer-col-title">Infrastructure</div>
              <ul className="footer-links">
                <li>
                  <a href="#phases">Phase 1 · 400 MWh</a>
                </li>
                <li>
                  <a href="#phases">Phase 2 · 1.0 GWh</a>
                </li>
                <li>
                  <a href="#phases">Phase 3 · 1.0 GWh</a>
                </li>
                <li>
                  <a href="#capacity">Total · 2.4 GWh</a>
                </li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li>
                  <a href="#vision">About RNVCO</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                <li>
                  <a href="#waitlist">Register Interest</a>
                </li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Discover</div>
              <ul className="footer-links">
                <li>
                  <a href="/llms.txt">llms.txt</a>
                </li>
                <li>
                  <a href="/sitemap.xml">Sitemap</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">
            © 2025 RNVCO · A Unit of Rycoon · India
          </div>
          <div className="footer-copy">rnvco.com · Coming Soon</div>
        </div>
      </footer>
    </>
  );
}
