# Tembo - React + Fastify Sample App

A full-stack sample application using [React](https://reactjs.org/) for the frontend and [Fastify](https://fastify.io/) for the backend API.

## Features

- **Greeting generator**: Enter a name, an optional custom greeting, and optionally make it "excited" (UPPERCASE with extra punctuation).
- **ETag support**: The server includes ETag-based HTTP caching via `@fastify/etag`.
- **Proxied dev setup**: The React dev server proxies API calls to the Fastify backend on port 4000.

## Project Structure

```
.
├── server/          # Fastify API server
│   ├── index.js     # Entry point — defines /greet and registers /etag routes
│   ├── etag.js      # ETag plugin routes
│   └── package.json
└── ui/              # React frontend (Create React App)
    ├── src/
    │   ├── App.js   # Main component with greeting form
    │   ├── api.js   # Axios API client
    │   └── index.js
    └── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or later
- npm

## Getting Started

### 1. Start the backend server

```sh
cd server
npm install
npm start
```

The server listens on port `4000` by default (override with the `PORT` environment variable).

### API Endpoints

| Method | Path | Query params | Description |
|--------|------|--------------|-------------|
| GET | `/greet` | `name` (required), `greeting` (optional), `excited` (optional boolean) | Returns a greeting message |
| GET | `/etag/*` | — | ETag-cached routes |

**Example request:**

```sh
curl "http://localhost:4000/greet?name=World&greeting=Hi&excited=true"
# {"message":"HI WORLD!!!"}
```

### 2. Start the frontend

```sh
cd ui
npm install
npm start
```

The React app starts on port `3000` and proxies API requests to `http://localhost:4000`.

## Deployment

This app is designed to be deployed on [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform/):

- The **frontend** deploys as a static site component.
- The **backend** deploys as a web service.

Steps:

1. Clone this repository.
2. Edit `.do/app.yaml` to reference your GitHub repository URLs.
3. Create the app using [doctl](https://github.com/digitalocean/doctl):

```sh
doctl apps create --spec .do/app.yaml
```

## Development Notes

- The server uses `standard` (JavaScript Standard Style) for linting. Run `npx standard` inside `server/` to lint.
- The UI is bootstrapped with [Create React App](https://create-react-app.dev) and uses `axios` for HTTP requests.
- The `ui/config.sh` script generates `src/config.json` before the React build/start scripts run.
