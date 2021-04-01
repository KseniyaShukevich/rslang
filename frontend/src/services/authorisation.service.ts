import { CLOUD_NAME } from "../utils/constants";

const signUp = async (user: IUser) => {
  try {
    const response = await fetch(`/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch(error) {
    alert(`Что-то пошло не так', ${error}`); // TODO handle error
  }
}

const login = async (creds: ICreds) => {
  try {
    const response = await fetch(`/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(creds),
    });
    return response;
  } catch(error) {
    alert(`Что-то пошло не так', ${error}`); // TODO handle error
  }
}

const requestToCloudinary = async (formData: FormData): Promise<any> => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const response = await fetch(url, {
      method: "POST",
      body: formData
    });
  return await response.json();
}

const uploadImage = async (file: any, formData: FormData) => {
  let imageId = '';
  if (file) {
    const upload_preset: string = 'ujwcmlol';
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    const data = await requestToCloudinary(formData);
    imageId = data.public_id;
  }
  return imageId;
}

export { signUp as logup, login, uploadImage };

export interface ICreds {
  email: string;
  password: string;
}

export interface IUser {
  imageId?: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  userId: string;
  imageId?: string;
  name?: string;
  message?: string;
  startDate: string;
  token: string;
  refreshToken?: string;
}
