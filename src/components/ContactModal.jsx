import React, { useEffect, useRef, useState } from 'react';

export default function ContactModal({ show, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const dialogRef = useRef(null);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (show) setTimeout(() => firstInputRef.current?.focus(), 50);
  }, [show]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && show && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [show, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSending(true);
    try {
      await onSubmit?.(form);
      setForm({ name: '', email: '', subject: '', message: '' });
      onClose?.();
    } catch {
      alert('Sorry, something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (!show) return null;

  return (
    <div className="mmdb-modal" role="dialog" aria-modal="true" aria-labelledby="contactTitle" ref={dialogRef}>
      <div className="mmdb-backdrop" onClick={onClose} />

      <div className="mmdb-panel shadow-lg">
        <div className="mmdb-header text-white">
          <h5 id="contactTitle" className="mb-0">Contact Us</h5>
          <button type="button" className="btn btn-sm btn-light text-dark rounded-pill px-3" onClick={onClose}>
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 p-md-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label small text-muted">Name</label>
              <input
                ref={firstInputRef}
                name="name"
                type="text"
                className="form-control rounded-pill"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">Email</label>
              <input
                name="email"
                type="email"
                className="form-control rounded-pill"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label small text-muted">Subject (optional)</label>
              <input
                name="subject"
                type="text"
                className="form-control rounded-pill"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label small text-muted">Message</label>
              <textarea
                name="message"
                rows={5}
                className="form-control rounded-4"
                placeholder="How can we help?"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button type="button" className="btn btn-light rounded-pill px-3" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-gradient rounded-pill px-4" disabled={sending}>
              {sending ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .mmdb-modal { position: fixed; inset: 0; z-index: 1080; }
        .mmdb-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.45); backdrop-filter: blur(2px); }
        .mmdb-panel {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: min(720px, calc(100% - 2rem));
          background: #fff; border-radius: 16px; overflow: hidden;
        }
        .mmdb-header {
          background: linear-gradient(135deg,#6c63ff,#4dd0e1);
          padding: .9rem 1rem; display: flex; align-items: center; justify-content: space-between;
        }
        .btn-gradient {
          background-image: linear-gradient(135deg,#6c63ff,#4dd0e1);
          color:#fff; border:none; box-shadow:0 2px 8px rgba(76,110,245,.25);
        }
        .btn-gradient:hover { filter: brightness(.95); color:#fff; }
        .form-control:focus { box-shadow: 0 0 0 .2rem rgba(108,99,255,.15); }
      `}</style>
    </div>
  );
}