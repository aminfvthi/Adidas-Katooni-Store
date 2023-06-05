import expressValidator from "express-validator";
const validate = expressValidator.check;

export default new (class {
  productValidator() {
    return [
      validate("name")
        .notEmpty()
        .withMessage("قسمت نام محصول نباید خالی باشد")
        .isString()
        .withMessage("نام محصول باید از نوع رشته حروف باشد"),
      validate("description")
        .notEmpty()
        .withMessage("قسمت توضیحات محصول نباید خالی باشد")
        .isString()
        .withMessage("توضیحات محصول باید از نوع رشته حروف باشد"),
      validate("category")
        .notEmpty()
        .withMessage("قسمت دسته بندی محصول نباید خالی باشد")
        .isString()
        .withMessage("دسته بندی محصول باید از نوع رشته حروف باشد"),
      validate("gender")
        .isArray({ min: 1, max: 3 })
        .withMessage("حداقل یکی از جنسیت های مناسب محصول باید انتخاب شود"),
      validate("sizes")
        .isArray({ min: 1 })
        .withMessage("لیست سایز های محصول نباید خالی باشد"),
      validate("color")
        .notEmpty()
        .withMessage("قسمت رنگ محصول نباید خالی باشد")
        .isString()
        .withMessage("رنگ محصول باید از نوع رشته حروف باشد"),
      validate("images")
        .isArray({ min: 1, max: 4 })
        .withMessage("لیست تصاویر محصول نباید خالی باشد"),
      validate("available")
        .isBoolean()
        .withMessage("وضعیت محصول باید یکی از انواع موجود یا ناموجود باشد")
        .notEmpty()
        .withMessage("قسمت وضعیت محصول نباید خالی باشد"),
      validate("price")
        .notEmpty()
        .withMessage("قسمت قیمت محصول نباید خالی باشد")
        .isInt()
        .withMessage("قیمت محصول باید از نوع عدد و به تومان باشد"),
    ];
  }
})();
