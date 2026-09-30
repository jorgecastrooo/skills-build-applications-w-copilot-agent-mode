# Frontend Environment

In Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` with the Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The variable is required for the Codespaces API URL and Vite exposes it to the browser at build time. If it is unset, the frontend safely uses `http://localhost:8000/api/` for local development. Restart the Vite server after changing `.env.local`.

The API URL in Codespaces is `https://<codespace-name>-8000.app.github.dev/api/`.
