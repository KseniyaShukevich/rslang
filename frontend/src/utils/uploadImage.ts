import { CLOUD_NAME } from "./constants";

const requestToCloudinary = async (formData: FormData): Promise<any> => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const response = await fetch(url, {
    method: "POST",
    body: formData
    });

  return await response.json();
}

export default async (file: any, formData: FormData) => {
  let imageId: string ='travelApp/avatar_ltzdkha';

  if (file) {
    const upload_preset: string = 'ujwcmlol';
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    const data = await requestToCloudinary(formData);
    imageId = data.public_id;
  }

  return imageId;
}
