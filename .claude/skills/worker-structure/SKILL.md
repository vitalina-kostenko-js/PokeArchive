---
name: worker-structure
description: This skill should be used when the user asks to "create a new worker", "scaffold a worker project", "bootstrap a Cloudflare Workers project", "add a module", "add a widget", "add a feature", "add an entity", "add a DTO", "add a Durable Object", "add a shared util/middleware/service", "register a route", or "audit the worker architecture". Provides the canonical Feature-Sliced Design (Layer/Slice/Segment) layout for Cloudflare Workers + Hono services in the paynext ecosystem.
---

# worker-structure

Provide the canonical architectural pattern for **Cloudflare Workers + Hono** services. The pattern follows **Feature-Sliced Design (FSD)**: code is organised into **Layers** (top-level concerns), each Layer contains **Slices** (one folder per business unit), and Slices may contain **Segments** (named subfolders by purpose).

Names in this document are placeholders. `<module>`, `<widget>`, `<feature>`, `<entity>`, `<segment>` stand in for the resource being built — the skill describes the pattern, not specific names.

## When to use

Apply this skill to:
- Bootstrap a new worker project from zero (see `references/bootstrap.md`).
- Add a Slice to any Layer of an existing project (module, widget, feature, entity model, DTO, shared segment).
- Audit an existing project against the pattern (file layout, naming, layer dependency direction).

Skip this skill for one-line edits, bug fixes, and refactors *inside* an existing slice.

## Architecture

```
src/
├── app/
│   ├── <entry>.ts                  # Entry — Hono app, global middleware, error handlers, DO re-exports.
│   │                               # One file per worker target (e.g. server.ts, api.ts, cron.ts);
│   │                               # `wrangler.<entry>.jsonc` `main` points at the chosen entry.
│   ├── routes/                     # LAYER — API routing (mounts modules)
│   │   ├── <entry>.routes.ts       # One aggregator per <entry>.ts; can be many.
│   │   └── index.ts
│   ├── modules/                    # LAYER — HTTP-facing business logic
│   │   └── <module>/               # Slice
│   │       ├── <module>.module.ts
│   │       ├── <module>.service.ts
│   │       └── index.ts
│   ├── widgets/                    # LAYER — complex reusable behaviour (composes features/entities)
│   │   └── <widget>/               # Slice
│   │       ├── <widget>.service.ts
│   │       ├── <widget>.interface.ts   # optional
│   │       ├── <widget>.constant.ts    # optional
│   │       └── index.ts
│   ├── features/                   # LAYER — single-purpose reusable capabilities
│   │   └── <feature>/              # Slice
│   │       ├── <feature>.service.ts
│   │       ├── <feature>.interface.ts  # optional
│   │       ├── <feature>.constant.ts   # optional
│   │       └── index.ts
│   ├── entities/                   # LAYER — business entities
│   │   ├── models/                 # Slice — persistence definitions (engine-agnostic)
│   │   │   ├── <entity>.object.ts        # Cloudflare Durable Object
│   │   │   ├── <entity>.table.ts         # Drizzle schema
│   │   │   ├── <entity>.collection.ts    # Payload CMS
│   │   │   ├── <entity>.model.ts         # ORM model fragment
│   │   │   └── index.ts
│   │   ├── dto/                    # Slice — Zod request/response schemas + inferred types
│   │   │   ├── <entity>.dto.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── shared/                     # LAYER — cross-layer reusable code
│       ├── components/             # Segment — JSX/UI components
│       ├── constants/              # Segment — global constants (*.constant.ts)
│       ├── interfaces/             # Segment — global types (*.interface.ts)
│       ├── middlewares/            # Segment — Hono middleware (*.middleware.ts)
│       ├── services/               # Segment — shared services (*.service.ts)
│       └── utils/                  # Segment — pure utilities (*.util.ts)
├── config/                         # Application config (env, server, swagger, …)
└── pkg/                            # External integrations (auth, cache, validator, …)
```

