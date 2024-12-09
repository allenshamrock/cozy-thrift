import { createUploadthing, type FileRouter } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); //Fake auth function

//Creating a file router for my app,can contain multiple FileRoutes
export const ourFileRouter = {
  //Define as many routes as you like,each with a unique key slug
  categoryImageUploader: f({ image: { maxFileSize: "1MB" } })
    //set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      //this code runs on the server before upload
      const user = await auth(req);
      // If you throw an error,the user won't be able to upload
      if (!user) throw new UploadThingError("Unauthorized");
      //Whatever is returned here is able to be accessible in onUploadCompleted as 'metadata'
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      //This code "runs on your server" after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      //Whatever is returned here is sent to the clientside 'onUploadComplete' callback
      return { uploadedBy: metadata.userId };
    }),

  productImagesUploader: f({ image: { maxFileSize: "1MB" } })
    //set permissions and file routes for this FileRoute
    .middleware(async ({ req }) => {
      //This code runs on the server before upload
      const user = await auth(req);

      //If you throw an error,the user won't be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      //Whatever is returned here is sent to the clientside 'onUploadComplete' callback
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      //This code runs on your server after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      //Whatever is returned here is sent to the clientside 'onUploadComplete' callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
