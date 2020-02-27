# GitHub Scraper

[Live Demo](https://vue-challenge.netlify.com/)

## Challenge Outline

Create a Vue app that authenticates with and uses data from the GitHub API.
For at least five repositories display the following information in a table:

- The name of the repo
- The last time that it was updated
- The hash of the last commit
- The name and email of the person who made the last commit

## Local setup

### Install dependencies

```
npm install
```

### Create an .env.local file for local VUE_APP environment variables

```
VUE_APP_API_URL=http://127.0.0.1:9000
```

### Create a lambda.env file for local Lambda function environment variables

```
ACCESS_TOKEN=<Github API Access Token>
```

### Compiles and hot-reloads Vue App for development

```
npm run serve
```

### Compiles and hot-reloads Lambda functions on localhost:9000

```
npm run lambda-dev
```
