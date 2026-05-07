import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiClock, FiAlertCircle } from 'react-icons/fi';
import { useGitHubRepos } from '../hooks/useGitHubRepos';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr);
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return '1 month ago';
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

function SkeletonCard() {
  return (
    <div style={skeletonCard}>
      <div style={{ ...skeletonLine, width: '60%', height: 16, marginBottom: 10 }} />
      <div style={{ ...skeletonLine, width: '100%', height: 12, marginBottom: 6 }} />
      <div style={{ ...skeletonLine, width: '80%', height: 12, marginBottom: 16 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ ...skeletonLine, width: 50, height: 22 }} />
        <div style={{ ...skeletonLine, width: 50, height: 22 }} />
      </div>
    </div>
  );
}

export default function ProjectsWindow() {
  const { repos, loading, error } = useGitHubRepos();

  return (
    <div>
      <h2 className="section-heading">
        <span className="section-heading-icon"><FiGithub /></span>
        GitHub Projects
        {!loading && !error && (
          <span style={countBadge}>{repos.length} repos</span>
        )}
      </h2>

      {/* Loading state */}
      {loading && (
        <div>
          <div style={fetchingBanner}>
            <span style={fetchingDot} />
            Fetching projects from GitHub…
          </div>
          <div className="projects-grid">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div style={errorBox}>
          <FiAlertCircle size={20} style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Could not load repos</div>
            <div style={{ fontSize: 12 }}>{error}</div>
          </div>
        </div>
      )}

      {/* Repo cards */}
      {!loading && !error && (
        <div className="projects-grid">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="project-card"
            >
              {/* Title */}
              <div className="project-title">
                <FiGithub className="project-title-icon" />
                {repo.name}
              </div>

              {/* Description */}
              <p className="project-desc">
                {repo.description || <span style={{ fontStyle: 'italic', opacity: 0.5 }}>No description</span>}
              </p>

              {/* Language + topics */}
              <div className="project-tech">
                {repo.language && (
                  <span className="tech-badge">{repo.language}</span>
                )}
                {repo.topics?.slice(0, 3).map((t) => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>

              {/* Stats row */}
              <div style={statsRow}>
                {repo.stargazers_count > 0 && (
                  <span style={stat}><FiStar size={11} /> {repo.stargazers_count}</span>
                )}
                {repo.forks_count > 0 && (
                  <span style={stat}><FiGitBranch size={11} /> {repo.forks_count}</span>
                )}
                <span style={{ ...stat, marginLeft: 'auto' }}>
                  <FiClock size={11} /> {timeAgo(repo.pushed_at)}
                </span>
                <span style={externalLink}><FiExternalLink size={11} /> View</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const countBadge = {
  fontSize: 11,
  fontWeight: 500,
  padding: '2px 8px',
  background: 'rgba(0,122,255,0.08)',
  border: '1px solid rgba(0,122,255,0.18)',
  borderRadius: 20,
  color: '#0051a8',
  marginLeft: 4,
};

const statsRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginTop: 4,
};

const stat = {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  fontSize: 11,
  color: 'var(--text-secondary)',
};

const externalLink = {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  fontSize: 11,
  color: '#007AFF',
};

const errorBox = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  padding: '16px 18px',
  background: 'rgba(255,95,87,0.06)',
  border: '1px solid rgba(255,95,87,0.2)',
  borderRadius: 10,
  color: '#c0392b',
  fontSize: 14,
};

const skeletonCard = {
  background: 'var(--card-bg)',
  border: '1px solid var(--card-border)',
  borderRadius: 10,
  padding: 18,
};

const skeletonLine = {
  background: 'rgba(0,0,0,0.07)',
  borderRadius: 4,
  animation: 'pulse 1.4s ease-in-out infinite',
};

const fetchingBanner = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 16px',
  marginBottom: 16,
  background: 'rgba(0,122,255,0.06)',
  border: '1px solid rgba(0,122,255,0.15)',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
  color: '#0051a8',
};

const fetchingDot = {
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: '#007AFF',
  flexShrink: 0,
  animation: 'pulse 1s ease-in-out infinite',
};
