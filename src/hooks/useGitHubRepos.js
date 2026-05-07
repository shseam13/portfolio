import { useState, useEffect } from 'react';

const USERNAME = 'shseam13';
const CACHE_KEY = `gh_repos_${USERNAME}`;
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

export function useGitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Serve from cache if still fresh
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setRepos(data);
          setLoading(false);
          return;
        }
      }
    } catch {}

    fetch(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=30&type=public`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // Exclude forks, keep own repos sorted by last push
        const filtered = data
          .filter((r) => !r.fork)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: filtered, timestamp: Date.now() })
          );
        } catch {}

        setRepos(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { repos, loading, error };
}
