export interface FilteredPaidUserData {
  id?: string;
  credits?: number;
  purchasingDate?: string;
  isPro?: boolean;
  expiry?: string;
}
export interface FirebaseConfig {
  apiKey: any;
  authDomain: any;
  projectId: any;
  storageBucket: any;
  messagingSenderId: any;
  appId: any;
  measurementId: any;
}
export interface ImageGenerationProps {
  currentUserId: string;
  fireconfig: FirebaseConfig;
  filteredPaidUsersData: FilteredPaidUserData[];
  stripeSecretKey: any;
  productPriceData: any;
  inspirationPrompt: string;
  inspirationImage?: string;
  inspirationNegative_prompt?: string;
  inspirationSeed?: number;
  inspirationModel?: string;
  inspirationModelId?: string;
  inspirationSampler?: any;
}
