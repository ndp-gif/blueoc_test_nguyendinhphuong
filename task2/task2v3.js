
console.log("===============================================");


function timSumMax(mang) {
  let max1 = -Infinity;
  let max2 = -Infinity;

  for(let i = 0; i< mang.length; i++) {
    if(mang[i] > max1) {
        max2 = max1;
        max1 = mang[i]
    }else if(mang[i] > max2) {
        max2 = mang[i]
    }
  }
  return max1 + max2
}

console.log(timSumMax([1, 4, 2, 3, 5]))
