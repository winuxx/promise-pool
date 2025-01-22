import { promisePool } from '../src';

async function testFulfill(pool = 10, length = 100) {
    console.log('should promisePool fulfill');
    let timeValue = 0;
    const execList: number[] = [];
    const arr = Array.from({ length })
        .fill(null)
        .map(
            (v, i) => () =>
                new Promise((resolve, reject) => {
                    const delay = Math.random();
                    timeValue += delay;
                    setTimeout(() => {
                        console.log('func', i);
                        execList.push(i);
                        resolve(i.toString().padEnd(4) + delay.toFixed(2));
                    }, delay * 1000);
                })
        );
    console.time('time');
    const result = await promisePool(arr, pool);
    console.log('execList', execList);
    console.log('res', result);
    console.timeEnd('time');
    console.log('timeValue', timeValue);
}

async function testReject(pool = 10, length = 100) {
    console.log('should promisePool reject');
    let timeValue = 0;
    const execList: number[] = [];
    const arr = Array.from({ length })
        .fill(null)
        .map(
            (v, i) => () =>
                new Promise((resolve, reject) => {
                    const delay = Math.random();
                    timeValue += delay;
                    setTimeout(() => {
                        console.log('func', i);
                        execList.push(i);
                        reject('rejected');
                    }, delay * 1000);
                }).catch((error) => {
                    console.error('catch', i);
                    return i.toString().padEnd(4) + error;
                })
        );
    const result = await promisePool(arr, pool);
    console.log('execList', execList);
    console.log('res', result);
}

async function test() {
    await testFulfill(3, 10);
    await testReject(3, 10);
}

test();
