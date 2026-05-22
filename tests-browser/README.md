# Browser tests

End-to-end tests that drive a real chromium-family browser against an
isolated `http-nu` instance. Useful for verifying client-side wiring
(Datastar bindings, key handling, fetch chains) that pure-projection
tests can't cover.

## Setup

```bash
mise run test:browser:install
```

Uses `playwright-core` (no bundled browser) + a system-installed
Chrome/Chromium/Edge. Detection is automatic across macOS / Linux /
Windows — see [find-chromium.mjs](./find-chromium.mjs) for the candidate
paths. Override with `CHROMIUM_PATH=/path/to/binary`.

We deliberately do **not** install a browser; we use whatever's already
on the system.

## Run

```bash
mise run test:browser
```

Each test file spawns its own `http-nu --datastar` on a unique port with
a fresh `mktemp`d store, so tests are isolated from each other and from
the dev server.
