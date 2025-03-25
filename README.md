# Github search engine

## Querying Github API

10 requests per minute allowed for unauthenticated requests.

- `https://api.github.com/search/repositories`

### Query parameters

- `q=...` query string (URIComponent encoded) with selectors:
  - `+in:name,description,topics,readme`
  - `+followers:>=...`
  - `+stars:>=...`
  - `+language:a,b,c`
- `sort=...`, either `stars` or `forks`, if empty it will find the best match.
- `per_page=10` to get the top 10 elements

### Test Requests

```sh
curl https://api.github.com/search/repositories?q=banana+in:name,description,topics,readme+stars:>500&sort=stars&per_page=10 | jq
```

```sh
curl https://api.github.com/search/repositories?q=tensorflow+in:topics+stars:>500&sort=stars&order=desc&per_page=10 | jq
```

## Pages

There are two pages in total in this application.

### Search `/`

### History of search results `/history`

Overview of searched items in the past, ordered by latest request first. When clicking one of the overview items, you will get the details.
