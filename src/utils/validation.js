export const EMAIL_PATTERN = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/igm;
export const PHONE_PATTERN = /(\+[0-9]{11,})|((8|7)[0-9]{10,})$/igm;

export const testPatterns = (text, pattern) => {//Проверка корректности
    if (typeof text === 'string') {
        let matched = text.match(pattern);
        if (matched) {
            return matched.length > 0;
        }
    }

    return false;
};
