import Joi from "joi";
import { valid_words, unique_letter_words } from "./words";

const customWordToGuessValidator = (
    value: string,
    helpers: Joi.CustomHelpers<string>
) => {
    if (!unique_letter_words.includes(value.toLowerCase())) {
        return helpers.message({
            custom: "Please enter a 5-letter word with distinct letters.",
        });
    }
    return value;
};

const customWordValidator = (
    value: string,
    helpers: Joi.CustomHelpers<string>
) => {
    if (!valid_words.includes(value.toLowerCase())) {
        return helpers.message({
            custom: "Please enter a 5-letter valid word",
        });
    }
    return value;
};

export const wordToGuessSchema = Joi.string()
    .length(5)
    .regex(/^[a-zA-Z]+$/)
    .custom(customWordToGuessValidator)
    .required();

export const yourGuessScheme = Joi.string()
    .length(5)
    .regex(/^[a-zA-Z]+$/)
    .custom(customWordValidator)
    .required();
