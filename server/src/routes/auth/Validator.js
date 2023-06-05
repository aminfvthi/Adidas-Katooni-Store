import expressValidator from "express-validator";
const validate = expressValidator.check;

export default new (class {
  registerValidator() {
    return [
      validate("firstName")
        .notEmpty()
        .withMessage("قسمت نام نباید خالی باشد")
        .isString()
        .withMessage("نام باید از نوع رشته حروف باشد"),
      validate("lastName")
        .notEmpty()
        .withMessage("قسمت نام خانوادگی نباید خالی باشد")
        .isString()
        .withMessage("نام خانوادگی باید از نوع رشته حروف باشد"),
      validate("email")
        .notEmpty()
        .withMessage("قسمت ایمیل نباید خالی باشد")
        .isEmail()
        .withMessage("فرمت ایمیل وارد شده نا معتبر می باشد"),
      validate("password")
        .notEmpty()
        .withMessage("قسمت رمز عبور نباید خالی باشد"),
    ];
  }
  loginValidator() {
    return [
      validate("email")
        .notEmpty()
        .withMessage("قسمت ایمیل نباید خالی باشد")
        .isEmail()
        .withMessage("فرمت ایمیل وارد شده نا معتبر می باشد"),
      validate("password")
        .notEmpty()
        .withMessage("قسمت رمز عبور نباید خالی باشد"),
    ];
  }
})();
