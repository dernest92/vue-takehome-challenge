export default async function fetchRepoData(repoFullName) {
  const url = "https://api.github.com";

  const commitsRes = await fetch(`${url}/repos/${repoFullName}/commits`);

  const commitsData = await commitsRes.json();

  const {
    sha,
    html_url,
    commit: {
      author: { name, email, date }
    }
  } = commitsData[0];

  return {
    repoFullName,
    lastUpdated: date,
    authorName: name,
    hash: sha,
    authorEmail: email,
    commitLink: html_url
  };
}
