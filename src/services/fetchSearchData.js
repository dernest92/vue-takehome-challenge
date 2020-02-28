export default async function fetchSearchData(query, page, perPage) {
  const url = process.env.VUE_APP_API_URL;

  const searchRes = await fetch(
    `${url}/getSearchData?q=${query}&page=${page}&per_page=${perPage}`
  );

  const searchData = await searchRes.json();
  const trimmedData = searchData.items.map(itm => {
    const { html_url, description, full_name, stargazers_count } = itm;
    const avatar = itm.owner.avatar_url;
    return { html_url, description, full_name, stargazers_count, avatar };
  });

  return { trimmedData, total_count: searchData.total_count };
}
