export const validifyEmailFormat = (email: string): boolean =>
    !!email.match(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

export const validifyPasswordFormat = (password: string): boolean =>
    !!password.match(/(?=.*[0-9a-zA-Z]).{6,}/);
