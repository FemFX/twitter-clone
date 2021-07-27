import { body } from "express-validator";

export const tweetsValidations = [
  body("text", "Введите текст")
    .isString()
    .isLength({
      max: 280,
    })
    .withMessage("Максимальныя длина строки - 280"),
];
