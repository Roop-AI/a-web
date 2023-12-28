export interface AspectRatioButtonInterface {
  uniqueKey: number;
  key?: number;
  isPro: boolean;
  onButtonClick: () => void;
  imgSrc: any;
  ratio: string;
  width?: any;
  height?: any;
  active?: boolean;
  handleAspectRatioChange: (
    uniqueKey: any,
    width: any,
    height: any,
    ratio: string,
    imgSrc: string
  ) => void;
}
