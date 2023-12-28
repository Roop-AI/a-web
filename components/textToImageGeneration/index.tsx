import AllImages from "@/allImages";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  Textarea,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import {
  fetchAndActivate,
  getAll,
  getRemoteConfig,
} from "firebase/remote-config";
import { useEffect, useRef, useState } from "react";
import TextToImageModal from "../textToImageModal";
import TextToImagestyles from "../textToImageStyles";
import aspectRatiosData from "@/data/aspectRatiosData";
import AspectRatioButton from "../aspectRatioButton";
import InputSlider from "react-input-slider";
import GeneratedImagesHistory from "../generatedImagesHistory";
import JSZip from "jszip";
import GeneratedImagesCarausel from "../generatedImagesCarausel";
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  usePaymentModal,
  useSubscriptionModal,
} from "@/hooks/useSubscriptionModal";
import { useRouter } from "next/router";
import ImageGenerationNavbar from "../imageGenerationNavbar";
import {
  FilteredPaidUserData,
  ImageGenerationProps,
} from "@/containers/imageGenerationContainer/imageGenerationContainer.interface";
import { Crop, PixelCrop } from "react-image-crop";
import OptionHeaderWithIcon from "../OptionHeaderWithIcon";
import { FindAspectRatioData } from "@/utils/aspectRatioUtils";
import { useFilteredStyles } from "@/utils/stylesUtils";
import { useFilteredModels } from "@/utils/modelsUtils";
import PaymentModal from "../paymentModal";

interface liveUrlsInterface {
  id: any;
}

interface artModelsInterface {
  name: string;
  id: string;
}
interface StyleItem {
  styles: any[];
}
interface payloadData {
  prompt?: string;
  negative_prompt?: string;
  styles?: any;
  seed?: number;
  steps?: number;
  width?: number;
  height?: number;
  restore_faces?: boolean;
  override_settings?: any;
  sampler_index?: any;
  alwayson_scripts?: {
    roop?: {
      args: [string, boolean];
    };
    ADetailer?: {
      args: [boolean, { ad_model: string }];
    };
  };
  batch_size?: any;
  input_image?: any;
  model?: string;
  return_mask?: boolean;
  alpha_matting?: boolean;
  alpha_matting_foreground_threshold?: number;
  alpha_matting_background_threshold?: number;
  alpha_matting_erode_size?: number;
  resize_mode?: number;
  show_extras_results?: boolean;
  gfpgan_visibility?: number;
  codeformer_visibility?: number;
  codeformer_weight?: number;
  upscaling_resize?: number;
  upscaler_1?: string;
  upscale_first?: boolean;
  image?: any;
}

