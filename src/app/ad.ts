// mirroanje objekta s bekenda
export interface Ad{
  id: number;
  title: string;
  content: string;
  county: string;
  validUntil: string;
  username: string;
  user: {
    username: string;
    email: string;
    phoneNumber: string;
    rating: string;
  }
}
