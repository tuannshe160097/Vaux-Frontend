export namespace User {

  export interface Model {
    id:         number,
    email:      string,
    role:       {
      title: string,
      id: number
    },
    status:     number,
    userDetail: User.Detail,
    avatarUrl: string,
    gender: string,
    // dob: string,
    doB: string,
    phone: string,
    citizenId: string,
    city: string,
    district: string,
    street: string,
    houseNumber: string,
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
