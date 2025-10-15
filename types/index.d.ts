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


    declare type StoreDataProps = {
      ingredient: string;
      response: string[];
      shouldDelete?: boolean
  };


  interface HistoryDocument {
    $id?: string;
    ingredient: string;
    response: string;
    responseId: string;
    star?:boolean;
    $createdAt?: string;
  }
  