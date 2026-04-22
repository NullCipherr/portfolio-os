/**
 * Fetches repositories from GitHub and regenerates portfolio project data.
 * Usage: node scripts/sync-github-projects.mjs [github-username]
 */
import fs from 'node:fs';
import path from 'node:path';

const username = process.argv[2] || 'NullCipherr';

async function main() {
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-os-sync-script',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error ${response.status}: ${response.statusText}`);
  }

  const repos = await response.json();

  const projects = repos
    .filter((repo) => !repo.archived)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .map((repo) => {
      const tags = [];
      if (repo.language) tags.push(repo.language);
      tags.push('GitHub');

      return {
        id: repo.id,
        title: repo.name,
        description: repo.description || 'Projeto público hospedado no GitHub.',
        image: `https://picsum.photos/seed/${encodeURIComponent(repo.name)}/600/400`,
        tags,
        liveUrl: repo.homepage || undefined,
        repositoryUrl: repo.html_url,
      };
    });

  const output = `/**\n * features/portfolio/data/githubProjects.ts\n * Portfolio OS module with a specific architectural responsibility.\n * Generated from GitHub API (${username} repositories).\n */\n\nexport interface GithubProject {\n  id: number;\n  title: string;\n  description: string;\n  image: string;\n  tags: string[];\n  liveUrl?: string;\n  repositoryUrl?: string;\n}\n\nexport const GITHUB_PROJECTS: GithubProject[] = ${JSON.stringify(projects, null, 2)};\n`;

  const filePath = path.join(process.cwd(), 'src/features/portfolio/data/githubProjects.ts');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, output, 'utf8');

  console.log(`Synced ${projects.length} repositories to ${filePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
