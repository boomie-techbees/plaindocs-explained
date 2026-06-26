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

> **Note:** PlainDocs includes PII redaction via Bedrock Guardrails. Authenticated users can enable Private mode for sensitive or confidential documents.

---

## Architecture

```
Browser (Lovable / React)
    ↓
Amazon Cognito (Auth)
    ↓
Amazon API Gateway (HTTP API)
    ↓
AWS Lambda (Python 3.14)
    ↓               ↓
Bedrock          Amazon Comprehend
Guardrails       (Language Detection)
    ↓
Amazon Bedrock — Nova Lite
    ↓
Amazon DynamoDB
```

| Service | Role |
|---|---|
| Amazon Bedrock (Nova Lite) | Document analysis and plain-language summary generation |
| Amazon Comprehend | Input language detection |
| Bedrock Guardrails | Content safety and PII redaction |
| AWS Lambda | Backend logic — receives document, calls Bedrock, returns structured JSON |
| Amazon API Gateway | HTTP endpoint — routes POST requests from the frontend to Lambda |
| Amazon DynamoDB | Store analysis results |
| Amazon Cognito | User authentication |


---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (via Lovable) |
| Backend | AWS Lambda (Python 3.14) |
| API | Amazon API Gateway (HTTP API) |
| AI | Amazon Bedrock (Model: Nova Lite) + Comprehend + Guardrails |
| Database | Amazon DynamoDB |
| Auth | Amazon Cognito |
| Hosting | Lovable / techbees.me |

---

## Potential Future Work
- Scanned document support via Amazon Textract (with user-facing toggle)
- .docx file support
- Voice output of results
---

## Disclaimer

PlainDocs provides general information only and is not a substitute for legal advice. AI-generated results may contain errors. Language quality varies for less common languages.

---

*Part of an intentional portfolio strategy demonstrating range across tools, tech stacks, and AWS services. Each app in the TechBees portfolio targets a different platform or ecosystem.*
