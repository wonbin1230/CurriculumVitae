import type { API } from "nouislider";
import type { AxiosResponse } from "axios";

export interface ITargetElement extends HTMLDivElement {
	noUiSlider?: API,
}

export interface IItagInfo {
    itag: number,
    resolution: string,
}

export interface IWsPreviewVideo {
	lengthSeconds: string,
	videoItagList: IItagInfo[],
	audioItagList: IItagInfo[],
}

export interface IWsDownload {
    mediaType: string,
    titleName: string,
}

export interface ISendResult {
	range: {
		start: number,
		end: number,
	},
	mediaType: string,
	itag: number,
}

export interface IApiSendResult extends ISendResult {
    url: string,
}
