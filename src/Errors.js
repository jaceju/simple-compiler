let errors = [];

class Errors {
  static push(error) {
    errors.push(error);
  }

  static print() {
    console.dir(errors);
  }

  static each(cb) {
    for (let i = 0, l = errors.length; i < l; i++) {
      cb(errors[i], i);
    }
  }
}

Errors.SYNTAX_ERROR = 0;

module.exports = Errors;
