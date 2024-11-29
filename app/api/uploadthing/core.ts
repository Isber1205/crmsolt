import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db"; // Importamos Prisma o la base de datos que utilices

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async () => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      // Verifica si el usuario está registrado en la base de datos
      const registeredUser = await prisma.user.findUnique({
        where: { 
          id: user.id,
          email: user.email ?? "",
        },
      });

      if (!registeredUser) {
        throw new UploadThingError("Unauthorized: User not found");
      }

      return { userId: registeredUser.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),

  bannerImageRoute: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      // Verifica si el usuario está registrado en la base de datos
      const registeredUser = await prisma.user.findUnique({
        where: { 
          id: user.id,
          email: user.email ?? "",
        },
      });

      if (!registeredUser) {
        throw new UploadThingError("Unauthorized: User not found");
      }

      return { userId: registeredUser.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
