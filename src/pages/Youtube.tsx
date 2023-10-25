import React, { useState, useRef, useEffect } from "react";
import type { Dispatch, SetStateAction, RefObject, MutableRefObject } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import noUiSlider, { PipsMode } from "nouislider";
import "nouislider/dist/nouislider.css";
import type {
	ITargetElement,
	IItagInfo,
	ISendResult,
    IApiPreviewVideo,
    IApiDownload,
} from "../modal/youtubeModal";

const youtubePage = () => {
	const [inputUrl, setInputUrl]: [string, Dispatch<string>] =
		useState<string>("");
	const [isLoading, setIsLoading]: [boolean, Dispatch<boolean>] =
		useState<boolean>(false);
	const [videoPath, setVideoPath]: [string, Dispatch<string>] =
		useState<string>("");
	const [isPreviewReady, setIsPreviewReady]: [boolean, Dispatch<boolean>] =
		useState<boolean>(false);
	const [videoItagList, setVideoItagList]: [
		IItagInfo[],
		Dispatch<IItagInfo[]>
	] = useState<IItagInfo[]>([]);
	const [audioItagList, setAudioItagList]: [
		IItagInfo[],
		Dispatch<IItagInfo[]>
	] = useState<IItagInfo[]>([]);
	const [isPreview, setIsPreview]: [boolean, Dispatch<boolean>] =
		useState<boolean>(false);
	const [duration, setDuration]: [number, Dispatch<number>] =
		useState<number>(1);
	const [pauseTime, setPauseTime]: [number, Dispatch<number>] =
		useState<number>(0);
	const [mediaActiveIndex, setMediaActiveIndex]: [number, Dispatch<number>] =
		useState<number>(0);
	const [videoItagActiveIndex, setVideoItagActiveIndex]: [
		number,
		Dispatch<number>
	] = useState<number>(0);
	const [audioItagActiveIndex, setAudioItagActiveIndex]: [
		number,
		Dispatch<number>
	] = useState<number>(0);
	const [sendResult, setSendResult]: [
		ISendResult,
		Dispatch<SetStateAction<ISendResult>>
	] = useState<ISendResult>();
	const [deletePath, setDeletePath]: [string, Dispatch<string>] =
		useState<string>("");

	const videoRef: MutableRefObject<HTMLVideoElement> =
		useRef<HTMLVideoElement>(null);
	const sliderRef: RefObject<ITargetElement> = useRef(null);
	const volumeRef: RefObject<ITargetElement> = useRef(null);

	const mediaTypes: string[] = ["MP3", "MP4"];

	const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputUrl(event.target.value);
	};

	const getYtVideo = async () => {
		setIsLoading(true);
		const apiUrl: string = "http://127.0.0.1:5000/crawler/youtube/preview";
		const result: IApiPreviewVideo = await axios.post(apiUrl, {
			url: inputUrl,
		});
		if (Object.keys(result.data).length !== 2) {
			setIsLoading(false);
			alert("Can not find viedo from youtube");
			return false;
		}
		setDeletePath(result.data.videoFolderID);
		setVideoPath(
			`http://127.0.0.1:5000/crawler/youtube/preview/${result.data.videoFolderID}`
		);
		setSendResult({
			range: {
				start: 0,
				end: Number(result.data.videoInfo.lengthSeconds),
			},
			mediaType:
				result.data.videoInfo.audioItagList.length > 0 ? "MP3" : "MP4",
			itag:
				result.data.videoInfo.audioItagList.length > 0
					? result.data.videoInfo.audioItagList[0].itag
					: result.data.videoInfo.videoItagList[0].itag,
		});
		setVideoItagList(result.data.videoInfo.videoItagList);
		setAudioItagList(result.data.videoInfo.audioItagList);
		setIsPreview(true);
		setIsLoading(false);
	};

	const onReady = async () => {
		await axios.delete(
			`http://127.0.0.1:5000/crawler/youtube/video/${deletePath}`
		);
		if (videoRef.current) {
			setDuration(videoRef.current.duration);
		}
		setIsPreviewReady(true);
	};

	const handleSlider = (valueBegin: number, valueEnd: number) => {
		if (videoRef.current) {
			videoRef.current.currentTime = valueBegin;
			setPauseTime(valueEnd);
			videoRef.current.play();
		}
	};

	const handleVolume = (values: string[]) => {
		videoRef.current.volume = Number(values[0]) / 100;
	};

	const handleMediaType = (mediaType: string, index: number) => {
		setMediaActiveIndex(index);
		index === 0 ? setAudioItagActiveIndex(0) : setVideoItagActiveIndex(0);
		setSendResult((prev: ISendResult) => ({
			...prev,
			mediaType: mediaType,
			itag:
				mediaType === "MP3"
					? audioItagList[0].itag
					: videoItagList[0].itag,
		}));
	};

	const handleItagList = (
		itagType: string,
		itagData: IItagInfo,
		index: number
	) => {
		itagType === "video"
			? setVideoItagActiveIndex(index)
			: setAudioItagActiveIndex(index);
		setSendResult((prev: ISendResult) => ({
			...prev,
			mediaType: itagType === "video" ? "MP4" : "MP3",
			itag: itagData.itag,
		}));
	};

	const download = async () => {
		videoRef.current.pause();
		setIsLoading(true);
		const downloadUrl: string =
			"http://127.0.0.1:5000/crawler/youtube/download";
		const result: IApiDownload = await axios.post(
			downloadUrl,
			{ ...sendResult, url: inputUrl },
			{ responseType: "blob" }
		);
		const url: string = window.URL.createObjectURL(
			new Blob([result.data], { type: result.headers["Content-Type"] as string })
		);
		const a: HTMLAnchorElement = document.createElement("a");
		a.href = url;
		a.download = decodeURIComponent(result.headers["x-suggested-filename"]);
		document.body.append(a);
		a.click();
		a.remove();
		window.URL.revokeObjectURL(url);
		setIsLoading(false);
	};

	const reset = () => {
		sliderRef.current.noUiSlider.reset();
		videoRef.current.pause();
		videoRef.current.currentTime = 0;
		setDuration(videoRef.current.duration);
	};

	useEffect(() => {
		if (sliderRef.current) {
			noUiSlider.create(sliderRef.current, {
				range: { min: 0, max: duration },
				start: [0, duration],
				tooltips: [true, true],
				format: {
					to: function (value: number) {
						return (
							String(Math.floor(value / 60)) +
							":" +
							String(Math.floor(value % 60)).padStart(2, "0")
						);
					},
					from: function (value: string) {
						return Number(value);
					},
				},
				pips: {
					mode: PipsMode.Values,
					values: [0, duration],
					format: {
						to: function (value: number) {
							return (
								String(Math.floor(value / 60)) +
								":" +
								String(Math.floor(value % 60)).padStart(2, "0")
							);
						},
						from: function (value: string) {
							return Number(value);
						},
					},
				},
				connect: true,
			});
			sliderRef.current.noUiSlider.on("change", (values: string[]) => {
				const valueBegin: number =
					Number(values[0].split(":")[0]) * 60 +
					Number(values[0].split(":")[1]);
				const valueEnd: number =
					Number(values[1].split(":")[0]) * 60 +
					Number(values[1].split(":")[1]);
				handleSlider(valueBegin, valueEnd);
				setSendResult((prev: ISendResult) => ({
					...prev,
					range: {
						start: valueBegin,
						end: valueEnd,
					},
				}));
			});
		}

		if (volumeRef.current) {
			noUiSlider.create(volumeRef.current, {
				range: { min: 0, max: 100 },
				start: 100,
				connect: "lower",
			});
			volumeRef.current.noUiSlider.on("update", (values: string[]) => {
				handleVolume(values);
			});
		}
	}, [isPreviewReady]);

	return (
		<>
			{isLoading && <Loading width={400} height={400} />}
			<div className="side-project-container">
				<h1>Youtube Downloader</h1>
				{!isPreview ? (
					<div className="yt-url">
						<div className="centered">
							<div className="group">
								<input
									type="text"
									id="url"
									value={inputUrl}
									onChange={handleText}
									required
								/>
								<label htmlFor="url">Youtube URL</label>
								<div className="bar"></div>
							</div>
							{inputUrl && (
								<div className="center">
									<button onClick={getYtVideo}>Start</button>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className="yt-preview">
						<video
							ref={videoRef}
							preload="auto"
							width={600}
							onTimeUpdate={() => {
								if (pauseTime !== 0) {
									if (
										videoRef.current &&
										videoRef.current.currentTime >=
											pauseTime
									) {
										videoRef.current.pause();
									}
								}
							}}
							onLoadedData={onReady}>
							<source type="video/mp4" src={videoPath} />
							<p>你的瀏覽器不支援 HTML 5 video tag</p>
						</video>
						<div className="volume" ref={volumeRef}></div>
						<div className="slider" ref={sliderRef}></div>
						<div className="center">
							{mediaTypes.map(
								(mediaType: string, index: number) => {
									return (
										<button
											key={index}
											className={`type-btn ${
												index === mediaActiveIndex
													? "type-btn-focus"
													: ""
											}`}
											onClick={() => {
												handleMediaType(
													mediaType,
													index
												);
											}}>
											{mediaType}
										</button>
									);
								}
							)}
						</div>
						<div className="center">
							{videoItagList.length > 0 &&
								mediaActiveIndex === 1 &&
								videoItagList.map(
									(videoItag: IItagInfo, index: number) => {
										return (
											<button
												key={index}
												className={`type-btn ${
													index ===
													videoItagActiveIndex
														? "type-btn-focus"
														: ""
												}`}
												onClick={() => {
													handleItagList(
														"video",
														videoItag,
														index
													);
												}}>
												{videoItag.resolution}
											</button>
										);
									}
								)}
							{audioItagList.length > 0 &&
								mediaActiveIndex === 0 &&
								audioItagList.map(
									(audioItag: IItagInfo, index: number) => {
										return (
											<button
												key={index}
												className={`type-btn ${
													index ===
													audioItagActiveIndex
														? "type-btn-focus"
														: ""
												}`}
												onClick={() => {
													handleItagList(
														"audio",
														audioItag,
														index
													);
												}}>
												{audioItag.resolution}
											</button>
										);
									}
								)}
						</div>
						<div className="center">
							<button className="action-btn" onClick={download}>
								DOWNLOAD
							</button>
							<button className="action-btn" onClick={reset}>
								RESET
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default youtubePage;
