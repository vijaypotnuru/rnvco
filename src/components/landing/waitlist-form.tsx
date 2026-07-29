"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { submitWaitlist } from "@/app/actions";

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      const target = event.target as HTMLElement;
      // Check if click is outside the select wrapper using closest helper
      if (target && !target.closest(".wl-select-wrapper")) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function handleSelectOption(cat: string) {
    setCategory(cat);
    setIsOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(event.currentTarget);
    try {
      const result = await submitWaitlist(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
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
            <div
              role="button"
              tabIndex={0}
              className={`wl-select-trigger ${isOpen ? "active" : ""}`}
              onClick={toggleDropdown}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleDropdown();
                }
              }}
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
            </div>
            <select
              className="wl-select-native"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Select category"
            >
              <option value="" disabled hidden>
                Select category
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {isOpen && (
              <ul className="wl-select-options open" role="listbox">
                {CATEGORIES.map((cat) => (
                  <li
                    key={cat}
                    className={`wl-select-option ${category === cat ? "selected" : ""}`}
                    role="option"
                    aria-selected={category === cat}
                    onClick={() => handleSelectOption(cat)}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
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
      {errorMsg && (
        <div style={{ 
          color: "var(--rnv-orange-light, #ef4444)", 
          fontSize: "14px", 
          marginTop: "12px", 
          textAlign: "center",
          padding: "8px",
          border: "1px solid rgba(239, 68, 68, 0.2)",
          background: "rgba(239, 68, 68, 0.05)"
        }}>
          {errorMsg}
        </div>
      )}
      {!submitted ? (
        <button 
          className="wl-submit" 
          type="submit" 
          disabled={isLoading}
          style={isLoading ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
        >
          {isLoading ? "Registering..." : "Register Interest →"}
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

