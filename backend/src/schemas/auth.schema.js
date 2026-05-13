import { z } from "zod";

export const RegisterSchema = z.object({
    name: z
            .string()
            .min(3, "NAME_MUST_BE_AT_LEAST_3_CHARACTERS_LONG"),
    email: z
            .string()
            .email("INVALID_EMAIL"),
    password: z
            .string()
            .min(6, "PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS_LONG")
});

export const LoginSchema = z.object({
    email: z
            .string()
            .email("INVALID_EMAIL"),
    password: z
            .string()
            .min(6, "PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS_LONG")
});