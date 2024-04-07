interface User {
    id: string;
    name: string;
    emailId: string;
    password: string | null;
    refreshToken: string |  null;
}

type MiddlewareUser = Omit<User,"password" | "refreshToken">