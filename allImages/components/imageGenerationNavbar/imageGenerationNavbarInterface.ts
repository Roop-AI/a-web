export interface imageGenerationNavbarProps {
  currentUserId: string;
  setRemainingCreditsUpdated?: React.Dispatch<React.SetStateAction<boolean>>; //React.Dispatch<React.SetStateAction<boolean>>, indicates that it takes a boolean value as an argument to update the state.
  remainingCreditsUpdated?: boolean;
  productPriceData: [];
  filteredPaidUsersData: any;
  stripeSecretKey: any;
  fireconfig: any;
}
