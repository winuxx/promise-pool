# Description

A tool to run promises concurrently just like Promise.all and has an additional pool limit

# How to use

```
import { promiseAllPool } from 'promise-all-pool'

async function main() {
    const promises = [Promise function 1, Promise function 2, ...]
    const result = await promisePool(promises, 8)
}
```

# Test and Build

```
pnpm install
pnpm test
pnpm build
```
