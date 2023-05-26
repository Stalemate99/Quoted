export interface Quote {
  quoteId: string;
  authorId: string;
  quote: string;
  likes: number;
  createAt?: Date;
}
