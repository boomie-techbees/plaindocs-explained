# PlainDocs

**Understand any document in minutes.**

PlainDocs is an AI-powered document explainer that breaks down legal documents, terms of service, contracts, and policies into plain language — no legal background required. Upload a PDF, paste text, or enter a URL, choose your output language, and get a structured breakdown instantly.

Built by [Boomie Odumade](https://techbees.me) · Part of the [TechBees app portfolio](https://techbees.me/apps)

---

## What It Does

Most people click "agree" without reading. PlainDocs changes that — without requiring you to know how to talk to AI. You get the same structured output every time:

- **Summary** — what the document is and what it governs
- **Key Rights** — what you're entitled to
- **Key Risks** — what could go wrong
- **Watch Out For** — specific clauses worth paying attention to
- **Other Notable Terms** — anything important that doesn't fit the above (when present)

Supports multiple output languages including English, Spanish, French, German, Portuguese, Japanese, Chinese, Yoruba, and Krio.

---

## Architecture

```
Browser (Lovable / React)
    ↓
Amazon API Gateway (HTTP API)
    ↓
AWS Lambda (Python 3.14)
    ↓
Amazon Bedrock — Nova Lite
```

| Service | Role |
|---|---|
| Amazon Bedrock (Nova Lite) | Document analysis and plain-language summary generation |
| AWS Lambda | Backend logic — receives document, calls Bedrock, returns structured JSON |
| Amazon API Gateway | HTTP endpoint — routes POST requests from the frontend to Lambda |
| Amazon Cognito *(Stage 3)* | User auth for saved results |
| Amazon DynamoDB *(Stage 3)* | Store and retrieve past analyses |
| Bedrock Guardrails *(Stage 5)* | Content safety, PII redaction |

---

## Build Stages

### ✅ Stage 1 — MVP
- Paste text or upload a PDF
- Structured plain-language output in 9 languages
- Powered by Amazon Bedrock Nova Lite via Lambda + API Gateway
- Built with Lovable (React frontend)

### ✅ Stage 2 — URL Input
- Paste a URL instead of uploading or copying text
- Detects PDF vs HTML automatically and routes accordingly
- Better error handling for inaccessible URLs

### 🔜 Stage 3 — Structured Output + User Accounts
- Risk scoring and flagged clauses
- User accounts via Amazon Cognito
- Save and retrieve past analyses via Amazon DynamoDB

### 🔜 Stage 4 — Shareable Results
- Every analysis generates a shareable link
- Builds on DynamoDB + Cognito from Stage 3

### 🔜 Stage 5 — Safety & Compliance Layer
- Content safety filters and PII redaction via Bedrock Guardrails
- Topic controls for sensitive document types

### 🔜 Stage 6 — Potential Future Work
- Scanned document support via Amazon Textract
- User-facing toggle for scanned vs digital documents
- .docx file support
- Voice output of results

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (via Lovable) |
| Backend | AWS Lambda (Python 3.14) |
| API | Amazon API Gateway (HTTP API) |
| AI | Amazon Bedrock — Nova Lite |
| Hosting | Lovable / techbees.me |

---

## Disclaimer

PlainDocs provides general information only and is not a substitute for legal advice. AI-generated results may contain errors. Language quality varies for less common languages.

---

*Part of an intentional portfolio strategy demonstrating range across tools, tech stacks, and AWS services. Each app in the TechBees portfolio targets a different platform or ecosystem.*
