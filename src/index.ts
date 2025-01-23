export async function promiseAllPool<T>(promises: (() => Promise<T>)[], poolSize = 8) {
    const list = Array.from<T>({ length: promises.length }).fill(null);
    const executing = new Set();
    let excuted = 0;
    // let times = 0; // debug
    const exec = async function (i: number) {
        // times += 1; // debug
        if (i >= promises.length) return;
        if (executing.size >= poolSize) return;
        if (list[i]) return;

        const p = promises[i];
        if (!p) return;

        // console.log('promisePool: exec', i);
        // list[i] = '<pending>';
        executing.add(p);
        excuted += 1;
        const res = await p();
        // console.log('promisePool: done', i);
        executing.delete(p);
        list[i] = res;

        if (executing.size === poolSize - 1 && !list[excuted]) {
            // console.log('promisePool: add ', excuted);
            return exec(excuted);
        }
    };
    const pool = Array.from({ length: poolSize })
        .fill(null)
        .map((_, i) => exec(i));
    await Promise.all(pool);
    // console.log('promisePool: call times', times, '/', promises.length); // debug
    return list;
}

export default promiseAllPool;
