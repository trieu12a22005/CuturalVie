import { generateReactHelpers } from "@uploadthing/react";

const { useUploadThing, uploadFiles } = generateReactHelpers({
  // This tells the client where to find the UploadThing API endpoints
  url: `${import.meta.env.VITE_API_URL}/upload`,
});

export { useUploadThing, uploadFiles };