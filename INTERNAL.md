# Tech stack

- TS
- NodeJS
- pnpm
- vitest

# Field definition

```
const schema = table({
  id: string(),
  count: int()
})
```

type of `id` should become `string`
type of `count` should be `number`

every type definition function should eventually return a TS type, which means the metadata for querying should be stored in a different way.

maybe i can use some kind of a context, like

```
table({
  name: "customers",
  fields: fields({
    id: string().id().default(uuid()),
    count: int().notNull()
  })
})
```

Goals:

- CRUD operations
- filtering
- automatic return type inference on CRUD methods

I can use function chaining to define types of model field

Terminology WIP questions:

- table / model / entity? I think table is better and easier to grisp
- field / column . I think column is easier to grisp

the choices make easier ORM learning curve, the API is similar to SQL
