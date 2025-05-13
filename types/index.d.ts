declare interface getUserInfoProps {
    userId: string;
  }


  declare type SignUpParams = {
    fullname?: string;
    email: string;
    password: string;
    username?:string;
    imageurl?:string;
  };

  declare interface getUserInfoProps {
    userId: string;
  }

  declare interface signInProps {
    email: string;
    password: string;
  }

  declare type LoginUser = {
    email: string;
    password: string;
  };