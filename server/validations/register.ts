import { body } from "express-validator";

export const registerValidations = [
  body("email", "Введите e-mail")
    .isEmail()
    .withMessage("Неверный e-mail")
    .isLength({
      min: 10,
      max: 40,
    })
    .withMessage("Недопустимая длина e-mail"),
  body("fullname", "Введите имя")
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage("Недопустимая длина имени"),
  body("password", "Введите пароль")
    .isString()
    .isLength({
      min: 6,
    })
    .withMessage("Минимальная длина пароля - 6"),
];
