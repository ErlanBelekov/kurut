<div align="center">
<h1>Kurut ORM</h1>
<img width="500" height="200" alt="npm" src="https://www.shoro.kg/wp-content/uploads/2016/08/krutt-1-min.png">
<h6><i>A TypeScript ORM for PostgreSQL with no compromise to the DX</i></h6>
<hr />
</div>

More to come soon, hopefully I don't abandon this project

MVP features:

- TypeScript/JavaScript Entity creation with CRUD methods
- Transactions
- Migrations (?)
- Seeding the DB
- Only Postgres
- PgBouncer support (prepared statements opt-in setting)
- Support for NodeJS
- Heavily tested(unit, integration)

What I need to build:

- Entity Creation API
- CRUD operations
- CI/CD with auto linting, test checks, deployment to npm
- Contribution guides, clear vision and roadmap

Example API:

```
import { defineModel, string, int, relation, timestamp } from "@kurut/core"

export const User = defineModel("User", {
  id: string().id(), // id() marks the column as primary key. multi column primary keys should be available too
  email: string().unique(), // will automatically generate a unique index in migration
  name: string({ maxLength: 30 }).notNull(), // every type builder function such as string() may take parameters, such as maxLength, etc
  profileId: int().notNull(),
  profile: relation(() => Profile, (tableOne, tableTwo) => ({ references: [tableTwo.id], fields: [tableOne.profileId] }))
})

export const Profile = defineModel("Profile", {
  id: string().id(),
  createdAt: timestamp().default(() => now()), // default(() => ...) will set default value for this column. strong type safety required, timestamp can't use default(() => string("KURUT"))
  userId: int().notNull(),
  user: relation(() => User, (tableOne, tableTwo) => ({ references: [tableTwo.id], fields: [tableOne.userId] }))
})
```
