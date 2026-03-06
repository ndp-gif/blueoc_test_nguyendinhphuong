/**
 * HƯớng tư duy của em cho bài này là em sẽ duyệt mảng trước,
 * với mỗi index thì lấy số phần tử trong mảng
 * sau đó sử dụng key-value để lưu lấy số lần xuất hiện
 * key độ dài chuỗi còn vale thì lưu số lần xuất hiện
 * sau đó số lg độ dài nhiều nhất , em duyệt lại mảng và lọc
 */
console.log("===============================================");

function timChuoi(mang) {
  let bangDem = {};
  let xhMax = 0;
  let doDaiMax = 0;

  for (let i = 0; i < mang.length; i++) {
    let doDai = mang[i].length;

    if (bangDem[doDai] === undefined) bangDem[doDai] = 1;
    else bangDem[doDai] += 1;

    if (bangDem[doDai] > xhMax) {
      doDaiMax = doDai;
      xhMax = bangDem[doDai];
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
document.body.innerHTML = `<h1>${timChuoi(["a", "ab", "abc", "cd", "def", "gh"])}</h1>`;
