export const token = () => {
    const token = useCookie("token");
    return token.value;
}