/**
 * 
 * @param {*} mang 
 * 
 * Ý tưởng là sắp xếp giảm dần rồi cộng 2 số đầu
 */
console.log("===============================================");

function timSumMax(mang) {
    mang.sort((a,b) => b - a)
    console.log(mang)
    return mang[0] + mang[1]
}

console.log(timSumMax([1, 4, 2, 3, 5]))