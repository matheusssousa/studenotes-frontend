export const checkPassword = (value) => {
    const lengthValidation = value.length >= 8;
    const specialCharacterValidation = /[!@#$%^&*()_+\-=\]{};':"\\|,.<>/?]/.test(value);
    const uppercaseValidation = /[A-Z]/.test(value);

    const errors = [];

    if (!lengthValidation) {
        errors.push("A senha deve ter no mínimo 8 caracteres.");
    }
    if (!specialCharacterValidation) {
        errors.push("A senha deve conter ao menos um caractere especial.");
    }
    if (!uppercaseValidation) {
        errors.push("A senha deve conter ao menos uma letra maiúscula.");
    }
    return { valid: errors.length === 0, messages: errors };
}