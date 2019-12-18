import { Auth } from 'src/entities/auth';

export class login {
    static readonly type='[Login Page] login';
    constructor(public auth: Auth) {}
}

export class logout{
    static readonly type= '[Main menu] logout';
}

export class tokenExpiredLogout{
    static readonly type= '[UserServer API] token expired';
}

export class urlAfterLogin{
    static readonly type= '[AuthGuard] set url after login';
    constructor(public url: string){}
}