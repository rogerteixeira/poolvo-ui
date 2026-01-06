# poolvo-ui

A fintech-grade React component library with strict Poolvo design standards.

## Development

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build the library
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Run ESLint
- `pnpm check:palette` - Check palette compliance (prevents rgba() and forbidden Tailwind color classes)

### Palette Compliance

The `check:palette` script ensures strict adherence to the Poolvo color palette:

- **Allowed colors only**: `#000000`, `#FFFFFF`, `#2C2C2C`, `#6B6B6B`, `#F5F5F5`
- **Accent color** (for interactive states): `#64748B`
- **No `rgba()`** - Use hex with alpha channel instead (e.g., `#00000080` for 50% opacity)
- **No forbidden Tailwind color classes** - No `text-red-*`, `bg-green-*`, `border-yellow-*`, etc.

This script is designed to run in CI to prevent palette violations from being merged.
