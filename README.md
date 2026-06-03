# Minutes Calculator

A sweet little React calculator for adding or subtracting minutes and seconds.
It is styled with soft pinks, dreamy purples, bold black accents, and a tiny
Kuromi-inspired mascot moment.

## What It Does

- Add two time values together.
- Subtract one time value from another.
- Enter minutes and seconds separately.
- See the result normalized as `minutes:seconds`, like `17:15` or `-1:35`.
- Clear everything and start fresh.
- Enjoy a cute responsive layout on desktop and mobile.

## Preview

Try examples like:

- `12:30 + 4:45 = 17:15`
- `1:05 - 2:40 = -1:35`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

## Built With

- React
- TypeScript
- Vite
- CSS with a pastel-punk pink and purple vibe

## Project Structure

```text
src/
  App.tsx      # Calculator logic and UI
  App.css      # Cute calculator styling
  index.css    # Global page styles
```

## Notes

Seconds can be bigger than `59`; the calculator will still normalize the final
answer. For example, `1 minute 90 seconds` is treated as `2:30`.
