/**
 *
 * Cách 3 : Tìm độ dài chuỗi lớn nhất. sau đó tạo mảng đếm cho độ dài. Đếm sl xd, lọc
 *
 */

console.log("===============================================");

function timChuoi(mang) {


  let max = 0;
  for (let i = 0; i < mang.length; i++) {
    if (mang[i].length > max) max = mang[i].length;
  }

  let dem = [];
  for (let i = 0; i <= max; i++) {
    dem[i] = 0;
  }

  for (let i = 0; i < mang.length; i++) {
    let leg = mang[i].length;
    dem[leg]++;
  }

  //sl xh nhiều nhất
  let xhMax = 0;
  let doDaiMax = 0;

  for (let i = 0; i < dem.length; i++) {
    if (dem[i] > xhMax) {
      xhMax = dem[i];
      doDaiMax = i;
    }
  }

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
