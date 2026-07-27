"use client";

import { FormEvent, useState, useRef, useEffect } from "react";

const CATEGORIES = [
  "Enterprise Client",
  "Investor",
  "Government / PSU",
  "Technology Partner",
  "Research Institution",
  "Other"
];

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="wl-form reveal" onSubmit={handleSubmit}>
      <div className="wl-row">
        <div className="wl-group">
          <label className="wl-lbl" htmlFor="wl-name">
            Full Name
          </label>
          <input
            id="wl-name"
            className="wl-inp"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
        </div>
        <div className="wl-group">
          <label className="wl-lbl" htmlFor="wl-org">
            Organisation
          </label>
          <input
            id="wl-org"
            className="wl-inp"
            type="text"
            name="organisation"
            placeholder="Your organisation"
          />
        </div>
      </div>
      <div className="wl-row">
        <div className="wl-group">
          <label className="wl-lbl" htmlFor="wl-email">
            Email Address
          </label>
          <input
            id="wl-email"
            className="wl-inp"
            type="email"
            name="email"
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="wl-group">
          <label className="wl-lbl">
            I represent
          </label>
          <div className="wl-select-wrapper" ref={dropdownRef}>
            <button
              type="button"
              className={`wl-select-trigger ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <span className={category ? "" : "placeholder"}>
                {category || "Select category"}
              </span>
              <svg
                className="arrow"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ul className={`wl-select-options ${isOpen ? "open" : ""}`} role="listbox">
              {CATEGORIES.map((cat) => (
                <li
                  key={cat}
                  className={`wl-select-option ${category === cat ? "selected" : ""}`}
                  role="option"
                  aria-selected={category === cat}
                  onClick={() => {
                    setCategory(cat);
                    setIsOpen(false);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
            <input type="hidden" name="category" value={category} required />
          </div>
        </div>
      </div>
      <div className="wl-group">
        <label className="wl-lbl" htmlFor="wl-compute">
          Compute Requirement (optional)
        </label>
        <input
          id="wl-compute"
          className="wl-inp"
          type="text"
          name="compute"
          placeholder="e.g. 10 MW AI compute cluster, colocation, cloud connectivity..."
        />
      </div>
      {!submitted ? (
        <button className="wl-submit" type="submit">
          Register Interest →
        </button>
      ) : (
        <div className="wl-success visible">
          <div className="wl-success-title">Registered Successfully</div>
          <div className="wl-success-body">
            We will reach out when RNVCO Phase 1 approaches commissioning.
          </div>
        </div>
      )}
    </form>
  );
}

