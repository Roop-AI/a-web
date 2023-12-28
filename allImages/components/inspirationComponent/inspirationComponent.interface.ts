export interface filteredPaidUsersProps {
  id: string;
  credits: number;
  isPro: boolean;
}

export interface InspirationInterface {
  model: string;
  model_id: string;
  premium: boolean;
  negative_prompt: string;
  prompt: string;
  sampler: string;
  seed: number;
  image: any;
}

export interface artModelInterface{
  name: string;
}