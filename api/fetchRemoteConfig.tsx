import { fetchAndActivate, getAll } from "firebase/remote-config";
import { useEffect } from "react";

export const useFetchInspirations = (
  remoteConfigAsAny: any,
  setInspirations: (inspirations: any[]) => void
) => {
  useEffect(() => {
    const fetchRemoteConfig = async () => {
      try {
        if (remoteConfigAsAny) {
          // Replace these lines with your actual remote config utility functions
          await fetchAndActivate(remoteConfigAsAny);
          const authStylesModelsConfig = getAll(remoteConfigAsAny);

          const inspirations = (authStylesModelsConfig.inspirations as any)
            ._value;

          // Parse the JSON strings into JavaScript objects
          const inspirationsData = JSON.parse(inspirations);

          // Set state variables with the parsed data
          setInspirations(inspirationsData);
        }
      } catch (err) {
        console.log("Failed to fetch inspirations", err);
      }
    };

    fetchRemoteConfig();
  }, [remoteConfigAsAny, setInspirations]);
};

export const useFetchArtModels = (
  remoteConfigAsAny: any,
  setArtModels: (inspirations: any[]) => void
) => {
  useEffect(() => {
    const fetchRemoteConfig = async () => {
      try {
        if (remoteConfigAsAny) {
          // Replace these lines with your actual remote config utility functions
          await fetchAndActivate(remoteConfigAsAny);
          const authStylesModelsConfig = getAll(remoteConfigAsAny);

          const artModels = (authStylesModelsConfig.new_art_models as any)
            ._value;

          // Parse the JSON strings into JavaScript objects
          const artModelsData = JSON.parse(artModels);

          // Set state variables with the parsed data
          setArtModels(artModelsData);
        }
      } catch (err) {
        console.log("Failed to fetch art models", err);
      }
    };

    fetchRemoteConfig();
  }, [remoteConfigAsAny, setArtModels]);
};
