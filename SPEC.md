# Showed — proof of attendance without a wallet

## Goal
Hackathon MVP (Solana, Devnet). Event organizers create an event and get a QR/claim link. An attendee scans it, logs in by email, and receives a compressed NFT badge with no wallet setup and no fees. All badges appear on a public profile page.

## Rules
- Network: Solana Devnet only.
- Keep it simple and working end-to-end over feature-rich. No unnecessary dependencies.
- Never commit secrets. Secrets live in .env.local (gitignored). Provide .env.example.
- Before using Privy, Metaplex Bubblegum, Helius or Supabase, check their CURRENT official docs (APIs change) and use up-to-date package names.
- After each completed step: run the app/build, fix errors, then git commit.

## Stack
- Next.js (App Router, TypeScript, Tailwind), deployed on Vercel
- Privy: email login + embedded Solana wallet created on login
- Metaplex Bubblegum (compressed NFTs) via Umi, minted by a server keypair that pays all fees
- Helius DAS API: read a wallet's cNFTs for the profile page
- Supabase: events and claims tables (server-side access with service key)

## Pages and API
- / : landing page, one-sentence pitch, button "Create event"
- /create : form (title, description, date, image URL or upload) -> saves event -> shows claim link + QR code (downloadable)
- /claim/[eventId] : event card, login by email via Privy, button "Get badge" -> mint; states: loading, success (link to Solana Explorer, devnet), already claimed, error. Mobile-first.
- /u/[address] : profile with grid of badges (name, date, image), stats (number of events, first event), "Copy link" button, friendly empty state
- POST /api/claim : verify Privy auth token server-side, check event exists, enforce one claim per wallet per event, mint cNFT, store claim, return tx signature

## Data
- events: id, title, description, date, image_url, created_at
- claims: id, event_id, wallet, signature, created_at, UNIQUE(event_id, wallet)

## Environment variables
HELIUS_API_KEY, NEXT_PUBLIC_PRIVY_APP_ID, PRIVY_APP_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SERVER_KEYPAIR, MERKLE_TREE_ADDRESS, COLLECTION_ADDRESS, NEXT_PUBLIC_SITE_URL

## Scripts
- scripts/generate-keypair.ts : generate a server keypair, print public address, write secret to .env.local
- scripts/setup-tree.ts : create Bubblegum merkle tree (depth 14, buffer 64) and a collection on Devnet, print addresses

## Definition of done
Works on a phone via the deployed URL: create event -> scan QR -> email login -> badge minted -> badge visible on /u/[address]. README with setup instructions, Devnet addresses and an example transaction.
