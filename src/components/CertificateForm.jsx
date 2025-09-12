"use client";
import { useState } from "react";
import Button from "./Button";

export default function CertificateForm() {
  const [form, setForm] = useState({ name: "", event: "", date: "" });
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    alert(`Certificate generated for ${form.name} - ${form.event}`);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4 items-start w-full">
      <div className="grid gap-3 w-full lg:max-w-md">
        <label className="grid gap-1">
          <span className="text-sm">Name</span>
          <input name="name" value={form.name} onChange={handleChange} className="rounded border border-black/10 px-3 py-2 bg-transparent" required />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Event</span>
          <input name="event" value={form.event} onChange={handleChange} className="rounded border border-black/10 px-3 py-2 bg-transparent" required />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Date</span>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="rounded border border-black/10 px-3 py-2 bg-transparent" required />
        </label>
        <Button type="submit">Generate</Button>
      </div>
      <div className="border border-black/10 rounded p-4 w-full">
        <p className="text-sm opacity-70 mb-2">Preview</p>
        <div className="rounded border border-dashed p-6">
          <h3 className="font-semibold text-lg">Certificate of Participation</h3>
          <p className="mt-2">This is to certify that <strong>{form.name || "[Name]"}</strong> has participated in <strong>{form.event || "[Event]"}</strong> on <strong>{form.date || "[Date]"}</strong>.</p>
        </div>
      </div>
    </form>
  );
}
