export default async function fetchRepoData(user, repo) {
  const url = "https://api.github.com";

  const commitsRes = await fetch(`${url}/repos/${user}/${repo}/commits`);

  const commitsData = await commitsRes.json();

  const {
    sha,
    html_url,
    commit: {
      author: { name, email, date }
    }
  } = commitsData[0];

  return {
    repoUserName: user,
    repoName: repo,
    lastUpdated: date,
    authorName: name,
    hash: sha,
    authorEmail: email,
    commitLink: html_url
  };
}
