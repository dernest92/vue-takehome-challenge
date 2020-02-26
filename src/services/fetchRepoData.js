export default async function fetchRepoData(repoFullName) {
  const url = process.env.VUE_APP_API_URL;
  const commitsRes = await fetch(`${url}/getCommit?repo=${repoFullName}`);

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

// add error handling
