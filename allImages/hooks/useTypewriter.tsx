import { useState, useEffect, useRef } from "react";

export const useTypewriter = (text: string, speed: number) => {
  const [displayText, setDisplayText] = useState("");
  const idx = useRef(0);
  const displayTextRef = useRef("");

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (idx.current < text.length) {
        displayTextRef.current += text.charAt(idx.current);
        setDisplayText(() => displayTextRef.current);
        idx.current += 1;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      // Clear the interval and reset state and refs
      clearInterval(typingInterval);
      setDisplayText("");
      idx.current = 0;
      displayTextRef.current = "";
    };
  }, [text, speed]);

  return displayText;
};

// import { useState, useEffect, useRef } from "react";

// export const useTypewriter = (text: string, speed: number) => {
//   const [displayText, setDisplayText] = useState("");
//   const idx = useRef(0);
//   const displayTextRef = useRef("");
//   const isIncreasingRef = useRef(true);

//   useEffect(() => {
//     const typingInterval = setInterval(() => {
//       if (isIncreasingRef.current) {
//         // Increase text
//         if (idx.current < text.length) {
//           displayTextRef.current += text.charAt(idx.current);
//           setDisplayText(() => displayTextRef.current);
//           idx.current += 1;
//         } else {
//           isIncreasingRef.current = false;
//         }
//       } else {
//         // Decrease text
//         if (idx.current > 0) {
//           idx.current -= 1;
//           displayTextRef.current = text.slice(0, idx.current);
//           setDisplayText(() => displayTextRef.current);
//         } else {
//           clearInterval(typingInterval);
//         }
//       }
//     }, speed);

//     return () => {
//       // Clear the interval and reset state and refs
//       clearInterval(typingInterval);
//       setDisplayText("");
//       idx.current = 0;
//       displayTextRef.current = "";
//       isIncreasingRef.current = true;
//     };
//   }, [text, speed]);

//   return displayText;
// };
