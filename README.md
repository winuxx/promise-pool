# Description

A tool to run promises concurrently like Promise.all but has pool limit

# How to use

```
import { promisePool } from 'promise-pool/src'

async function main() {
    const promises = [Promise func1, Promise func2, ...]
    const result = await promisePool(promises, 8)
}
```

# Test the function

```
pnpm install
pnpm test
```