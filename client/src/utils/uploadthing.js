import { generateReactHelpers } from "@uploadthing/react";

const { useUploadThing, uploadFiles } = generateReactHelpers({
  // This tells the client where to find the UploadThing API endpoints
  url: "http://localhost:5000/api/v1/upload",
});

export { useUploadThing, uploadFiles };