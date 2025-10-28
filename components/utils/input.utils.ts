

// input.utils.ts
export function checkPassword(value: string) {
    const {isValid, errors} = validPasswordLength(value)
    if(isValid) return null;
    return errors
}
function validPasswordLength(password: string) {
    const reg = {
        minLength: /.{8,}/,
        capital: /[A-Z]/,
        lowercase: /[a-z]/,
        digit: /[0-9]/,
        specialCharacter: /[@$*%!?&]/

    };
    const errors: string[] = [];
    if (!reg.minLength.test(password)) errors.push("Password must be at least 8 characters long.");
    if(!reg.capital.test(password)) errors.push("Password must include at least one uppercase letter.");
    if(!reg.lowercase.test(password)) errors.push("Password must include at least one lowercase letter.");
    if(!reg.specialCharacter.test(password)) errors.push("Password must include at least one special character (@, $, !, %, *, ?, &).");
    if(!reg.digit.test(password)) errors.push("Password must include at least one number.");

    return {
        isValid:errors.length===0,
        errors
    }
}



/**
 * 
 * function password_validate(password) {
    var re = {
        'capital' : /[A-Z]/,
        'digit'   : /[0-9]/,
        'except'  : /[aeiou]/,
        'full'    : /^[@#][A-Za-z0-9]{7,13}$/
    };
    return re.capital .test(password) && 
           re.digit   .test(password) && 
          !re.except  .test(password) && 
           re.full    .test(password);
}
 */