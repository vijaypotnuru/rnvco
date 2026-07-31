"use client";

import { FormEvent, useState, useRef, useEffect } from "react";
import { WAITLIST_CATEGORIES } from "@/lib/waitlist";

const CATEGORIES = [...WAITLIST_CATEGORIES];

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Controlled input states
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [compute, setCompute] = useState("");
  
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

    const apiUrl = "/api/waitlist";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          organisation,
          email,
          category,
          compute,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        // Clear all states
        setCategory("");
        setName("");
        setOrganisation("");
        setEmail("");
        setCompute("");

        // Auto hide success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          const errorsFormatted = data.errors
            .map((err: any) => `${err.field}: ${err.message}`)
            .join(", ");
          setErrorMsg(errorsFormatted || "Validation failed");
        } else {
          setErrorMsg(data.message || "Failed to submit. Please try again.");
        }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          value={compute}
          onChange={(e) => setCompute(e.target.value)}
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

