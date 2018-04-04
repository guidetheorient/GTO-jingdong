/*
 * @Author: guidetheorient 
 * @Date: 2018-04-04 18:23:09 
 * @Last Modified by: guidetheorient
 * @Last Modified time: 2018-04-04 20:40:15
 */

// 求出向量
function vector(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  }
}

// 向量叉乘
function vectorProduct(a, b) {
  return a.x * b.y - a.y * b.x;
}

// 符号位是否相同，正负小数不能区分
function sameSign(a, b) {
  return (a ^ b) >= 0;
}

// p是否在a,b,c组成的三角形内
function isPointInRange(p, a, b, c) {
  let pa = vector(p, a),
    pb = vector(p, b),
    pc = vector(p, c),
    pab = vectorProduct(pa, pb),
    pbc = vectorProduct(pb, pc),
    pca = vectorProduct(pc, pa);
  return sameSign(pab, pbc) && sameSign(pab, pca);
}

function needDelay(curP, prevP, $ele) {
  if (!curP || !prevP) {
    return false;
  }
  let offset = $ele.offset(),
    height = $ele.height(),
    a = {
      x: offset.left,
      y: offset.top
    },
    b = {
      x: offset.left,
      y: offset.top + height
    };
  return isPointInRange(curP, prevP, a, b);
}

module.exports = needDelay;