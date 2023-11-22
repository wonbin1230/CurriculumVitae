import axios from "axios";

const baseURL: string = `https://www.googleapis.com/youtube/v3/search?key=${encodeURIComponent(process.env.REACT_APP_YT_API_TOKEN)}`;

export const apiGetYTList = (keyWord: string) => axios.get(`${baseURL}&q=${encodeURIComponent(keyWord)}&part=snippet&type=video&maxResults=12`);

export const apiGetPreviewVideo = (data: string) => `${baseURL}/preview/${data}`;