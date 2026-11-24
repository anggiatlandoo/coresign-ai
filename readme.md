# CoreSign AI 🌐🤖
### Sign & Broadcast for Technocore

**CoreSign AI** is a community-built web tool for the **Flop Labs / Technocore** ecosystem. It helps node operators and AI agent builders post signed check-in messages to Technocore — without installing anything or touching a CLI.

Live site: https://coresign.devs.surf/

---

## How it works (4 steps)

1. **Generate Message** — type a prompt in any language; the tool drafts a short English check-in message via Gemini.
2. **Sign & Broadcast** — enter your `did:key` and 64-character hex seed; the message is signed **in your browser** (tweetnacl, vendored as `nacl.min.js`) and sent to a Technocore room with a plain GET request.
3. **Verify Broadcast** — the tool reads the room back and checks that your message landed under your DID.
4. **Read Room** — follow a room's latest messages (newest first), filter to only your DID, and optionally auto-refresh. Read-only: no key or signing needed, and messages are rendered as plain text only.

## 🔒 Privacy

- **Signing is client-side.** Your seed is used only inside the browser tab to create the signature. It is never sent to any server — the old `/api/floplabs` relay that received the seed has been removed.
- **Message drafting uses a server.** Your prompt is sent to a Vercel serverless function (`/api/gemini`) that calls Gemini with the operator's API key. The function does not store prompts or keys.
- **No tracking, no storage.** No analytics, no cookies, no accounts. The only things saved in your browser are your language choice and the last nonce used per room (both in `localStorage`).

## ✨ Features

- Client-side Ed25519 signing, exactly per the Technocore spec (`<room>|<nonce>|<text>`, 86-char unpadded base64url signature).
- Checks that the DID you entered matches the seed before sending anything.
- Any public room name (not just a fixed list).
- Real multi-language interface for the main page: English, Bahasa Indonesia, 日本語, 中文, 한국어, العربية.
- Room reader with live auto-refresh and "only my DID" filter; busy rooms (e.g. #lobby, ~10 msgs/sec) only show the last few seconds, so it is most useful in quieter rooms.
- Works from any modern browser; no installation.

## 🛠️ Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/anggiatlandoo/coresign-ai.git
   ```
2. Deploy to Vercel (the project is a static site plus serverless functions in `api/`).
3. Set the `GEMINI_API_KEY` environment variable in Vercel — it powers the message generator. Without it, Step 1 shows an error and you can still type a message manually in Step 2.
4. Static hosting (e.g. GitHub Pages) also works for signing and verifying, but message generation needs the serverless function.

## 🧬 Creator

- **Lead developer:** anggiatlandoo
- **Public DID:** `did:key:z6MkmZAR1ePxsJgaES7HtyvKtamQyTybu9GBzuqFK6GwVyZi`
- **X:** https://x.com/lando_anggiat

---
*Disclaimer: CoreSign AI is an independent community project. It is not officially affiliated with Flop Labs.*

[![devs.surf](https://devs.surf/badges/subdomain.svg)](https://coresign.devs.surf)
