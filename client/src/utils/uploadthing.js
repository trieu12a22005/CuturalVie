import { generateReactHelpers } from "@uploadthing/react";

const { useUploadThing, uploadFiles } = generateReactHelpers({
  // This tells the client where to find the UploadThing API endpoints
  url: `${import.meta.env.VITE_API_URL}/upload`,
});

async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch {
    return [];
  }
}
export { useUploadThing, uploadFiles,fetchCountries };