import { useState, useEffect } from 'react';

interface Style {
  title: string;
}

export const useFilteredStyles = (selectedStyles: any) => {
  const [searchStylesValue, setSearchStylesValue] = useState('');
  const [filteredStyles, setFilteredStyles] = useState(selectedStyles[0]?.styles);

  const handleStylesInputChange = (event: any) => {
    const inputValue = event.target.value;
    setSearchStylesValue(inputValue);

    // Filter the styles based on the input value
    const lowerCaseInput = inputValue.toLowerCase();
    const matchingStyles = selectedStyles[0]?.styles.filter(
      (styles: Style) => styles.title?.toLowerCase().includes(lowerCaseInput)
    );

    // Separate items that start with the search query from the rest
    const startsWithInput = matchingStyles.filter((matchingStyle: Style) =>
      matchingStyle.title.toLowerCase().startsWith(lowerCaseInput)
    );
    const remainingStyles = matchingStyles.filter(
      (remainingStyle: Style) => !remainingStyle.title.toLowerCase().startsWith(lowerCaseInput)
    );

    setFilteredStyles([...startsWithInput, ...remainingStyles]);
  };

  useEffect(() => {
    if (selectedStyles[0]?.styles) {
      setFilteredStyles(selectedStyles[0]?.styles);
    }
  }, [selectedStyles[0]?.styles]);

  return { searchStylesValue, filteredStyles, handleStylesInputChange };
};