### Layer dependency rule

Imports may flow **only downward**:
```
routes → modules → widgets → features → entities → shared
```
`pkg/` and `config/` are infra; any layer may import from them. Never import upward (entity must not import a feature; feature must not import a widget; module must not import another module).

### Folder discipline

Every folder ships an `index.ts` barrel. Consumers import from the folder, not the file. Folder names are **kebab-case**; the slice folder name matches the file prefix (`<module>/<module>.module.ts`).

## Layer responsibilities

**`app/<entry>.ts`** — one file per worker target. A project may ship several entries (e.g. `server.ts` for the public API, `cron.ts` for scheduled jobs, `inbound.ts` for an integration receiver); each becomes a separate Cloudflare Worker by pointing `wrangler.<entry>.jsonc` `main` at it. Each entry instantiates `new Hono<{ Bindings: Cloudflare<Entry>Bindings }>()` against its own per-entry bindings interface, applies global middleware from `config/server.config.ts` (or its own config slice), mounts the public health route, hands off to its matching `app/routes/<entry>.routes.ts`, wires `notFound` and `onError`, re-exports every Durable Object class it owns, and default-exports the app.

**`app/routes/`** — one aggregator per `<entry>.ts`, named `<entry>.routes.ts`. Each aggregator imports the modules that entry exposes and mounts them (`app.route('/v1', <module>Module)`); for many modules in one project, mount them all in the matching aggregator. Auth-gated traffic goes under `/v1/*` (or another prefix) so the auth middleware covers it. No business logic. The barrel exports each aggregator by name.

**`app/modules/<module>/`** — HTTP resource. `<module>.module.ts` is thin: validate with the project's `zValidator`, delegate to the service, schedule cache invalidation via `ctx.executionCtx.waitUntil(...)` on mutations. `<module>.service.ts` holds the logic; reads params/body via `ctx.req.param(...)` / `ctx.req.json()`; wraps work in `try/catch` returning `{ error, message }` 500 on failure.

**`app/widgets/<widget>/`** — composition of multiple features/entities behind one orchestrator. Pure logic, no Hono routing.

**`app/features/<feature>/`** — single reusable capability (e.g. risk-score lookup, idempotency check). Pure logic. If orchestration of multiple features appears, lift it to a widget.

**`app/entities/models/`** — persistence definitions, **engine-agnostic**. Suffix indicates the technology: `*.object.ts` for Cloudflare DO classes, `*.table.ts` for Drizzle, `*.collection.ts` for Payload CMS, `*.model.ts` for generic ORM fragments, `*.generated.ts` for DB-introspection output. Mixed engines may coexist in one project. Cloudflare-specific lifecycle rules live in `references/cloudflare.md`.

**`app/entities/dto/`** — Zod schemas and inferred types for the entity's request/response surface. One `<entity>.dto.ts` per entity.

**`app/shared/`** — cross-cutting code organised by **Segment**: `components/` (JSX), `constants/`, `interfaces/`, `middlewares/` (project-specific Hono middleware), `services/` (services not tied to a single slice), `utils/` (pure utilities, no Hono dependency).

**`config/`** — `env.config.ts` (Zod over `process.env` via `@t3-oss/env-core`, exports `envConfig`), `server.config.ts` (cors/timeout/rate-limit/logger), `swagger.config.ts` (OpenAPI), one file per concern, all re-exported from `index.ts`.

**`pkg/`** — external-system clients and framework-level utilities. Each subfolder is self-contained with its own `index.ts`. Each integration earns its own slot when it has a distinct concern; `pkg/middleware/` is the catch-all for generic Hono middleware that does not justify a dedicated folder. Common subfolders: `pkg/auth/`, `pkg/validator/` (the `zValidator` wrapper that standardises the `{ error: 'Bad Request', message }` 400 shape — kept separate from middleware because it is a validation utility, not a middleware), `pkg/cache/` (Redis or other external cache client), `pkg/middleware/` (any other reusable Hono middleware).

