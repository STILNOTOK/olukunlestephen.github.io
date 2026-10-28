# Ask Olukunle AI — Cloudflare Worker

This Worker is the secure backend for the Ask Olukunle AI chat widget on olukunlestephen.com. The website stays on GitHub Pages; the Worker keeps the OpenAI API key server-side. Cloudflare Workers supports encrypted secrets for API keys.

## Deploy

1. Create a Cloudflare Worker named `ask-olukunle-ai` and upload this Worker, or use Wrangler.
2. Add the secret `OPENAI_API_KEY` to the Worker.
3. Attach the custom Worker domain `ai.olukunlestephen.com`.
4. Confirm `POST https://ai.olukunlestephen.com/chat` works.
5. Upload the website files from the main ZIP to GitHub Pages.

### Wrangler option

```bash
npm install -g wrangler
wrangler login
cd ask-olukunle-ai-worker
wrangler secret put OPENAI_API_KEY
wrangler deploy
```

When prompted for `OPENAI_API_KEY`, paste the API key without committing it to GitHub.

## Important

The website JavaScript contains only the Worker URL, never the OpenAI key. Do not put an OpenAI API key into GitHub Pages HTML/JS.

The Worker currently allows requests from `https://olukunlestephen.com`. If you later add another official domain, update `ALLOWED_ORIGIN` in `src/index.js`.

For production, consider adding Cloudflare Turnstile or stronger rate limiting before publicly promoting the chatbot.
