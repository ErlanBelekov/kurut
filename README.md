<div align="center">
<h1>Kurut ORM</h1>
<img width="500" height="200" alt="npm" src="https://www.shoro.kg/wp-content/uploads/2016/08/krutt-1-min.png">
<h6><i>A TypeScript ORM for PostgreSQL with no compromise to the DX</i></h6>
<hr />
</div>

More to come soon, hopefully I don't abandon this project

MVP features:

- TypeScript/JavaScript Entity creation with CRUD methods
- Type-safe database queries
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

Intended Packages Structure:

```
@kurut/core - core functionality, such as model definition, CRUD methods, connections
@kurut/cli - CLI helper
@kurut/types - TypeScript definitions, shared and re-used between packages
@kurut/postgres - Postgres adapter
@kurut/mysql - MySQL adapter, should be compatible with PlanetScale too
@kurut/cockroachdb - CockroachDB Adapter
@kurut/{INSERT-DATABASE} - it should be simple to add new DB adapters, each adhering @kurut/core functionality
```

Example API:

```
import { defineModel, string, int, relation, timestamp, kurut } from "@kurut/core"

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

// create a KurutClient instance, the connection to DB is established on first query and then re-used
const db = kurut({ schema })

async function main() {
  const connectionString = process.env.DATABASE_URL // PostgreSQL connection string

  const kurut = await connect(connectionString, models)

  const firstUser = await kurut.user.safeFindFirst()

  console.log(firstUser.data?.email) // type-safe access
}

main()
```
