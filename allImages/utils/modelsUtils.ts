import { useState, useEffect } from 'react';

interface Style {
  title: string;
}

export const useFilteredModels = (artModels: any) => {
  const [searchStylesValue, setSearchStylesValue] = useState('');
  const [filteredModels, setFilteredModels] = useState(artModels);

  const handleModelInputChange = (event: any) => {
    const inputValue = event.target.value;
    setSearchStylesValue(inputValue);

    // Filter the styles based on the input value
    const lowerCaseInput = inputValue.toLowerCase();
    const matchingStyles = artModels.filter(
      (styles: Style) => styles.title?.toLowerCase().includes(lowerCaseInput)
    );

    // Separate items that start with the search query from the rest
    const startsWithInput = matchingStyles.filter((matchingStyle: Style) =>
      matchingStyle.title.toLowerCase().startsWith(lowerCaseInput)
    );
    const remainingStyles = matchingStyles.filter(
      (remainingStyle: Style) => !remainingStyle.title.toLowerCase().startsWith(lowerCaseInput)
    );

    setFilteredModels([...startsWithInput, ...remainingStyles]);
  };

  useEffect(() => {
    if (artModels) {
      setFilteredModels(artModels);
    }
  }, [artModels]);

  return { searchStylesValue, filteredModels, handleModelInputChange };
};