## File naming (suffix = role)

| Suffix | Role | Layer |
|---|---|---|
| `*.module.ts` | Hono sub-app + route handlers | `modules/` |
| `*.service.ts` | Business logic | modules, widgets, features, shared/services |
| `*.object.ts` | Cloudflare Durable Object class | `entities/models/` |
| `*.table.ts` | Drizzle table schema | `entities/models/` |
| `*.collection.ts` | Payload CMS collection | `entities/models/` |
| `*.model.ts` | ORM model fragment | `entities/models/` |
| `*.dto.ts` | Zod schemas + inferred types | `entities/dto/` |
| `*.interface.ts` | TypeScript types | widgets, features, shared/interfaces |
| `*.constant.ts` | Static values, enums | widgets, features, shared/constants |
| `*.middleware.ts` | Hono middleware | shared/middlewares, pkg/middleware |
| `*.util.ts` | Pure utility functions | shared/utils |
| `*.config.ts` | Configuration | `config/` |
| `*.pkg.ts` | Public surface of a `pkg/` folder | `pkg/<name>/` |
| `*.routes.ts` | Aggregated route registration | `app/routes/` |

## Symbol naming

- **Zod schemas** in `*.dto.ts`: prefix `S<Name>` (`SCreate<X>Req`, `SUpdate<X>Req`, `S<X>Res`, `S<Xs>Res` for list).
- **Inferred types**: `I<Name> = z.infer<typeof S<Name>>`, exported next to the schema.
- **Enums**: `E<Name>`.
- **List response**: `{ data: T[], meta: { total: number } }`.
- **Module export**: `<module>/index.ts` re-exports `export { default as <module>Module } from './<module>.module'`.
- **Service export**: `export const <name>Service = { ... }` — plain object literal of async methods, each `(ctx: Context) => ctx.json(...)`.

## Mode A — Bootstrap a new worker

Follow `references/bootstrap.md` step-by-step. It covers `package.json`, `wrangler.<entry>.jsonc` (four env blocks with no inheritance), `tsconfig.json`, ESLint flat config, Prettier, `.gitignore`, `src/config/`, `src/pkg/`, the first `src/app/<entry>.ts`, the matching `src/app/routes/<entry>.routes.ts`, the first module, `yarn cf-typegen`, and verification.

## Mode B — Add a Slice to an existing project

Pick the Layer the new code belongs to (top-down: routes → modules → widgets → features → entities → shared). Pull complexity *down* the stack: when a module's logic is reused by another module, lift the shared part into a feature; when types appear in 3+ layers, lift them into `shared/interfaces/`.

### B1. New module
1. Create `src/app/modules/<module>/{<module>.module.ts, <module>.service.ts, index.ts}`. Re-export `<module>Module` from `index.ts`.
2. Add Zod schemas in `src/app/entities/dto/<module>.dto.ts` using `S*` / `I*` naming. Re-export from the dto barrel.
3. If persistence is needed, add the corresponding file to `src/app/entities/models/` (suffix per engine; see `references/cloudflare.md` for DO-specific lifecycle).
4. Mount in the matching `src/app/routes/<entry>.routes.ts` (the aggregator that belongs to the worker entry serving this module) via `app.route('/v1', <module>Module)`.
5. Caching: pick a `cacheName` scheme; add `waitUntil(...)` invalidation on every mutation. Detail in `references/cloudflare.md`.
6. Run `yarn format`.

### B2. New widget / feature
1. Create `src/app/widgets/<widget>/` or `src/app/features/<feature>/` with `<name>.service.ts`, optional `*.interface.ts`, `*.constant.ts`, and `index.ts`.
2. Compose from layers below (entities, shared). Do not call modules. Do not import another widget from a feature.

