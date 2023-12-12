// const arr1 = [1,2,3,4,2,7];

// const sum = arr1.reduce((acc, cur) => acc + cur, 0);
// console.log(sum);


const a = [[1,2], [2,3]];

const b = a.map(column => column.reverse()) //a тоже меняется
const c = a.map(column => [...column].reverse()) //a не меняется

const d = [1,2,3];
function summa(a,b,c) {
    return a+b+c;
} 

console.log(summa(...d))