import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { Box, Button, Image } from "@chakra-ui/react";
import { useDebounceEffect } from "@/dummyComponents/useDebounceEffect";
import { canvasPreview } from "@/dummyComponents/canvasPreview";
import AllImages from "@/allImages";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: 768,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function App() {
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

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(300, 300, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;

    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    const reader = new FileReader();
    const base64Promise = new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });

    reader.readAsDataURL(blob);
    const base64String: any = await base64Promise;

    setCroppedImage(base64String);
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

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
  const handleFaceSwap = async () => {
    // let handleMenuItemResponseDataPromise = handleMenuItemClick(magicEditId);
    // const handleMenuItemResponseData = await handleMenuItemResponseDataPromise;
    // const apiUrl = `${handleMenuItemResponseData.url}`;

    const apiUrl = `http://110.93.223.194:8888/faceswaplab/swap_face`;

    const rembgbase64Image = `data:image/jpeg;base64,${AllImages.wholeImage}`;

    const resizedImage = await resizeImage(rembgbase64Image, 1024, 1024);
    const data = {
      image: resizedImage,
      units: [
        {
          source_img: croppedImage,
          blend_faces: true,
          same_gender: false,
          sort_by_size: false,
          check_similarity: false,
          compute_similarity: false,
          min_sim: 0,
          min_ref_sim: 0,
          faces_index: [2],
          reference_face_index: 0,
        },
      ],
      postprocessing: {
        face_restorer_name: "CodeFormer",
        restorer_visibility: 1,
        codeformer_weight: 1,
        scale: 1,
        upscaler_visibility: 1,
      },
    };
    console.log("data");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`picatoapi:J7^s1k6*i2@`)}`,
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      const status = response.status;

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.image) {
          // setCompleteResponseDataImages([responseData.image]);
          console.log("responseData", responseData);

          // setIsImageProcessed(true);
        } else {
          console.log("no image generated till now");
        }
      } else {
        console.error("Request failed with status:", status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box className="App" maxW={"756px"} maxH={"471px"}>
      <div className="Crop-Controls">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
        <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? "off" : "on"}
          </button>
        </div>
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={1}

          // circularCrop
        >
          <Image
            objectFit={"contain"}
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            maxWidth={"100%"}
            maxHeight={"100%"}
            // style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <Box display={"none"}>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </Box>
          <div>
            <button onClick={onDownloadCropClick}>Download Crop</button>
            <div style={{ fontSize: 12, color: "#666" }}>
              You need to open the CodeSandbox preview in a new window (top
              right icon) as security restrictions prevent the download
            </div>
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                position: "absolute",
                top: "-200vh",
                visibility: "hidden",
              }}
            >
              Hidden download
            </a>
          </div>
        </>
      )}
      {croppedImage && <Image src={croppedImage} alt="Cropped" />}
      <Button onClick={handleFaceSwap}>handle FaceSwap</Button>
    </Box>
  );
}
