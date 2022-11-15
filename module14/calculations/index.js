class Calculations {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  exports.add = (a, b) => {
    const newCalc = new Calculations(a,b);
    return newCalc.x + newCalc.y;
  }

  exports.subtract = (a, b) => {
    const newCalc = new Calculations(a,b);
    return newCalc.x - newCalc.y;
  }