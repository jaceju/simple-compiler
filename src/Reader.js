// Reader class
// str is the data to be read
class Reader {
  constructor(str) {
    this.data = str;
    this.currPos = 0;
    this.dataLength = str.length;
  }

  nextChar() {
    if (this.currPos >= this.dataLength) {
      return -1; // end of stream
    }

    return this.data[this.currPos++];
  }

  retract(n) {
    if (n === undefined) {
      n = 1;
    }

    this.currPos -= n;

    if (this.currPos < 0) {
      this.currPos = 0;
    }
  }
}

module.exports = Reader;
