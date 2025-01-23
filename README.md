# Description

A tool to run promises concurrently like Promise.all but has an additional pool limit

# How to use

```
import { promiseAllPool } from 'promise-all-pool'

async function main() {
    const promises = [1, 2, 3, 4, 5].map((it) => () => Promise.resolve(it));
    const result = await promiseAllPool(promises, 2);
    console.log('result', result);
}
```

# Test and Build

```
pnpm install
pnpm test
pnpm build
```
