export const isEmpty = (arr: Array<any>): boolean => {
    return !Array.isArray(arr) || !arr.length;
};
