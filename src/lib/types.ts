export type Caption = {
  id: number;
  text: string;
  flavor: string;
  context: string | null;
  upvotes: number;
  downvotes: number;
  created_at: string;
};
