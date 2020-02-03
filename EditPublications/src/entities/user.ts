export class User{
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public password: string = '',
        public type: number,
        public id?: number,
        public lastLogin?: Date,
    ){}

    getSkLastLogin(): string {
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeStyle: 'long',
          hour: '2-digit',
          minute: '2-digit'
        };
        console.log(this.lastLogin);
        return this.lastLogin
          ? this.lastLogin.toLocaleTimeString('sk-SK', options)
          : 'nikdy';
    }


    public static clone(user: User){
      return new User(
          user.name,
          user.surname,
          user.email,
          user.password,
          user.type,
          user.id,
      );
  }
}