# Express App - Template

Template for Express Application with TypeScript

- prerequisite

```bash
cp template.env .env
```

## Migrations

### DB Migrate

- db create

```bash
pnpm seq db:create
```

- db drop

```bash
pnpm seq db:drop
```

- migrate all

```bash
pnpm seq db:migrate
```

- migrate status

```bash
pnpm seq db:migrate:status
```

- revert one

```bash
pnpm seq db:undo
```

- revert all

```bash
pnpm seq db:undo:all
```

### Model Generate - example

```bash
pnpm seq model:generate --underscored --name product --attributes name:string,price:integer
```