const TextToImageGenerator: React.FC<ImageGenerationProps> = ({
  currentUserId,
  fireconfig,
  filteredPaidUsersData,
  stripeSecretKey,
  productPriceData,
  inspirationPrompt,
  inspirationImage,
  inspirationNegative_prompt,
  inspirationSeed,
  inspirationModel,
  inspirationModelId,
  inspirationSampler,
}) => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };
  const sidebarClass = sidebarOpen ? "sidebar open" : "sidebar";
  const [activeComponent, setActiveComponent] = useState("A");

  const toggleComponent = () => {
    setActiveComponent((prev) => (prev === "A" ? "B" : "A"));
  };
  const isGeneratedImagesHistoryEnabled = useBreakpointValue({
    base: false,
    xl: true,
  });
  const router = useRouter();
  const { urlText }: { urlText?: string } = useRouter().query;

  const { isSubscriptionOpen, onSubscriptionOpen, onSubscriptionClose } =
    useSubscriptionModal();
  const { isCreditsOpen, onCreditsOpen, onCreditsClose } = usePaymentModal();
  const currentUserData: FilteredPaidUserData | undefined =
    filteredPaidUsersData.find((user) => user.id === currentUserId);
  const app = initializeApp(fireconfig);

  if (!getApps().length) {
    // initialize firebase app with our configs.
    const app = initializeApp(fireconfig);

    if (typeof window !== "undefined") {
      if ("measurementId" in fireconfig) {
      }
    }

    console.log("Initialized firebase");
  } else {
    console.log("Already Initialized firebase");
  }

  let remoteConfig;

  if (typeof window !== "undefined") {
    remoteConfig = getRemoteConfig(app);
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
  }
  const firestore = getFirestore(app);
  const remoteConfigAsAny = remoteConfig;

  const imageOptions = [
    "1 Image",
    "2 Images",
    "3 Images",
    "4 Images",
    "15 Images",
  ];

  const [artModels, setArtModels] = useState<any>([]);
  const [artStyles, setArtStyles] = useState<any>([]);
  const [selectedStyles, setSelectedStyles] = useState<StyleItem[]>([]);
  const [avatarStyles, setAvatarStyles] = useState<any>([]);
  const [username, setUsername] = useState<string>("");
  const [endpointUsername, setEndpointUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [endpointPassword, setEndpointPassword] = useState<string>("");
  const [selectedModalImageIndex, setSelectedModalImageIndex] = useState(0);
  const [selectedStyleImageIndex, setSelectedStyleImageIndex] = useState(0);

  const [selectedModel, setSelectedModel] = useState();
  const [selectedModelId, setSelectedModelId] = useState();
  const [latestSelectedModelId, setLatestSelectedModelId] = useState();
  const [latestSelectedIndex, setLatestSelectedIndex] = useState<any>();
  const [latestSelectedModel, setLatestSelectedModel] = useState();
  const [initialSelectedModel, setInitialSelectedModel] = useState();
  const [selectedStyleImage, setSelectedStyleImage] =
    useState<string>("No Style");
  const [selectedStyleName, setSelectedStyleName] =
    useState<string>("No Style");
  const [initialSelectedStyleImage, setInitialSelectedStyleImage] =
    useState<string>();
  const [liveUrlsData, setLiveUrlsData] = useState<liveUrlsInterface[]>([]);
  const [responseData, setResponseData] = useState<any>({});
  const [remainingCreditsUpdated, setRemainingCreditsUpdated] = useState(false);

  const [url, setUrl] = useState("");
  const [serverIp, setServerIp] = useState("");
  const [status, setStatus] = useState("");

  const [imageWidth, setImageWidth] = useState(1024);
  const [initialWidth, setInitialWidth] = useState(768);
  const [imageHeight, setImageHeight] = useState(1024);
  const [initialHeight, setInitialHeight] = useState(768);
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [aspectRatioImage, setAspectRatioImage] = useState<any>(
    aspectRatiosData[0].imgSrc.src
  );

  const [initialAspectRatio, setInitialAspectRatio] = useState("1:1");
  const [latestImagesIndex, setLatestImagesIndex] = useState();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const [stepsValue, setStepsValue] = useState(20);
  const [seedInputValue, setSeedInputValue] = useState<number>(-1);
  const [seedInputError, setSeedInputError] = useState(false);
  const [promptValue, setPromptValue] = useState<string>(
    urlText! ? urlText! : ""
  );
  const [initialPromptValue, setInitialPromptValue] = useState("");
  const [initialSelectedModelTitle, setInitialSelectedModelTitle] =
    useState("");
  const [negativePromptValue, setNegativePromptValue] = useState<string>("");

  const [samplerIndex, setSamplerIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [generatedImageInfo, setGeneratedImage] = useState(false);
  const [base64Image, setBase64Image] = useState<any>();

  const [buyCredits, setBuyCredits] = useState<boolean>(false);
  const [base64ImageDummy, setBase64ImageDummy] = useState<any>(
    AllImages.addictoLogoBlackText.src
  );

  const [selectedImage, setSelectedImage] = useState(imageOptions[0]);
  const [downloadedImage, setDownloadedImage] = useState();
  const [payload, setPayload] = useState({});
  const [selectedImagesList, setSelectedImagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle "Show More" click

  const handleImageSelect = (image: any) => {
    setSelectedImage(image);
  };
  const handlePromptChange = (event: any) => {
    setPromptValue(event.target.value);
  };
  const handleNegativePromptChange = (event: any) => {
    setNegativePromptValue(event.target.value);
  };
  const handleSeedInputChange = (event: any) => {
    const newValue = event.target.value;

    if (newValue >= 0 && newValue <= 2474883647) {
      setSeedInputValue(newValue);
      setSeedInputError(false);
    } else {
      setSeedInputError(true);
    }
  };

  const minValue = 15;
  const maxValue = 50;

  const handleStepsChange = (x: any) => {
    setStepsValue(x);
  };
  const handleAspectRatioChange = (
    index: number,
    newWidth: number,
    newHeight: number,
    ratio: string,
    imgSrc: any
  ) => {
    setActiveIndex(index);
    setImageWidth(newWidth);
    setImageHeight(newHeight);
    setAspectRatio(ratio);
    setAspectRatioImage(imgSrc.src);
  };

  const getSelectedModelTitle = () => {
    if (
      selectedModalImageIndex !== null &&
      selectedModalImageIndex >= 0 &&
      selectedModalImageIndex < artModels.length
    ) {
      return artModels[selectedModalImageIndex].title;
    }
    return "Not Selected Yet";
  };

  const getSelectedModelImage = () => {
    if (
      selectedModalImageIndex !== null &&
      selectedModalImageIndex >= 0 &&
      selectedModalImageIndex < artModels.length
    ) {
      return artModels[selectedModalImageIndex].image;
    }
    return "Not Selected Yet";
  };
  const getInitialSelectedModelTitle = () => {
    if (
      selectedModalImageIndex !== null &&
      selectedModalImageIndex >= 0 &&
      selectedModalImageIndex < artModels.length
    ) {
      setInitialSelectedModelTitle(artModels[selectedModalImageIndex].title);
      return artModels[selectedModalImageIndex].title;
    }
    return "Not Selected Yet";
  };

  const [data, setData] = useState({});
  const [latestGeneratedImages, setLatestGeneratedImages] = useState<any[]>([]);
  // fetch remoteConfigData from firebase
  useEffect(() => {
    const fetchRemoteConfig = async () => {
      try {
        if (remoteConfigAsAny) {
          await fetchAndActivate(remoteConfigAsAny);
          const authStylesModelsConfig = getAll(remoteConfigAsAny);

          const artStyles = (authStylesModelsConfig.art_styles as any)._value;
          const avatarStyles = (authStylesModelsConfig.avatar_styles as any)
            ._value;
          const artModels = (authStylesModelsConfig.new_art_models as any)
            ._value;

          // Parse the JSON strings into JavaScript objects
          const artStylesData = JSON.parse(artStyles);
          const artModelsData = JSON.parse(artModels);
          const avatarStylesData = JSON.parse(avatarStyles);

          // Set state variables with the parsed data
          setArtModels(artModelsData);
          setArtStyles(artStylesData);
          setAvatarStyles(avatarStylesData);
          setUsername((authStylesModelsConfig.username as any)._value);
          setPassword((authStylesModelsConfig.password as any)._value);
          setEndpointUsername(
            (authStylesModelsConfig.endpoint_username as any)._value
          );
          setEndpointPassword(
            (authStylesModelsConfig.endpoint_password as any)._value
          );
          setServerIp(
            `http://${(authStylesModelsConfig.server_ip as any)._value}`
          );
        }
      } catch (err) {
        console.log("Failed to fetch remote config", err);
      }
    };

    fetchRemoteConfig();
  }, [inspirationPrompt ? inspirationPrompt : undefined]);

  // Function to handle when a model is clicked
  const handleModelClick = (
    index: number,
    modelId: any,
    modelName: any,
    title?: any,
    samplerIndex?: any
  ) => {
    setSamplerIndex(samplerIndex);
    setSelectedModelId(modelId);
    setSelectedModel(modelName);
    setSelectedModalImageIndex(index);

    // Filter and set the styles associated with the selected model
    const stylesForModel = artStyles.filter(
      (style: any) => style.model_id === modelId
    );

    setSelectedStyles(stylesForModel);
  };

  const handleStyleClick = (index: number, title: any, styleName: string) => {
    setSelectedStyleImage(title);
    setSelectedStyleName(styleName);
    setSelectedStyleImageIndex(index);
  };

  // initialModel and initialStylesForModel when page loaded for the first time
  useEffect(() => {
    // Check if the model from inspirations exists in artModels
    if (inspirationPrompt.trim() !== "") {
      setPromptValue(inspirationPrompt);
      setNegativePromptValue(inspirationNegative_prompt!);
      setSeedInputValue(inspirationSeed!);
      setSamplerIndex(inspirationSampler);
    }

    const inspirationModelIndex =
      artModels &&
      artModels.findIndex(
        (model: artModelsInterface) => model.id === inspirationModelId
      );
    // Check if the model from latestSelectedModel exists in artModels
    const latestSelectedModelIndex =
      artModels &&
      artModels.findIndex(
        (model: artModelsInterface) => model.id === latestSelectedModelId
      );

    if (inspirationModelIndex !== -1) {
      // Model exists, call handleModelClick with the index and name
      handleModelClick(
        inspirationModelIndex,
        inspirationModelId,
        inspirationModel
      );
    } else if (latestSelectedModelIndex !== -1) {
      handleModelClick(
        latestSelectedModelIndex,
        latestSelectedModelId,
        latestSelectedModel
      );
    } else {
      // Ensure that the initial selected model index is within the valid range
      if (
        selectedModalImageIndex >= 0 &&
        selectedModalImageIndex < combineArtStylesModels.length
      ) {
        const initialModel = artModels[selectedModalImageIndex];
        console.log("initialModel", initialModel.title);

        handleModelClick(
          selectedModalImageIndex,
          initialModel.id,
          initialModel.name,
          initialModel.title
        );
      }
    }
  }, [
    inspirationPrompt ? inspirationPrompt : undefined,
    artModels,
    latestSelectedModel,
  ]);

  const combineArtStylesModels = artStyles.map((style: any) => {
    const matchingModel = artModels.find(
      (model: any) => model.namitemName === style.model
    );
    if (matchingModel) {
      return {
        ...style,
        ...matchingModel,
      };
    } else {
      return style;
    }
  });

  // fetch live_urls from firebase
  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      try {
        // below getdocs is used to get all documents from database
        const querySnapshot = await getDocs(collection(firestore, "live_urls"));
        // const fetchedData = [];
        const fetchedData: liveUrlsInterface[] = [];

        querySnapshot.forEach((doc) => {
          // Cast the data to the expected interface
          fetchedData.push({
            id: doc.id,
          });
        });

        setLiveUrlsData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromFirestore();
  }, []);

  useEffect(() => {
    if (liveUrlsData.length > 0) {
      setUrl(`http://${liveUrlsData[0].id}`);
    } else {
      console.log("liveUrlsData is empty");
    }
  }, [liveUrlsData]);

  const [completeResponseDataImages, setCompleteResponseDataImages] =
    useState<any>([]);
  const [isImageProcessed, setIsImageProcessed] = useState(false);
  const [isInspiration, setIsInspiration] = useState<boolean>(false);
  const [rembgImages, setRembgImages] = useState<any>([]);
  const [magicEditFeature, setMagicEditFeature] = useState<string>("");
  const [rembgImagesState, setRembgImagesState] = useState<any>([]);
  const [imgUrl, setImgUrl] = useState<any>(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const MAX_IMAGE_COUNT = 4;
  const [newImages, setNewImages] = useState([]);
  const [newImagesUpdated, setNewImagesUpdated] = useState<any>([]); // Array to store updated images
  useEffect(() => {
    if (inspirationImage === "") {
      return;
    }
    setIsInspiration(true);
    setCompleteResponseDataImages([inspirationImage]);

    setInitialLoad(false);
  }, [inspirationImage]);
  const updateLatestGeneratedImages = (
    latestImagesdata: any,
    selectedModelId: string,
    allGeneratedImages: any,
    latestGeneratedImages: any
  ) => {
    const existingPromptIndex = latestGeneratedImages.findIndex((item: any) => {
      // Check if all properties of the objects are the same
      return (
        item.latestImagesdata.prompt === latestImagesdata.prompt &&
        item.latestImagesdata.override_settings.sd_model_checkpoint ===
          selectedModel &&
        item.latestImagesdata.styles[0] === selectedStyleName &&
        item.latestImagesdata.width === latestImagesdata.width &&
        item.latestImagesdata.height === latestImagesdata.height &&
        item.latestImagesdata.seed === latestImagesdata.seed &&
        item.latestImagesdata.steps === latestImagesdata.steps
      );
    });

    if (existingPromptIndex !== -1) {
      const updatedLatestImages = latestGeneratedImages.map(
        (item: any, index: number) => {
          if (index === existingPromptIndex) {
            return {
              latestImagesdata: latestImagesdata,
              selectedModelId: selectedModelId,
              images: [...item.images, ...allGeneratedImages],
            };
          } else {
            return item;
          }
        }
      );

      return updatedLatestImages;
    } else {
      // If the prompt is not found, add a new entry to the array
      const updatedLatestImages = [
        ...latestGeneratedImages,
        {
          latestImagesdata: latestImagesdata,
          selectedModelId: selectedModelId,
          images: allGeneratedImages,
        },
      ];
      return updatedLatestImages;
    }
  };

  const findIndexByDimensions = (
    width: number,
    height: number,
    ratiosData: any
  ) => {
    const matchingIndex = ratiosData.findIndex(
      (ratioData: any) =>
        ratioData.width === width && ratioData.height === height
    );

    return matchingIndex;
  };

  const [latestSelectedImageData, setLatestSelectedImageData] =
    useState<any>(null);
  const [latestSelectedImages, setLatestSelectedImages] = useState<any>(null);
  const [showLatestImage, setShowLatestImage] = useState(false);
  const handleLatestImageClick = (latestImagesData: any, index: number) => {
    setLatestSelectedIndex(index);
    setLatestSelectedImages(latestImagesData.images);
    setLatestSelectedImageData(latestImagesData?.latestImagesdata);
    setPromptValue(latestImagesData?.latestImagesdata?.prompt);
    setNegativePromptValue(latestImagesData?.latestImagesdata?.negative_prompt);
    setLatestSelectedModel(
      latestImagesData?.latestImagesdata?.override_settings?.sd_model_checkpoint
    );
    setLatestSelectedModelId(latestImagesData.selectedModelId);
    setSelectedStyleName(latestImagesData?.latestImagesdata?.styles[0]);
    setSamplerIndex(latestImagesData?.latestImagesdata?.sampler_index);
    setSeedInputValue(latestImagesData?.latestImagesdata?.seed);
    setStepsValue(latestImagesData?.latestImagesdata?.steps);
    setImageWidth(latestImagesData?.latestImagesdata?.width);
    setImageHeight(latestImagesData?.latestImagesdata?.height);
    // Find aspect ratio based on image width and height
    const latestImagesAspectRatioData = FindAspectRatioData(
      latestImagesData?.latestImagesdata?.width,
      latestImagesData?.latestImagesdata?.height
    );

    setAspectRatio(latestImagesAspectRatioData.aspectRatio);
    setAspectRatioImage(latestImagesAspectRatioData.imgSrc?.src);
    const latestImages = findIndexByDimensions(
      latestImagesData?.latestImagesdata?.width,
      latestImagesData?.latestImagesdata?.height,
      aspectRatiosData
    );
    setLatestImagesIndex(latestImages);
    setShowLatestImage(true);
  };
  console.log("LatestSelectedIndex", latestSelectedIndex);

  // Function to resize an image to a specific width and height
  const resizeImage = async (
    dataUrl: string,
    desiredWidth: number,
    desiredHeight: number
  ): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();

      img.src = dataUrl;

      img.onload = () => {
        let width = desiredWidth;
        let height = desiredHeight;

        if (width > height) {
          height = Math.pow(desiredWidth / desiredHeight, -1) * 768;
          width = 768;
        } else if (width < height) {
          height = 768;
          width = Math.pow(desiredHeight / desiredWidth, -1) * 768;
        } else {
          height = 768;
          width = 768;
        }

        // Use a setTimeout to ensure that the canvas is drawn after the image is loaded
        setTimeout(() => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = width;
          canvas.height = height;

          // Draw the image on the canvas
          ctx?.drawImage(img, 0, 0, width, height);

          // Get the resized data URL
          const resizedDataUrl = canvas.toDataURL("image/png");
          resolve(resizedDataUrl);
        }, 0);
      };
    });
  };

  const TextToImageGen = async (e: any) => {
    e.preventDefault();

    const userDocRef = doc(firestore, "users", currentUserId);
    try {
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userCredits = userDocSnapshot.data().credits;
        const creditsToDeduct = parseInt(selectedImage, 10);

        const remainingCredits = userCredits - creditsToDeduct;

        if (remainingCredits >= 0) {
          let allGeneratedImages: any = [];
          setLoading(true);
          setInitialLoad(false);

          setIsInspiration(false);
          const batchSize = selectedImage.split(" ")[0];
          if (batchSize) {
            const totalImages = parseInt(batchSize, 10);
            const chunkSize = 4;
            const numChunks = Math.ceil(totalImages / chunkSize);

            // Create and send the payload chunks
            for (let i = 0; i < numChunks; i++) {
              const start = i * chunkSize;
              const end = Math.min(start + chunkSize, totalImages);
              const chunkSizeToSend = end - start;
              const data: payloadData = {
                prompt: promptValue,
                styles: [selectedStyleName],
                steps: 20,
                override_settings: { sd_model_checkpoint: selectedModel },
                negative_prompt: negativePromptValue,
                seed: seedInputValue,
                //   cfg_scale= e.cfgData,
                width: imageWidth,
                height: imageHeight,
                restore_faces: false,
                sampler_index: samplerIndex,
                batch_size: chunkSizeToSend.toString(),
              };

              // Create the payload for this chunk

              if (base64Image) {
                data.alwayson_scripts = {
                  roop: {
                    args: [base64Image, true],
                  },
                };
              }
              console.log("data", data);

              let itemId;
              if (selectedModel === "Ultimate XL") {
                // Give priority to menuItem selection if selectedModal is ultimate
                itemId = 1;
              } else {
                itemId = 0;
              }

              let handleMenuItemResponseDataPromise =
                handleMenuItemClick(itemId);
              const handleMenuItemResponseData =
                await handleMenuItemResponseDataPromise;
              const apiUrl = `${handleMenuItemResponseData.url}`;
              const requestOptions = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Basic ${btoa(`${username}:${password}`)}`,
                },
                body: JSON.stringify(data),
              };

              try {
                const response = await fetch(apiUrl, requestOptions);
                const status = response.status;

                if (response.ok) {
                  const responseData = await response.json();
                  allGeneratedImages = allGeneratedImages.concat(
                    ...responseData.images
                  );

                  // allGeneratedImages.push(responseData.images);
                  setResponseData(responseData);
                  setInitialPromptValue(promptValue);
                  setInitialAspectRatio(aspectRatio);
                  setInitialSelectedModel(selectedModel);
                  setInitialSelectedStyleImage(selectedStyleImage);
                  setInitialWidth(imageWidth);
                  setInitialHeight(imageHeight);
                  getInitialSelectedModelTitle();
                  // props.updateStatus((status) => status - 1);
                } else {
                  console.error("Request failed with status:", status);
                }
              } catch (error) {
                console.error("Error:", error);
              }
              const updatedLatestImages = updateLatestGeneratedImages(
                data,
                selectedModelId!,
                allGeneratedImages,
                latestGeneratedImages
              );

              setLatestGeneratedImages(updatedLatestImages);
            }
          }
          if (allGeneratedImages.length > 0) {
            // Update the user's credits in the Firebase Firestore document
            if (currentUserData) {
              // Initialize Firebase services
              const userDocRef = doc(firestore, "users", currentUserId);
              try {
                await updateDoc(userDocRef, { credits: remainingCredits });
                setRemainingCreditsUpdated(true);
              } catch (error) {
                console.error("Error updating user data: ", error);
              }
            }
          }
          setCompleteResponseDataImages(allGeneratedImages);

          setLoading(false);
          setGeneratedImage(true);
        } else {
          setBuyCredits(true);
        }
      } else {
        console.log("User document does not exist in the database.");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
    setShowLatestImage(false);
  };

  // remove backgroundBackground image funtionality starts
  const handleRemoveBackground = async (removeBgImage: string) => {
    setLoading(true);
    setIsInspiration(false);
    setShowLatestImage(false);
    let magicEditId;
    magicEditId = 11;

    let handleMenuItemResponseDataPromise = handleMenuItemClick(magicEditId);
    const handleMenuItemResponseData = await handleMenuItemResponseDataPromise;
    const apiUrl = `${handleMenuItemResponseData.url}`;
    console.log("apiUrl", apiUrl);

    const rembgbase64Image = `data:image/jpeg;base64,${removeBgImage}`;

    const resizedImage = await resizeImage(
      rembgbase64Image,
      imageWidth,
      imageHeight
    );
    const data: payloadData = {
      input_image: resizedImage,
      model: "u2net",
      return_mask: false,
      alpha_matting: false,
      alpha_matting_foreground_threshold: 240,
      alpha_matting_background_threshold: 10,
      alpha_matting_erode_size: 10,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      const status = response.status;

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.image) {
          setCompleteResponseDataImages([responseData.image]);
          setInitialLoad(false);
          // setIsImageProcessed(true);
        } else {
          console.log("no image generated till now");
        }
      } else {
        console.error("Request failed with status:", status);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  // remove backgroundBackground image funtionality ends

  // Upscale image funtionality starts
  const [isUpscaled, setIsUpscaled] = useState(false);
  const toast = useToast();
  const handleUpscale = async (
    upscaleImage: string,
    upscaleType: string,
    upscaleImageIndex: number
  ) => {
    // setLoading(true);
    setIsInspiration(false);
    // setShowLatestImage(false);
    let magicEditId = 3;

    let handleMenuItemResponseDataPromise = handleMenuItemClick(magicEditId);
    const handleMenuItemResponseData = await handleMenuItemResponseDataPromise;
    const apiUrl = `${handleMenuItemResponseData.url}`;

    const data: payloadData = {
      resize_mode: 0,
      show_extras_results: true,
      gfpgan_visibility: 1,
      codeformer_visibility: 0,
      codeformer_weight: 1,
      upscaling_resize: 1,
      upscaler_1: "R-ESRGAN 4x+",
      upscale_first: false,
      image: upscaleImage,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const status = response.status;
      if (response.ok) {
        const responseData = await response.json();
        if (upscaleType === "latest Images Upscale") {
          setLatestGeneratedImages((prevImages) => {
            // Make a shallow copy of the array
            const updatedImagesArray = [...prevImages];

            // Make a shallow copy of the object at latestSelectedIndex
            const updatedObject = {
              ...updatedImagesArray[latestSelectedIndex],
            };

            // Make a shallow copy of the images array inside the object
            const updatedImages = [...updatedObject.images];

            // Update the specific image at upscaleImageIndex
            updatedImages[upscaleImageIndex] = responseData.image;

            // Update the images array inside the object
            updatedObject.images = updatedImages;

            // Update the object at latestSelectedIndex
            updatedImagesArray[latestSelectedIndex] = updatedObject;

            return updatedImagesArray;
          });
        } else {
          setCompleteResponseDataImages([responseData.image]);
        }
        setIsUpscaled(true);

        setRembgImagesState(true);
      } else {
        console.error("Request failed with status:", status);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isUpscaled) {
      setLatestSelectedImages(
        latestGeneratedImages[latestSelectedIndex].images
      );
      setIsUpscaled(false);
      toast({
        title: "Upcaled Successfully",
        status: "success",
        position: "top-right",
        duration: null,
        isClosable: true,
      });
    }
  }, [isUpscaled]);
  console.log("latestGeneratedImages", latestGeneratedImages);
  // Upscale image funtionality ends

  // ClarifyHands Image functionality starts
  const ClarifyHandsInImage = async (itemName: any) => {
    let itemId;
    if (selectedModel === "Ultimate XL") {
      itemId = 1;
    } else {
      itemId = 0;
    }
    let handsImagePayload: payloadData = {};
    if (itemName === "Clarify Hands") {
      handsImagePayload = {
        prompt: promptValue,
        styles: [selectedStyleName],
        steps: 20,
        override_settings: { sd_model_checkpoint: selectedModel },
        negative_prompt: negativePromptValue,
        seed: seedInputValue,
        //   cfg_scale= e.cfgData,
        width: imageWidth,
        height: imageHeight,
        restore_faces: false,
        sampler_index: samplerIndex,
        alwayson_scripts: {
          ADetailer: {
            args: [
              true,
              {
                ad_model: "hand_yolov8s.pt",
              },
            ],
          },
        },
      };
    }

    let handleMenuItemResponseDataPromise = handleMenuItemClick(itemId);
    const handleMenuItemResponseData = await handleMenuItemResponseDataPromise;
    const apiUrl = `${handleMenuItemResponseData.url}`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
      body: JSON.stringify(handsImagePayload),
    };
    try {
      setLoading(true);
      setInitialLoad(false);

      setIsInspiration(false);
      const response = await fetch(apiUrl, requestOptions);
      const status = response.status;
      if (response.ok) {
        const responseData = await response.json();

        setCompleteResponseDataImages([responseData.images[0]]);
        setRembgImagesState(true);
      } else {
        console.error("Request failed with status:", status);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Update the array of latestGeneratedImages using the separated function
    setLoading(false);
    setGeneratedImage(true);
  };
  // ClarifyHands Image functionality ends

  const handleMenuItemClick = async (itemId?: any) => {
    const apiUrl = `${serverIp}:8888/feature/${itemId}`;
    console.log("apiUrl", apiUrl);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${endpointUsername}:${endpointPassword}`
        )}`, // decodes string
      },
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const status = response.status;

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
      } else {
        console.error("Request failed with status:", status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // functionality for download generated images
  const handleImageGenerated = (imageData: any) => {
    setDownloadedImage(imageData);
  };
  const downloadImage = () => {
    if (downloadedImage) {
      const a = document.createElement("a");
      a.href = `data:image/jpeg;base64,${downloadedImage}`;
      a.download = "adicto.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  console.log("latestGeneratedImages", latestGeneratedImages);

  // useEffect hook to watch for changes in downloadedImage state
  useEffect(() => {
    // Check if downloadedImage is defined before triggering download
    if (downloadedImage !== undefined) {
      downloadImage();
    }
  }, [downloadedImage]);

  async function createZip(images: any) {
    const zip = new JSZip();

    images.forEach((imageData: any, index: number) => {
      zip.file(`addicto_${index}.jpg`, imageData, { base64: true });
    });

    return zip.generateAsync({ type: "blob" });
  }

  const handleDownload = async () => {
    const zipBlob = await createZip(
      completeResponseDataImages && !showLatestImage
        ? completeResponseDataImages
        : latestSelectedImages?.latestImagesData.images
    );
    const url = window.URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "addicto_images.zip";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);
  const [croppedImage, setCroppedImage] = useState<any>();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleCloseSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };
  const getSliceRange = (breakpoint: string) => {
    switch (breakpoint) {
      case "lg":
        return 2;
      case "2xl":
        return 6;
      default:
        return 6;
    }
  };

  const currentBreakpoint: any = useBreakpointValue({ lg: "lg", "2xl": "2xl" });
  const sliceRange = getSliceRange(currentBreakpoint);

  const { filteredStyles, handleStylesInputChange } =
    useFilteredStyles(selectedStyles);

  const { filteredModels, handleModelInputChange } =
    useFilteredModels(artModels);

  return (
    <Box bg={"#0A011A"}>
      <ImageGenerationNavbar
        currentUserId={currentUserId}
        setRemainingCreditsUpdated={setRemainingCreditsUpdated}
        remainingCreditsUpdated={remainingCreditsUpdated}
        filteredPaidUsersData={filteredPaidUsersData[0]}
        productPriceData={productPriceData}
        stripeSecretKey={stripeSecretKey}
        fireconfig={fireconfig}
      />
      <Image
        src={AllImages.groupLayers?.src}
        objectFit={"cover"}
        h={"100%"}
        alt="purpleMask"
        pos={"absolute"}
        top={0}
        right={"0"}
        overflow={"hidden"}
      />
      <Box h={"80px"}></Box>
      <Flex
        justifyContent={"space-between"}
        pb={"17px"}
        minH={"100vh"}
        px={{ lg: "5px", "2xl": "11px" }}
      >
        <Box
          pt={"3.2vh"}
          position="absolute"
          top={0}
          mx={"11px"}
          left={isSidebarOpen ? "0" : "-7.4vw"}
          height="100vh"
          width="7.4vw"
          transition="left 0.3s ease-in-out"
          color={"white"}
        >
          <Flex
            color={"white"}
            pos={"relative"}
            h={"100vh"}
            justify={"center"}
            align={"center"}
          >
            <Flex
              w={"25px"}
              h={"12vh"}
              align={"center"}
              justify={"flex-end"}
              bg={"rgba(35, 31, 44, 0.7)"}
              borderRadius={"0 30px 30px 0"}
              pos={"absolute"}
              right={"-25px"}
              px={"9.3px"}
              cursor="pointer"
              onClick={handleToggleSidebar}
            >
              <Image
                src={AllImages.leftArrowIcon.src}
                alt="left Arrow Icon"
                objectFit={"contain"}
              />
            </Flex>
            <Grid
              className="leftSidebar-background"
              w={"7.4vw"}
              px={"0.72vw"}
              py={"3.3vh"}
              borderRadius={"30px"}
            >
              <Text
                textAlign={"center"}
                fontFamily={"poppins"}
                fontSize={{ lg: "16px", "2xl": "18px" }}
                fontWeight={700}
                pb={"2.8vh"}
              >
                Tools
              </Text>

              <Grid
                w={"100%"}
                borderBottom="1px solid rgba(255, 255, 255, 0.5)"
                py={"1.3vh"}
                gap={"0.9vh"}
                justifyItems={"center"}
              >
                <Image
                  src={AllImages.animeIcon.src}
                  w={"39px"}
                  h={"39px"}
                  objectFit={"contain"}
                  alt="anime icon"
                />
                <Text
                  fontFamily={"poppins"}
                  fontSize={{ lg: "14px", "2xl": "16px" }}
                  fontWeight={500}
                >
                  Anime
                </Text>
              </Grid>
              <Grid
                w={"100%"}
                borderBottom="1px solid rgba(255, 255, 255, 0.5)"
                py={"1.3vh"}
                gap={"0.9vh"}
                justifyItems={"center"}
              >
                <Image
                  src={AllImages.refaceIcon.src}
                  w={"39px"}
                  h={"39px"}
                  objectFit={"contain"}
                  alt="anime icon"
                />
                <Text
                  fontFamily={"poppins"}
                  fontSize={{ lg: "14px", "2xl": "16px" }}
                  fontWeight={500}
                >
                  Reface
                </Text>
              </Grid>
              <Grid
                w={"100%"}
                borderBottom="1px solid rgba(255, 255, 255, 0.5)"
                py={"1.3vh"}
                gap={"0.9vh"}
                justifyItems={"center"}
              >
                <Image
                  src={AllImages.enhanceIcon.src}
                  w={"39px"}
                  h={"39px"}
                  objectFit={"contain"}
                  alt="anime icon"
                />
                <Text
                  fontFamily={"poppins"}
                  fontSize={{ lg: "14px", "2xl": "16px" }}
                  fontWeight={500}
                >
                  Enhance
                </Text>
              </Grid>
              <Grid
                w={"100%"}
                // borderBottom="1px solid rgba(255, 255, 255, 0.5)"
                pt={"1.3vh"}
                gap={"0.9vh"}
                justifyItems={"center"}
              >
                <Image
                  src={AllImages.remixIcon.src}
                  w={"39px"}
                  h={"39px"}
                  objectFit={"contain"}
                  alt="anime icon"
                />
                <Text
                  fontFamily={"poppins"}
                  fontSize={{ lg: "14px", "2xl": "16px" }}
                  fontWeight={500}
                >
                  Remix
                </Text>
              </Grid>
            </Grid>
          </Flex>
        </Box>

        <Box w={"fill-available"} pt={"3.2vh"}>
          <Flex justify={"center"}>
            <GeneratedImagesCarausel
              // base64Image={base64Image}
              // setBase64Image={setBase64Image}
              // handleFileChange={handleFileChange}
              initialLoad={initialLoad}
              isInspiration={isInspiration!}
              latestSelectedImages={latestSelectedImages}
              loading={loading}
              responseDataImages={completeResponseDataImages}
              onImageGenerated={handleImageGenerated}
              handleRemoveBackground={handleRemoveBackground}
              handleUpscale={handleUpscale}
              ClarifyHandsInImage={ClarifyHandsInImage}
              showLatestImage={showLatestImage}
            />
          </Flex>
          <Flex justify={"center"}>
            <Box pos={"fixed"} bottom={"10.8vh"}>
              <InputGroup w={"58vw"}>
                <InputLeftElement
                  borderRight={"1px solid #303030"}
                  w={"fit-content"}
                  ml={"17.4px"}
                  mt={"18px"}
                >
                  <Flex w={"72px"}>
                    <Flex
                      w={"56px"}
                      h={"56px"}
                      border={"1px solid #303030"}
                      borderRadius={"20px"}
                      justify={"center"}
                      align={"center"}
                    >
                      <Image
                        w={"26px"}
                        h={"26px"}
                        objectFit={"contain"}
                        src={AllImages.imgIcon.src}
                        alt="image icon"
                      />
                    </Flex>
                  </Flex>
                </InputLeftElement>
                <Input
                  className="artGeneratorInput-background"
                  pl={"96px"}
                  pr={"300px"}
                  type={"text"}
                  border={"1px solid #286F64"}
                  _hover={{
                    borderColor: "#286F64",
                  }}
                  focusBorderColor={"#286F64"}
                  paddingInlineStart={0}
                  h={"79px"}
                  borderRadius={"30.36px"}
                  color={"white"}
                  placeholder="Imagine and Write: Adicto Ai creates your vision"
                  sx={{
                    "::placeholder": {
                      fontSize: "16px",
                      fontFamily: "poppins",
                      fontStyle: "italic",
                      fontWeight: "500",
                      color: "white",
                    },
                  }}
                  value={promptValue}
                  onChange={handlePromptChange}
                  onClick={handleCloseSidebar}
                />
                <InputRightElement h={"100%"} w={"auto"} pr={"7.4px"}>
                  <Flex gap={"33px"}>
                    <Flex gap={"15px"}>
                      <Image
                        src={AllImages.promptcategories.src}
                        objectFit={"contain"}
                        alt="promp categories"
                      />
                      <Image
                        src={AllImages.autoPromptIcon.src}
                        objectFit={"contain"}
                        alt="promp categories"
                      />
                    </Flex>
                    <Button
                      borderRadius={"20px"}
                      h={"60px"}
                      w={"160px"}
                      paddingInlineStart={0}
                      paddingInlineEnd={0}
                      bgGradient={"linear(to right, #19F4D4, #4658AE)"}
                      color={"#ffffff"}
                      letterSpacing={"1px"}
                      fontSize={{ lg: "18px" }}
                      fontWeight={700}
                      fontFamily={"poppins"}
                      _hover={{
                        bgGradient: "linear(to right, #19F4D4, #4658AE)",
                      }}
                      onClick={TextToImageGen}
                    >
                      Generate
                    </Button>
                  </Flex>
                </InputRightElement>
              </InputGroup>
            </Box>
          </Flex>
        </Box>
        <PaymentModal
          isSubscriptionOpen={isSubscriptionOpen}
          onSubscriptionClose={onSubscriptionClose}
          stripeSecretKey={stripeSecretKey}
          productPriceData={productPriceData}
        />
        <Box
          maxW={{ lg: "240px", "2xl": "355px" }}
          minW={{ lg: "240px", "2xl": "355px" }}
        >
          <Flex pos={"fixed"} right={"11px"}>
            <Flex
              minW={"7.7vw"}
              maxW={"7.7vw"}
              my={"40px"}
              bg={"rgba(51, 51, 51, 0.7)"}
              borderRadius={"30px 0 0 30px"}
              pos={"relative"}
              right={isSidebarOpen ? "0" : "-6.3vw"}
              transition="right 0.3s ease-in-out"
            >
              <Box position="absolute" top={0} color={"white"}>
                <Flex color={"white"} pos={"relative"} mt={"40px"}>
                  <Flex
                    color={"white"}
                    pos={"relative"}
                    align={"center"}
                    position={"absolute"}
                    style={{ height: "calc(100vh - 160px)" }}
                  >
                    <Flex
                      w={"25px"}
                      h={"12vh"}
                      align={"center"}
                      justify={"flex-end"}
                      bg={"rgba(35, 31, 44, 0.7)"}
                      borderRadius={"30px 0 0 30px"}
                      pos={"absolute"}
                      left={"-25px"}
                      px={"9.3px"}
                      cursor="pointer"
                      onClick={handleToggleSidebar}
                    >
                      <Image
                        src={AllImages.leftArrowIcon.src}
                        alt="left Arrow Icon"
                        objectFit={"contain"}
                      />
                    </Flex>
                  </Flex>
                  <Flex
                    className="sidebar-styles hide-scrollbar"
                    overflowY={"auto"}
                    opacity={isSidebarOpen ? "1" : "0"}
                    transition="opacity 0.3s ease-in-out"
                  >
                    <Flex align={"center"}>
                      <GeneratedImagesHistory
                        latestGeneratedImages={latestGeneratedImages}
                        handleLatestImageClick={handleLatestImageClick}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            <GridItem
              className="imgGenRightSidebar-background hide-scrollbar"
              maxW={{ lg: "240px", "2xl": "355px" }}
              borderRadius={{ lg: "15px", "2xl": "30px" }}
            >
              <Box
                className="hide-scrollbar"
                style={{ height: "calc(93vh - 80px)" }}
                overflowY={"auto"}
                mt={"2.1vh"}
                mb={"4.6vh"}
              >
                <Stack gap={0}>
                  <OptionHeaderWithIcon title="Styles" />
                  {selectedStyles.map((style, index) => (
                    <Grid
                      key={index}
                      pt={"2.5vh"}
                      px={{ lg: "10px", "2xl": "25px" }}
                      templateColumns={{
                        lg: "repeat(2, 1fr)",
                        "2xl": "repeat(3, 1fr)",
                      }}
                      gap={{ lg: "16px", "2xl": "22px" }}
                    >
                      {style.styles
                        .slice(0, sliceRange)
                        .map((styles: any, i: number) => (
                          <TextToImagestyles
                            key={i}
                            uniqueKey={styles.id}
                            icon={styles.icon}
                            handleStyleClick={() =>
                              handleStyleClick(
                                styles.id,
                                styles.title,
                                styles.name
                              )
                            }
                            selectedStyleImageIndex={selectedStyleImageIndex}
                            title={styles.title}
                            stylesName={styles.name}
                          />
                        ))}
                    </Grid>
                  ))}

                  {/* Show more link */}
                  {/* {itemsToShow < selectedStyles.length && ( */}
                  <Box className="styles-menu">
                    <Menu>
                      <MenuButton mt={"2.14vh"} mb={"1.5vh"} w={"100%"}>
                        <Text
                          textAlign={"center"}
                          color={"white"}
                          fontSize={"10px"}
                          bgGradient="linear(to-r, #19F4D4, #5D89F9)"
                          bgClip="text"
                          fontFamily={"poppins"}
                        >
                          See All
                        </Text>
                      </MenuButton>
                      <MenuList
                        className="hide-scrollbar"
                        style={{
                          backgroundColor: "rgba(51, 51, 51, 0.7)",
                          transform: "translate(0, 0)",
                          backdropFilter: "blur(12px)",
                        }}
                        overflowY={"auto"}
                        pos={"fixed"}
                        top={0}
                        right={0}
                        w={"max-content"}
                        maxH={"570px"}
                        borderRadius={"30px"}
                        border={"none"}
                        pt={"3.3vh"}
                        pb={"2.2vh"}
                      >
                        <OptionHeaderWithIcon title="Styles" />
                        <InputGroup
                          mx={"1vw"}
                          mt={"1vh"}
                          bg={"#0A011A"}
                          w={"270px"}
                          h={{ lg: "28px", "2xl": "36px" }}
                          borderRadius={"12px"}
                          px={"10px"}
                        >
                          <Input
                            borderRadius={"12px"}
                            px={0}
                            height={"100%"}
                            border={"none"}
                            type="text"
                            placeholder="Search style"
                            color="#ffffff"
                            focusBorderColor="transparent"
                            _placeholder={{
                              color: "#444444",
                              fontFamily: "Poppins",
                              fontSize: "12px",
                              fontWeight: 500,
                            }}
                            onChange={handleStylesInputChange}
                          />
                          <InputRightElement pointerEvents="none">
                            <Image
                              src={AllImages.searchIcon.src}
                              alt="search icon"
                            />
                          </InputRightElement>
                        </InputGroup>
                        <Grid
                          className="hide-scrollbar"
                          pt={"2.5vh"}
                          px={"1.3vw"}
                          gap={{ lg: "8px", "2xl": "22px" }}
                          templateColumns="repeat(3, 1fr)"
                          overflowY={"auto"}
                        >
                          {filteredStyles?.map(
                            (filteredStyle: any, index: number) => (
                              <TextToImagestyles
                                key={index}
                                uniqueKey={filteredStyle.id}
                                icon={filteredStyle.icon}
                                handleStyleClick={() =>
                                  handleStyleClick(
                                    filteredStyle.id,
                                    filteredStyle.title,
                                    filteredStyle.name
                                  )
                                }
                                selectedStyleImageIndex={
                                  selectedStyleImageIndex
                                }
                                title={filteredStyle.title}
                                stylesName={filteredStyle.name}
                              />
                            )
                          )}
                        </Grid>
                      </MenuList>
                    </Menu>
                  </Box>
                  <Stack
                    borderTop={"1px solid rgba(64, 65, 75, 0.5)"}
                    borderBottom={"1px solid rgba(64, 65, 75, 0.5)"}
                    pt={"0.8vh"}
                    pb={"3.3vh"}
                    gap={"10px"}
                  >
                    <OptionHeaderWithIcon title="Models" />
                    <Box className="models-menu">
                      <Menu>
                        <Flex
                          align="center"
                          justify={"space-between"}
                          mx={{ lg: "10px", "2xl": "25px" }}
                        >
                          <MenuButton
                            bg={"#0A011A"}
                            _hover={{
                              bg: "#0A011A",
                            }}
                            _active={{
                              bg: "#0A011A",
                            }}
                            w={{ lg: "180px", "2xl": "245px" }}
                            h={{ lg: "28px", "2xl": "36px" }}
                            borderRadius={{ lg: "8px", "2xl": "12px" }}
                            as={Button}
                          >
                            <Flex justify={"space-between"} align={"center"}>
                              <Text
                                textAlign={"left"}
                                color={"white"}
                                fontSize={"10px"}
                                fontFamily={"poppins"}
                              >
                                {getSelectedModelTitle()}
                              </Text>
                              <Image
                                src={AllImages.rightArrowIcon.src}
                                alt="right Arrow Icon"
                              />
                            </Flex>
                          </MenuButton>
                          <Image
                            w={{ lg: "30px", "2xl": "55px" }}
                            h={{ lg: "30px", "2xl": "55px" }}
                            borderRadius={{ lg: "8px", "2xl": "15px" }}
                            src={getSelectedModelImage()}
                            alt="model image"
                          />
                        </Flex>
                        <MenuList
                          className="hide-scrollbar"
                          style={{
                            backgroundColor: "rgba(51, 51, 51, 0.7)",

                            backdropFilter: "blur(12px)",
                          }}
                          overflowY={"auto"}
                          pos={"fixed"}
                          top={0}
                          right={0}
                          w={"max-content"}
                          maxH={"570px"}
                          borderRadius={"30px"}
                          border={"none"}
                          pt={"3.3vh"}
                          pb={"2.2vh"}
                        >
                          <OptionHeaderWithIcon title="Styles" />
                          <InputGroup
                            mx={"1vw"}
                            mt={"12px"}
                            bg={"#0A011A"}
                            w={"270px"}
                            h={{ lg: "28px", "2xl": "36px" }}
                            borderRadius={"12px"}
                            px={"10px"}
                          >
                            <Input
                              borderRadius={"12px"}
                              px={0}
                              height={"100%"}
                              border={"none"}
                              type="tel"
                              placeholder="Search style"
                              color="#ffffff"
                              focusBorderColor="transparent"
                              _placeholder={{
                                color: "#444444",
                                fontFamily: "Poppins",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                              onChange={handleModelInputChange}
                            />
                            <InputRightElement pointerEvents="none">
                              <Image
                                src={AllImages.searchIcon.src}
                                alt="search icon"
                              />
                            </InputRightElement>
                          </InputGroup>
                          <Grid
                            templateColumns="repeat(3, 1fr)"
                            px={"1vw"}
                            pt={"1.8vh"}
                            gap={{ lg: "8px", "2xl": "22px" }}
                          >
                            {filteredModels?.map(
                              (model: any, index: number) => (
                                <TextToImageModal
                                  key={index}
                                  stripeSecretKey={stripeSecretKey}
                                  productPriceData={productPriceData}
                                  uniqueKey={index}
                                  imageSrc={model.image}
                                  modelId={model.id}
                                  modelName={model.name}
                                  samplerIndex={model.sampler}
                                  title={model.title}
                                  isPremium={model.premium}
                                  isPro={filteredPaidUsersData[0]?.isPro!}
                                  handleModelClick={() =>
                                    handleModelClick(
                                      index,
                                      model.id,
                                      model.name,
                                      model.title,
                                      model.sampler
                                    )
                                  }
                                  selectedModalImageIndex={
                                    selectedModalImageIndex
                                  }
                                />
                              )
                            )}
                          </Grid>
                        </MenuList>
                      </Menu>
                    </Box>
                  </Stack>

                  {/* aspect ratio */}
                  <Stack
                    borderBottom={"1px solid rgba(64, 65, 75, 0.5)"}
                    pt={"0.8vh"}
                    pb={"3.3vh"}
                    gap={"10px"}
                  >
                    <OptionHeaderWithIcon title="Aspect Ratio" />
                    <Menu>
                      <Flex
                        align={"center"}
                        justify={"space-between"}
                        mx={{ lg: "10px", "2xl": "25px" }}
                      >
                        <MenuButton
                          bg={"#0A011A"}
                          _hover={{
                            bg: "#0A011A",
                          }}
                          _active={{
                            bg: "#0A011A",
                          }}
                          w={{ lg: "180px", "2xl": "245px" }}
                          h={{ lg: "28px", "2xl": "36px" }}
                          borderRadius={{ lg: "8px", "2xl": "12px" }}
                          as={Button}
                        >
                          <Flex justify={"space-between"} align={"center"}>
                            <Text
                              textAlign={"left"}
                              color={"white"}
                              fontSize={"10px"}
                              fontFamily={"poppins"}
                            >
                              {aspectRatio}
                            </Text>
                            <Image
                              src={AllImages.rightArrowIcon.src}
                              alt="right Arrow Icon"
                            />
                          </Flex>
                        </MenuButton>
                        <Image
                          src={aspectRatioImage}
                          objectFit={"contain"}
                          alt="model image"
                        />
                      </Flex>
                      <MenuList
                        className="hide-scrollbar aspectRatio-background"
                        borderRadius={"12px"}
                        border={"1px solid rgba(55, 52, 52, 0.5)"}
                        pt={0}
                        pb={0}
                        minW="0"
                        w={{ lg: "180px", "2xl": "245px" }}
                      >
                        {aspectRatiosData.map((ratio, index) => (
                          <AspectRatioButton
                            key={index}
                            uniqueKey={index}
                            isPro={filteredPaidUsersData[0]?.isPro!}
                            onButtonClick={onSubscriptionOpen}
                            handleAspectRatioChange={() =>
                              handleAspectRatioChange(
                                index,
                                ratio.width,
                                ratio.height,
                                ratio.ratio,
                                ratio.imgSrc
                              )
                            }
                            imgSrc={ratio.imgSrc}
                            ratio={ratio.ratio}
                          />
                        ))}
                      </MenuList>
                    </Menu>
                  </Stack>

                  {/* negative prompt */}
                  <Stack
                    borderBottom={"1px solid rgba(64, 65, 75, 0.5)"}
                    pt={"0.8vh"}
                    pb={"3.3vh"}
                    gap={"10px"}
                  >
                    <OptionHeaderWithIcon title="Negative Prompt" />
                    <Textarea
                      w={"auto"}
                      fontSize="12px"
                      h={"110px"}
                      mx={{ lg: "10px", "2xl": "25px" }}
                      bg={"#0A011A"}
                      color={"#ffffff"}
                      border={0}
                      borderRadius={{ lg: "8px", "2xl": "12px" }}
                      css={{
                        "::placeholder": {
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          fontWeight: "500",
                        },
                      }}
                      _focus={{
                        border: "none",
                      }}
                      _active={{
                        border: "none",
                      }}
                      placeholder="Enter text here...."
                      value={negativePromptValue}
                      onChange={
                        filteredPaidUsersData[0]?.isPro
                          ? handleNegativePromptChange
                          : onSubscriptionOpen
                      }
                      onClick={
                        !filteredPaidUsersData[0]?.isPro
                          ? onSubscriptionOpen
                          : undefined
                      }
                    />
                  </Stack>

                  {/* steps */}
                  <Stack
                    borderBottom={"1px solid rgba(64, 65, 75, 0.5)"}
                    pt={"0.8vh"}
                    pb={"3.3vh"}
                    gap={"10px"}
                  >
                    <OptionHeaderWithIcon
                      title="Steps"
                      stepsValue={stepsValue}
                    />
                    <Box px={{ lg: "10px", "2xl": "25px" }}>
                      <InputSlider
                        axis="x"
                        x={stepsValue}
                        xmin={minValue}
                        xmax={maxValue}
                        onChange={
                          filteredPaidUsersData[0]?.isPro
                            ? ({ x }) => handleStepsChange(x)
                            : onSubscriptionOpen
                        }
                      />
                    </Box>
                  </Stack>

                  {/* seed */}
                  <Stack pt={"0.8vh"} pb={"3.3vh"} gap={"10px"}>
                    <OptionHeaderWithIcon title="Seed" />
                    <Input
                      w={"auto"}
                      h={{ lg: "28px", "2xl": "36px" }}
                      fontSize={"12px"}
                      mx={{ lg: "10px", "2xl": "25px" }}
                      bg={"#0A011A"}
                      color={"#ffffff"}
                      border={0}
                      borderRadius={{ lg: "8px", "2xl": "12px" }}
                      placeholder="0 to 2474883647"
                      type="number"
                      min="-1"
                      max="2474883647"
                      value={seedInputValue}
                      onChange={
                        filteredPaidUsersData[0]?.isPro
                          ? handleSeedInputChange
                          : onSubscriptionOpen
                      }
                      onClick={() =>
                        !filteredPaidUsersData[0]?.isPro && onSubscriptionOpen
                      }
                      css={{
                        "::placeholder": {
                          fontFamily: "Poppins",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#444444",
                        },
                      }}
                      _focus={{
                        boxShadow: "none",
                        border: "0",
                      }}
                      _active={{
                        border: "none",
                      }}
                    />
                  </Stack>
                  {/* )} */}
                </Stack>
              </Box>
            </GridItem>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default TextToImageGenerator;
