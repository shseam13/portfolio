import { useState, useEffect } from 'react';
import { FiDownload, FiEye } from 'react-icons/fi';

export default function ResumeWindow() {
  // null = checking, true = PDF found, false = not found
  const [hasPdf, setHasPdf] = useState(null);

  useEffect(() => {
    fetch('/resume.pdf', { method: 'HEAD' })
      .then(res => {
        const ct = res.headers.get('content-type') || '';
        setHasPdf(res.ok && ct.includes('pdf'));
      })
      .catch(() => setHasPdf(false));
  }, []);

  return (
    <div>
      <h2 className="section-heading">
        <span className="section-heading-icon">📄</span>
        Resume
      </h2>

      <div className="resume-actions">
        <a href="/resume.pdf" download="Shajjad_Hossain_Seam_Resume.pdf" className="btn btn-primary">
          <FiDownload /> Download PDF
        </a>
        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-secondary">
          <FiEye /> Open in new tab
        </a>
      </div>

      <div className="resume-preview">
        {hasPdf === null && (
          <div className="resume-placeholder">
            <div className="resume-placeholder-icon">⏳</div>
            <p>Checking for resume…</p>
          </div>
        )}
        {hasPdf === true && (
          <iframe
            src="/resume.pdf"
            title="Resume"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        )}
        {hasPdf === false && (
          <div className="resume-placeholder">
            <div className="resume-placeholder-icon">📄</div>
            <p style={{ fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>No resume found</p>
            <p>Drop your PDF here and it will appear instantly:</p>
            <p style={{ marginTop: 10 }}>
              <code>public/resume.pdf</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
