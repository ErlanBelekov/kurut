# Tech stack

- TS
- NodeJS
- pnpm
- vitest

# Field definition

```
const schema = defineModel({
  id: string(),
  count: int()
})
```

type of `id` should become `string`
type of `count` should be `number`

every type definition function should eventually return TS type, which means the metadata for querying should be stored in a different way.

maybe i can use some kind of a context, like

```
model({
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