### B3. New entity (DTO and/or model)
1. DTO only: `src/app/entities/dto/<entity>.dto.ts`, re-export.
2. With persistence: pair with `<entity>.<engine>.ts` under `entities/models/`. For DO, follow `references/cloudflare.md` (re-export from the relevant `src/app/<entry>.ts`, mirror across env blocks, regenerate types).

### B4. New shared segment file
1. Pick the right segment (`constants/`, `interfaces/`, `middlewares/`, `services/`, `utils/`, `components/`).
2. Use the matching suffix (`*.constant.ts`, `*.interface.ts`, `*.middleware.ts`, `*.service.ts`, `*.util.ts`).
3. Re-export from the segment's `index.ts`.

### B5. New `pkg/` integration
1. New folder `src/pkg/<name>/` with `index.ts` and `<name>.pkg.ts`. For larger integrations split into `service`, `plugin`, `constants` files (e.g. `pkg/auth/`).
2. Read configuration from `envConfig`. Do not touch `process.env` directly.

## Comments

Short label-style `//` comments sit above named symbols and expand on the identifier in 1–5 words. Routes use `// VERB /path` shorthand. Methods inside a service/class get a single-verb label. Full convention, examples, and anti-patterns live in `references/comments.md`.

## Examples

Canonical file shapes for every layer live in `examples/`. The tree mirrors the canonical `src/` layout, so `cp -r examples/* <project>/src/` (with placeholder substitution) yields a working skeleton for a new project. Use the relevant subtree for incremental refactors of an existing project.

**Placeholder conventions:**
- **Identifiers** inside files use angle-bracket notation: `<entry>`, `<module>`, `<entity>`, `<Module>`, `<Entity>`, `S<Module>Req`, `I<Module>Res`, `E<Entity>Table`, `<DOClass>`, `<BINDING>`, `Cloudflare<Entry>Bindings`. Replace every `<…>` before saving in a real project.
- **Per-entry bindings interface.** Each `<entry>.ts` ships its own `Cloudflare<Entry>Bindings` type generated by `wrangler types --env-interface Cloudflare<Entry>Bindings` (one invocation per entry; multiple worker entries get distinct interfaces — `CloudflareServerBindings`, `CloudflareCronBindings`, etc.). Sub-apps that mount onto an entry parameterise their `Hono<{ Bindings: Cloudflare<Entry>Bindings }>` with the matching name.
- **File and folder names** with placeholders use double-underscore notation: `__entry__.ts`, `__entry__.routes.ts`, `__module__/`, `__entity__/`. Rename to the real entry/slice name when copying.
- Files are **shape references, not runnable code** — angle-bracket identifiers are invalid TypeScript. The contract is structural: imports, layer dependencies, function signatures, return shapes, comment style.

**Multiplicity:**
The example tree shows **one** of each placeholder file. Real projects will have many: a project may ship multiple worker entries (`server.ts`, `cron.ts`, `inbound.ts`), each with its own `<entry>.routes.ts` aggregator under `app/routes/`; many `<module>/` folders under `app/modules/`; many `<widget>/` and `<feature>/` slices; many entities under `app/entities/dto/` and `app/entities/models/`. Treat each example as the *template for one*, then duplicate per concrete name.

## Resources

- **`references/bootstrap.md`** — Mode A: full new-project scaffold (package.json, per-entry `wrangler.<entry>.jsonc`, tsconfig, tooling, configs, server entry).
- **`references/cloudflare.md`** — Cloudflare-specific contract: Durable Object lifecycle, env-block mirroring, per-route caching with `waitUntil` invalidation, validator wrapper requirements.
- **`references/comments.md`** — comment-style convention: when to comment, what earns a comment, anti-patterns.
- **`references/pitfalls.md`** — common mistakes and the pre-merge verification checklist.
- **`examples/`** — canonical file shapes per layer with `<…>` placeholder identifiers and `__…__` placeholder folders.
