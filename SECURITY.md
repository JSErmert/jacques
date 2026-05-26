# Jacques — Security Standards

**Version:** 1.0
**Last updated:** 2026-05-26
**Owner:** Joshua Ermert (`jseermert@gmail.com`)
**Scope:** static React/Vite music artist site (no auth, no API, no user accounts, no LLM)

This document is two things:

1. **A security policy** — what the Jacques site guarantees and what threats it defends against.
2. **A pre-commit code-review checklist** — Claude reads this file before every commit/push and reviews the diff against it. Any violation blocks the commit until fixed.

Scan §1–§4 for the policy and §9 for the checklist Claude runs.

---

## 1. Security principles

1. **No client-side secrets, ever.** The site has no API keys or backend. If a backend is added (contact form, analytics, etc.), secrets live server-side only.
2. **The user's interaction does not leave the browser.** Audio playback, track navigation, modal interactions — all client-side. No analytics, no trackers, no telemetry.
3. **Defense in depth.** Every security control assumes the layer above it can fail. CSP does not trust the absence of XSS bugs; HSTS does not trust the absence of TLS missteps; SRI is not the only line against a compromised CDN.

---

## 2. Threat model

Threats Jacques explicitly defends against:

| Threat | Defense |
|---|---|
| XSS via track titles / album metadata | All metadata rendered as React children (text nodes, not HTML); no `dangerouslySetInnerHTML`; CSP blocks inline `<script>` execution |
| Dependency supply-chain (typosquat, malicious update) | Trivy scan in CI on every push; Dependabot weekly grouped updates; `npm audit` reviewed at version bump |
| MITM / TLS downgrade | HTTPS-only via Vercel; HSTS header (1y, include subdomains, preload); no HTTP fallback |
| Clickjacking | `X-Frame-Options: DENY` + `frame-ancestors 'none'` in CSP |
| MIME-sniffing / response-content confusion | `X-Content-Type-Options: nosniff` |
| Referer leakage on outbound links | `Referrer-Policy: strict-origin-when-cross-origin` |
| Sensor abuse (camera/mic/geolocation) by a compromised dep | `Permissions-Policy` denies them all |
| Secret accidentally committed to git history | `gitleaks` scan in CI (full history) + local pre-commit hook |
| LocalStorage/cookie data leakage | The site does not write to localStorage or set cookies. No user data is collected. |

Threats Jacques does NOT defend against (acknowledged scope):

- **DDoS** — protected by Vercel's edge infrastructure (within Hobby-tier limits).
- **Physical access to the user's device** — out of scope.
- **Targeted attacks against Vercel/GitHub infrastructure** — relies on the platforms' security posture.

---

## 3. Data handling

Jacques collects no personal data. There is:

- No contact form submission to a backend (mailto-only).
- No newsletter signup.
- No analytics, no Google Tag Manager, no Sentry, no third-party trackers.
- No cookies set by the site.
- No localStorage writes.

If any of the above change, this section updates **and** the threat model in §2 updates with new defenses.

---

## 4. Audio file handling

Audio files in `public/audio/` are served as static assets via Vercel's CDN. The site MUST:

- Use only `<audio>` element with `src` attributes pointing to same-origin paths (or future allowlisted CDN).
- Never accept user-supplied audio URLs.
- Set `media-src 'self'` in CSP (extend the allowlist only when a real external source is required).

---

## 5. Dependency security

### Required

- `package-lock.json` is committed (lockfile pin enforces exact versions in CI).
- Trivy scan in GitHub Actions on every push and PR — blocks merge if HIGH or CRITICAL CVE is found in a fixable dependency.
- Dependabot enabled with weekly grouped updates.
- No `*` or `latest` in any dependency version range.

### Allowed dep changes (no extra review)

- Patch updates within the same minor version
- Type-only packages (`@types/*`)
- Tailwind / PostCSS / Autoprefixer group (build-only)

### Required review (manual approval)

- New direct runtime dependencies (`dependencies` block, not `devDependencies`)
- Major version bumps of any dep
- Build-tool changes (`vite`, `eslint` config, `@vitejs/plugin-react`)

---

## 6. HTTP security headers

Configured in `vercel.json`:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  connect-src 'self';
  img-src 'self' data:;
  media-src 'self';
  font-src 'self' data:;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
```

Tailwind's inline styles require `'unsafe-inline'` in `style-src` — standard tradeoff. No `script-src 'unsafe-inline'` or `'unsafe-eval'` permitted.

---

## 7. CI/CD security

### GitHub Actions workflow MUST

- Use `pull_request` trigger with least-privilege permissions (`contents: read`, `security-events: write`).
- Never run user-controlled code from PRs against secret-bearing environments.
- Run Trivy scan + gitleaks scan + lint + test + build before any merge to `main`.
- Upload SARIF results to the GitHub Security tab for findings visibility.

### Vercel deployment

- Auto-deploy from `main` ONLY. Preview deploys from PRs OK.
- Production env vars (if any are ever added) accessible only on `main` branch builds.

---

## 8. Pre-commit hook

Local enforcement layer via `husky`:

- Lint staged JS/JSX with ESLint (`lint-staged`).
- Run Vitest suite in `--run` mode (blocks commit on test failure).
- Run `gitleaks protect --staged` to catch any secret patterns before they hit history.

Bypass with `--no-verify` is prohibited without explicit operator authorization (see `CLAUDE.md` / operator notes).

---

## 9. Pre-commit Claude review checklist

Before every `git commit` or `git push` to main, Claude reads this checklist and reviews the diff against it. Any FAIL blocks the commit.

### Mandatory checks (FAIL → block commit)

1. **No literal API key / token strings.** Grep diff for `sk-ant-`, `sk_live`, `sk_test`, `ghp_`, `xox`, or any pattern matching common secret formats. FAIL if found.
2. **No `dangerouslySetInnerHTML` introduced.** Existing usages must be reviewed; new usages FAIL unless explicitly justified in commit message AND the source is provably safe.
3. **No new `eval()`, `Function()`, or `new Function(...)` constructors.** FAIL.
4. **No new `fetch()` to external hosts** without explicit justification AND a corresponding `connect-src` allowlist update in `vercel.json`. FAIL.
5. **No new dependencies added without `package-lock.json` updated and pinned exactly.** FAIL.
6. **No `console.log` of user input or device data.** FAIL.
7. **No commented-out code containing keys, tokens, or sensitive paths.** FAIL.
8. **No reduction of HTTP security headers in `vercel.json`.** FAIL if any header in §6 is weakened.
9. **No new third-party scripts, fonts, or assets** loaded from non-allowlisted origins. FAIL.
10. **No new localStorage / cookie writes** without a corresponding update to §3 and a privacy-impact note in the commit message. FAIL.

### Advisory checks (WARN → flag in commit message, don't block)

11. New TODO/FIXME comments — note them.
12. New component added without corresponding test — flag for future.
13. Significant visual/UX changes that affect public positioning — note them in commit message.

---

## 10. Vulnerability disclosure

If you find a security issue in the Jacques site:

- Email: jseermert@gmail.com with subject "Jacques security"
- DO NOT open a public GitHub issue with vulnerability details
- Expected response: acknowledgment within 7 days, mitigation plan within 30 days for HIGH/CRITICAL severity

---

## 11. Changelog

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-05-26 | Initial SECURITY.md authored. Static-site scope (no LLM, no API, no accounts). Threat model documented; pre-commit Claude review checklist defined; CI/CD security headers + gitleaks + Trivy + Dependabot baseline established. |
