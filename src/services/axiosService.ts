import type { AxiosInstance } from "axios";
import type { IApiSendResult } from "../modals/youtubeModal";

import axios from "axios";

const baseURL: string = process.env.youtubeURL || "http://192.168.1.21:5000/crawler/youtube/";
const youtubeRequest: AxiosInstance = axios.create({ baseURL });

export const apiGenPreviewVideo = (data: { url: string }) => youtubeRequest.post("/preview", data);

export const apiGetPreviewVideo = (data: string) => `${baseURL}/preview/${data}`;

export const apiDownload = (data: IApiSendResult) => youtubeRequest.post("/download", data, { responseType: "blob" });