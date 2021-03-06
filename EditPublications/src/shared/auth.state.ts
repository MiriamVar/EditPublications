import { State, StateContext, Action, Selector } from '@ngxs/store';
import { login, logout, urlAfterLogin } from './auth.actions';
import { UserServerService } from 'src/services/user-server.service';
import { tap } from 'rxjs/operators';
import { tokenExpiredLogout } from './auth.actions';

const DEFAULT_REDIRECT_AFTER_LOGIN = '/form';
const DEFAULT_REDIRECT_AFTER_LOGOUT = '/login';

export interface AuthModel{
    id: number;
    username: string;
    token: string;
    redirectAfterlogin: string;
}

@State<AuthModel> ({
    name: 'auth',
    defaults: { id: null, username: null, token: null, redirectAfterlogin: DEFAULT_REDIRECT_AFTER_LOGIN }
   })

   export class AuthState {

//    @Selector()
  //  static id(current: AuthModel) {
    //    return current.id;
   // }
       @Selector()
        static username(current: AuthModel){
           return current.username;
       }

       @Selector([AuthState.username])
        static usernameOnly(username: string){
           return username;
       }

       @Selector([state => state.auth.username])
        static username2(username: string){
           return username;
       }

     //  @Selector([state => state.auth.redirectAfterlogin])
        //static redirectUrl(redirectAfterlogin: string){
       //    return redirectAfterlogin;
      // }

       @Selector()
        static redirectUrl(current: AuthModel) {
            return current.redirectAfterlogin;
        }

       @Selector([state => state.auth.token])
        static token(token: string){
            console.log("token: "+token);
           return token;
       }
       
        constructor(private userServerService: UserServerService) {};

        ngxsOnInit(){
            // this.userServerService.checkToken().subscribe();
        }

        @Action(login)
        login(ctx: StateContext<AuthModel>, action: login) {
            return this.userServerService.login(action.auth)
            .pipe(
                //tap uspesna vetva, len ked chodia data
                tap(token => {
                    ctx.patchState({
                        username: action.auth.name,
                        token: token
                    });
                })
            );
        }

        @Action([logout, tokenExpiredLogout])
        logout(ctx: StateContext<AuthModel>, action: logout){
            const token =  ctx.getState().token;
            const username = ctx.getState().username;
            ctx.setState({
                id: null,
                username: null,
                token: null,
                redirectAfterlogin: DEFAULT_REDIRECT_AFTER_LOGOUT
            });
            if(action instanceof logout){
                return this.userServerService.logout(username,token);
            }
        }

        @Action(urlAfterLogin)
        seturlAfterLogin({patchState}: StateContext<AuthModel>, {url}: urlAfterLogin){
            patchState({redirectAfterlogin: url});            
        }
   }