export default class Validation {
  constructor(fieldName, rules = undefined) {
    this.error = false;
    this.field = "";
    this.errorMsg = "";
    this.rules = rules
    this.fieldName = fieldName
  }

  valid(target = undefined) {
    this.error = false;
    this.errorMsg = "";
    if (Object.prototype.toString.call(this.rules) === "[object Array]") {
      for (const rule of this.rules) {
        if (rule === "required") {
          if (!this.requiredValid(rule)) {
            return false;
          }
        }

        if (rule === "email") {
          if (!this.emailValid()) {
            return false;
          }
        }

        if (Object.prototype.toString.call(rule) === "[object Object]" &&
             rule.ruleName === "equal") {
          if (!this.equalValid(target, rule.targetName)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  requiredValid() {
    if (this.field.trim() !== "") {
      return true;
    }

    this.error = true;
    this.errorMsg = `${this.fieldName} must be required.`;

    return false;
  }

  emailValid() {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(this.field)) {
      return true;
    }

    this.error = true;
    this.errorMsg = `${this.fieldName} is not valid email.`;

    return false;
  }

  equalValid(target, targetName) {
    if(this.field === target){
        return true;
    }

    this.error = true;
    this.errorMsg = `${this.fieldName} must equal to ${targetName}.`;

    return false;
  }

  reset(){
    this.field = ""
    this.error = false
    this.errorMsg = ""
  }
}
