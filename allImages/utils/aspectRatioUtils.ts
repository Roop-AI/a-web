import AspectRatiosData from "@/data/aspectRatiosData";

export function FindAspectRatioData(width: number, height: number) {
  for (const ratioData of AspectRatiosData) {
    if (width === ratioData.width && height === ratioData.height) {
      return { imgSrc: ratioData.imgSrc, aspectRatio: ratioData.ratio };
    }
  }
  return { aspectRatio: "Unknown" };
}