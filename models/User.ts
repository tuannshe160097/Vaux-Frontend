export namespace User {

  export interface Model {
    id:         number,
    email:      string,
    role:       {
      title: string
    },
    status:     number,
    userDetail: User.Detail,
    avatarUrl: string,
    name: string,
  }

  export interface Detail {
    firstName:   string,
    lastName:    string,
    displayName: string,
    phoneNumber: string
    pictureUrl:  string
  }

  export interface Token {
    userId: string
    token:  string
    user?:  User.Model
  }
}
