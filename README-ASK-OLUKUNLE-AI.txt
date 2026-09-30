ASK OLUKUNLE AI — SETUP

The website now contains a floating “Ask Olukunle AI” chat widget. The secure backend is in the separate folder `ask-olukunle-ai-worker`.

IMPORTANT: GitHub Pages cannot safely hold an OpenAI API key. The Worker keeps the key secret and calls OpenAI server-side.

SETUP ORDER
1. Deploy the Cloudflare Worker in `ask-olukunle-ai-worker`.
2. Add your OpenAI API key as the Worker secret named OPENAI_API_KEY.
3. Give the Worker the custom domain `ai.olukunlestephen.com`.
4. The website widget is already configured to call https://ai.olukunlestephen.com/chat.
5. Upload the website files to your GitHub Pages repository.

If you choose a different Worker URL, edit `ask-ai.js` and change API_URL.
