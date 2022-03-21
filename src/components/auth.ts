export const checkAuth = (login: string, password: string, go: () => void) => {
    const isLogged = login == 'admin' && password == 'password';
    if (isLogged)
    {
        go();
    };
};