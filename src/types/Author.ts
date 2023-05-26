export interface Author {
  authorId?: string;
  name: string;
  password: string;
  isLoggedIn: boolean;
  profilePic?: string;
  lastLoginTime?: Date;
}
