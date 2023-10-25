import type { API } from "nouislider";
import type { AxiosResponse } from "axios";

export interface ITargetElement extends HTMLDivElement {
	noUiSlider?: API,
}

export interface IItagInfo {
    itag: number,
    resolution: string,
}

export interface IApiPreviewVideo extends AxiosResponse {
	data: {
		videoFolderID: string,
		videoInfo: {
			lengthSeconds: string,
			videoItagList: IItagInfo[],
			audioItagList: IItagInfo[],
		},
	},
}

export interface IApiDownload extends AxiosResponse {
    data: Blob,
}

export interface ISendResult {
	range: {
		start: number,
		end: number,
	},
	mediaType: string,
	itag: number,
}
