/**
 *
 * Ý tưởng cách thứ 2 cho bài 1
 * sắp xếp theo độ dài
 * Các chuỗi cùng độ dài sẽ đứng gần nhau và sau đó đếm liên tiếp
 * ["a","ab","abc","cd","def","gh"] -> ["a","ab","cd","gh","abc","def"]
 */

console.log("===============================================");

function timChuoi(mang) {
  for (let i = 0; i < mang.length; i++) {
    for (let j = 0; j < mang.length - i - 1; j++) {
      if (mang[j].length > mang[j + 1].length) {
        let temp = mang[j];
        mang[j] = mang[j + 1];
        mang[j + 1] = temp;
      }
    }
  }
console.log(mang)
  // đếm

  let dem = 1;
  let xhMax = 1;
  let doDaiMax = mang[0].length;
  for (let i = 1; i < mang.length; i++) {
    if (mang[i].length === mang[i - 1].length) dem++;
    else dem = 1;

    if (dem > xhMax) {
      xhMax = dem;
      doDaiMax = mang[i].length;
    }
  }
  console.log(`${xhMax} : ${doDaiMax}`)

  let kq = [];
  let vt = 0;

  for (let i = 0; i < mang.length; i++) {
    if (mang[i].length === doDaiMax) {
      kq[vt] = mang[i];
      vt++;
    }
  }
  return kq;
  
}

console.log(timChuoi(["a", "ab", "abc", "cd", "def", "gh"]));
