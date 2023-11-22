import type { API } from "nouislider";

interface Filter {
	url: string | null,
	name: string,
	description: string,
	active: boolean,
}

interface Refinement {
	q: string,
	url: string,
	thumbnails: string[] | null,
	bestThumbnail: string | null,
}

interface Image {
    url: string | null,
    width: number,
    height: number,
}

export interface IYTItem {
	type: "video",
	title: string,
	id: string,
	url: string,
	bestThumbnail: Image,
	thumbnails: Image[],
	isUpcoming: boolean,
	upcoming: number | null,
	isLive: boolean,
	badges: string[],

	author: {
		name: string,
		channelID: string,
		url: string,
		bestAvatar: Image | null,
		avatars: Image[],
		ownerBadges: string[],
		verified: boolean,
	} | null,
	description: string | null,
	views: number | null,
	duration: string | null,
	uploadedAt: string | null,
}

export interface IYTList {
	originalQuery: string,
	correctedQuery: string,
	results: number,
	activeFilters: Filter[],
	refinements: Refinement[],
	items: IYTItem[],
	continuation: null,
}

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
