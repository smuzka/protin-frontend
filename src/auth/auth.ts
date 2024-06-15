

export const saveJwtToken = (token: string) => {
    localStorage.setItem("token", token);
}

export const getJwtToken = (): string | null => {
    return localStorage.getItem("token");
}

export const doesJwtTokenExists = (): boolean => {
    return localStorage.getItem("token") !== null;
}

export const removeJwtToken = (): void => {
    localStorage.removeItem("token");
}