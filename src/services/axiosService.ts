import type { AxiosInstance } from "axios";
import type { IApiSendResult } from "../model/youtubeModel";

import axios from "axios";

const baseURL: string = process.env.REACT_APP_YOUTUBE_URL || "http://localhost:5000/crawler/youtube/";
const youtubeRequest: AxiosInstance = axios.create({ baseURL });

export const apiGenPreviewVideo = (data: { url: string }) => youtubeRequest.post("/preview", data);

export const apiGetPreviewVideo = (data: string) => `${baseURL}/preview/${data}`;

export const apiDownload = (data: IApiSendResult) => youtubeRequest.post("/download", data, { responseType: "blob" });