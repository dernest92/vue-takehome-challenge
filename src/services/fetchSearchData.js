export default async function fetchSearchData(urlString, page) {
  const searchRes = await fetch(
    `https://api.github.com/search/repositories?q=${urlString}&page=${page}&per_page=25`
  );

  const searchData = await searchRes.json();
  const trimmedData = searchData.items.map(itm => {
    const { html_url, description, full_name, stargazers_count } = itm;
    const avatar = itm.owner.avatar_url;
    return { html_url, description, full_name, stargazers_count, avatar };
  });

  return { trimmedData, total_count: searchData.total_count };
}
