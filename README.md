# PlainDocs

**Understand any document in minutes.**

PlainDocs is an AI-powered document explainer that breaks down legal documents, terms of service, contracts, and policies into plain language - no legal background required. Upload a PDF, paste text, or enter a URL, choose your output language, and get a structured breakdown instantly.

Built by [Boomie of TechBees](https://techbees.me) · Part of the [TechBees app portfolio](https://techbees.me/apps)

This repo has most of the code and is in sync with Lovable.
Backend code from AWS (e.g. code for Lambdas) is at [github.com/boomie-techbees/plaindocs-backend](https://github.com/boomie-techbees/plaindocs-backend)

---

## What It Does

Most people click "agree" without reading. PlainDocs changes that — without requiring you to know how to talk to AI. You get the same structured output every time:

- **Summary** — what the document is and what it governs
- **Key Rights** — what you're entitled to
- **Key Risks** — what could go wrong
- **Watch Out For** — specific clauses worth paying attention to
- **Other Notable Terms** — anything important that doesn't fit the above (when present)

Supports multiple output languages including English, Spanish, French, German, Portuguese, Japanese, Chinese, Yoruba, and Krio.

> **Note:** PlainDocs includes PII redaction via Bedrock Guardrails. However, it is not intended for sensitive or confidential documents.

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
    ↓
Amazon DynamoDB (Stage 3+)
```

| Service | Role |
|---|---|
| Amazon Bedrock (Nova Lite) | Document analysis and plain-language summary generation |
| AWS Lambda | Backend logic — receives document, calls Bedrock, returns structured JSON |
| Amazon API Gateway | HTTP endpoint — routes POST requests from the frontend to Lambda |
| Amazon DynamoDB | Store analysis results |
| Bedrock Guardrails | Content safety and PII redaction |
| Amazon Cognito | User authentication |

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
- Improved error handling for inaccessible URLs

### ✅ Stage 3 — DynamoDB
- Every successful analysis saved to Amazon DynamoDB in the background
- Captures timestamp, input type, language, and summary

### ✅ Stage 4 — Bedrock Guardrails
- Content safety filters and PII redaction via Bedrock Guardrails
- Replaces the manual sensitive data warning with actual enforcement

### ✅ Stage 5 — Auth + History
- User accounts via Amazon Cognito
- View and revisit past analyses

### 🔜 Stage 6 — Private Doc Mode
- Authenticated users can analyze sensitive or confidential documents safely
- Results stored privately per user

### 🔜 Future Work
- Scanned document support via Amazon Textract (with user-facing toggle)
- .docx file support
- Voice output of results

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (via Lovable) |
| Backend | AWS Lambda (Python 3.14) |
| API | Amazon API Gateway (HTTP API) |
| AI | Amazon Bedrock + Guardrails (Model: Nova Lite) |
| Database | Amazon DynamoDB |
| Auth | Amazon Cognito |
| Hosting | Lovable / techbees.me |

---

## Disclaimer

PlainDocs provides general information only and is not a substitute for legal advice. AI-generated results may contain errors. Language quality varies for less common languages.

---

*Part of an intentional portfolio strategy demonstrating range across tools, tech stacks, and AWS services. Each app in the TechBees portfolio targets a different platform or ecosystem.*
