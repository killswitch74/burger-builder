export const checkValidity = (value, rules) => {

    //--------- Max's Method ---------

    // let isValid = true;
    // if(rules.required) {
    //     isValid = value.trim() !== '' && isValid;
    // }

    // if(rules.minLength) {
    //     isValid = value.length >= minLength && isValid; // 2 >= 3 -> false
    // }

    // if(rules.maxLength) {
    //     isValid = value.length <= maxLength && isValid;
    // }

    // return isValid;


    //--------- The Karan Uppal's Method ---------

    let isValid = [];
    if (rules.required) {
        isValid.push(value.trim() !== '');
    }

    if (rules.minLength) {
        isValid.push(value.trim().length >= rules.minLength); // 2 >= 3 -> false
    }

    if (rules.maxLength) {
        isValid.push(value.trim().length <= rules.maxLength);
    }

    if (rules.emailCheck) {
        isValid.push(value.search('@') > -1);
    }

    return isValid.reduce((acc, curr) => {
        return acc && curr;
    });

    // return isValid.find(el => el === false) > -1 ? false : true;;
}