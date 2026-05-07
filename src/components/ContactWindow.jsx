import { useState } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiPhone, FiMapPin, FiFacebook, FiAlertCircle } from 'react-icons/fi';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Basic international phone: starts with optional +, then digits/spaces/dashes/parens, min 7 digits total
const PHONE_RE = /^[+]?[\d\s\-().]{7,}$/;

function validate(form) {
  if (!form.name.trim())
    return 'Please enter your name.';
  if (!form.email.trim() && !form.phone.trim())
    return 'Please provide at least an email or a phone number.';
  if (form.email.trim() && !EMAIL_RE.test(form.email.trim()))
    return 'Please enter a valid email address.';
  if (form.phone.trim() && !PHONE_RE.test(form.phone.trim()))
    return 'Phone number looks invalid — please double-check it.';
  if (!form.subject.trim())
    return 'Please enter a subject.';
  if (!form.message.trim())
    return 'Please write a message.';
  return null;
}

export default function ContactWindow() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [validationErr, setValidationErr] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    // Clear validation error as user types
    if (validationErr) setValidationErr(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate(form);
    if (err) { setValidationErr(err); return; }

    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="section-heading">
        <span className="section-heading-icon">📬</span>
        Contact
      </h2>

      {/* Contact info */}
      <div className="contact-info">
        <div className="contact-row">
          <FiMapPin />
          <span>Maolana Monjil, SK Abashik, Shamsher Para, Chandgaon, Chattogram, Bangladesh</span>
        </div>
        <div className="contact-row">
          <FiPhone />
          <span>
            <a href="tel:+8801626014236">+880 1626 014236</a>
            {' · '}
            <a href="tel:+8801910288564">+880 1910 288564</a>
          </span>
        </div>
        <div className="contact-row">
          <FiMail />
          <span>
            <a href="mailto:seam.cse.pciu@gmail.com">seam.cse.pciu@gmail.com</a>
            {' · '}
            <a href="mailto:shajjadhossainseam13@gmail.com">shajjadhossainseam13@gmail.com</a>
          </span>
        </div>
        <div className="contact-row">
          <FiGithub />
          <a href="https://github.com/shseam13" target="_blank" rel="noreferrer">github.com/shseam13</a>
        </div>
        <div className="contact-row">
          <FiLinkedin />
          <a href="https://www.linkedin.com/in/shseam13/" target="_blank" rel="noreferrer">linkedin.com/in/shseam13</a>
        </div>
        <div className="contact-row">
          <FiFacebook />
          <a href="https://www.facebook.com/shseam13" target="_blank" rel="noreferrer">facebook.com/shseam13</a>
        </div>
      </div>

      {/* Form */}
      <form className="contact-form" onSubmit={handleSubmit} noValidate>

        {/* Row 1: Name */}
        <div className="form-group">
          <label className="form-label">
            Name <span style={{ color: '#ff3b30' }}>*</span>
          </label>
          <input
            className="form-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </div>

        {/* Row 2: Email + Phone */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              Email
              <span style={optionalTag}> — or phone below</span>
            </label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">
              Phone
              <span style={optionalTag}> — or email above</span>
            </label>
            <input
              className="form-input"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        {/* Row 3: Subject */}
        <div className="form-group">
          <label className="form-label">Subject <span style={{ color: '#ff3b30' }}>*</span></label>
          <input
            className="form-input"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="What's this about?"
          />
        </div>

        {/* Row 4: Message */}
        <div className="form-group">
          <label className="form-label">
            Message <span style={{ color: '#ff3b30' }}>*</span>
          </label>
          <textarea
            className="form-textarea"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Write your message here…"
          />
        </div>

        {/* Validation error */}
        {validationErr && (
          <div className="form-status error" style={{ display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left' }}>
            <FiAlertCircle size={15} style={{ flexShrink: 0 }} />
            {validationErr}
          </div>
        )}

        {status === 'success' && (
          <div className="form-status success">✅ Message sent! I'll get back to you soon.</div>
        )}
        {status === 'error' && (
          <div className="form-status error">Something went wrong. Please email me directly.</div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ width: 'fit-content' }}
        >
          <FiSend /> {loading ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

const optionalTag = {
  fontSize: 10,
  fontWeight: 400,
  color: 'var(--text-secondary)',
  textTransform: 'none',
  letterSpacing: 0,
};
