"use client";

import { FormEvent, useState } from "react";

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

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
          <label className="wl-lbl" htmlFor="wl-category">
            I represent
          </label>
          <select
            id="wl-category"
            className="wl-inp"
            name="category"
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            <option>Enterprise Client</option>
            <option>Investor</option>
            <option>Government / PSU</option>
            <option>Technology Partner</option>
            <option>Research Institution</option>
            <option>Other</option>
          </select>
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
