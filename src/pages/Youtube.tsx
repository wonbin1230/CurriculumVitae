import type { Dispatch, SetStateAction, RefObject, MutableRefObject } from "react";
import type { IYTList, IYTItem, ITargetElement, IItagInfo, ISendResult, IWsPreviewVideo, IWsDownload } from "../model/youtubeModel";

import React, { useState, useRef, useEffect } from "react";
import Loading from "../components/Loading";
import noUiSlider, { PipsMode } from "nouislider";
import "nouislider/dist/nouislider.css";
import { socket } from "../services/socketService";

const Youtube = () => {
    const [inputKeyWord, setInputKeyWord]: [string, Dispatch<string>] = useState<string>("");
	const [inputUrl, setInputUrl]: [string, Dispatch<string>] = useState<string>("");
    const [ytItems, setYtItems]: [IYTItem[], Dispatch<IYTItem[]>] = useState<IYTItem[]>([]);
    const [currentYtItems, setCurrentYtItems]: [IYTItem[], Dispatch<IYTItem[]>] = useState<IYTItem[]>([]);
    const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState<number>(1);
	const [loadingText, setLoadingText]: [string, Dispatch<string>] = useState<string>("");
	const [isLoading, setIsLoading]: [boolean, Dispatch<boolean>] = useState<boolean>(false);
	const [videoPath, setVideoPath]: [string, Dispatch<string>] = useState<string>("");
	const [videoItagList, setVideoItagList]: [IItagInfo[], Dispatch<IItagInfo[]>] = useState<IItagInfo[]>([]);
	const [audioItagList, setAudioItagList]: [IItagInfo[], Dispatch<IItagInfo[]>] = useState<IItagInfo[]>([]);
	const [isSearchList, setIsSearchList]: [boolean, Dispatch<boolean>] = useState<boolean>(false);
	const [isPreview, setIsPreview]: [boolean, Dispatch<boolean>] = useState<boolean>(false);
	const [sliderMax, setSliderMax]: [number, Dispatch<number>] = useState<number>(1);
	const [pauseTime, setPauseTime]: [number, Dispatch<number>] = useState<number>(0);
	const [mediaActiveIndex, setMediaActiveIndex]: [number, Dispatch<number>] = useState<number>(0);
	const [videoItagActiveIndex, setVideoItagActiveIndex]: [number, Dispatch<number>] = useState<number>(0);
	const [audioItagActiveIndex, setAudioItagActiveIndex]: [number, Dispatch<number>] = useState<number>(0);
	const [sendResult, setSendResult]: [ISendResult, Dispatch<SetStateAction<ISendResult>>] = useState<ISendResult>();

	const videoRef: MutableRefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
	const sliderRef: RefObject<ITargetElement> = useRef(null);
	const volumeRef: RefObject<ITargetElement> = useRef(null);

	const mediaTypes: string[] = ["MP3", "MP4"];
    let itemsPerPage: number;
    if (window.innerWidth > 768) {
        itemsPerPage = 8;
    }
    else if (window.innerWidth > 430 && window.innerWidth <= 768) {
        itemsPerPage = 6;
    }
    else {
        itemsPerPage = 2;
    }
    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;

	const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputKeyWord(event.target.value);
	};

    const getYTList = () => {
        socket.off("status");
        socket.off("res_searchKeyWord");

        setIsLoading(true);
        socket.emit("req_searchKeyWord", inputKeyWord);
        socket.on("status", (mesaage: string) => {
			setLoadingText(mesaage);
		});
        socket.on("res_searchKeyWord", (result: IYTList) => {
            const onlyVideos: IYTItem[] = result.items.filter((item: IYTItem) => item.type === "video");
            setYtItems(onlyVideos);
            setCurrentPage(1);
            setCurrentYtItems(onlyVideos.slice(startIndex, endIndex));
            setIsSearchList(true);
            setIsLoading(false);
        });
    };

	const getYtVideo = (url: string) => {
		socket.off("status");
		socket.off("chunk");
		socket.off("res_genPreview");

		setIsLoading(true);
		socket.emit("req_genPreview", url);
		socket.on("status", (mesaage: string) => {
			setLoadingText(mesaage);
		});
		const receivedChunks: BlobPart[] = [];
		socket.on("chunk", (chunk: BlobPart) => {
			receivedChunks.push(chunk);
		});
		socket.on("res_genPreview", (result: IWsPreviewVideo) => {
			if (Object.keys(result).length !== 3) {
				setIsLoading(false);
				alert("Can not find viedo from youtube");
				return false;
			}
			const url: string = URL.createObjectURL(new Blob(receivedChunks, { type: "video/mp4" }));
			setVideoPath(url);
			setSliderMax(Number(result.lengthSeconds));
			setSendResult({
				range: {
					start: 0,
					end: Number(result.lengthSeconds),
				},
				mediaType: result.audioItagList.length > 0 ? "MP3" : "MP4",
				itag: result.audioItagList.length > 0 ? result.audioItagList[0].itag : result.videoItagList[0].itag,
			});
			setVideoItagList(result.videoItagList);
			setAudioItagList(result.audioItagList);
			setIsPreview(true);
			setIsLoading(false);
		});
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
			itag: mediaType === "MP3" ? audioItagList[0].itag : videoItagList[0].itag,
		}));
	};

	const handleItagList = (itagType: string, itagData: IItagInfo, index: number) => {
		itagType === "video" ? setVideoItagActiveIndex(index) : setAudioItagActiveIndex(index);
		setSendResult((prev: ISendResult) => ({
			...prev,
			mediaType: itagType === "video" ? "MP4" : "MP3",
			itag: itagData.itag,
		}));
	};

	const handleOnReady = () => {
		const mobileDevice: string[] = ["Android", "webOS", "iPhone", "iPad", "iPod", "BlackBerry", "Windows Phone"];
		const isMobileDevice: boolean = mobileDevice.some((userAgent: string) => navigator.userAgent.match(userAgent));
		if (!isMobileDevice) {
			videoRef.current.pause();
		}
		if (isMobileDevice) {
			volumeRef.current.style.display = "none";
		}
	};

	const download = () => {
		socket.off("status");
		socket.off("chunk");
		socket.off("res_download");

		videoRef.current.pause();
		setIsLoading(true);
		socket.emit("req_download", { ...sendResult, url: inputUrl });
		socket.on("status", (mesaage: string) => {
			setLoadingText(mesaage);
		});
		const receivedChunks: BlobPart[] = [];
		socket.on("chunk", (chunk: BlobPart) => {
			receivedChunks.push(chunk);
		});
		socket.on("res_download", (result: IWsDownload) => {
			const url: string = window.URL.createObjectURL(
				new Blob(receivedChunks, {
					type: result.mediaType === "MP4" ? "video/mp4" : "audio/mp3",
				})
			);
			const a: HTMLAnchorElement = document.createElement("a");
			a.href = url;
			a.download = decodeURIComponent(`${result.titleName}.${result.mediaType.toLowerCase()}`);
			document.body.append(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
			setIsLoading(false);
		});
	};

	const reset = () => {
		sliderRef.current.noUiSlider.reset();
		videoRef.current.pause();
		videoRef.current.currentTime = 0;
	};

    useEffect(() => {
        setCurrentYtItems(ytItems.slice(startIndex, endIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

	useEffect(() => {
		if (sliderRef.current) {
			noUiSlider.create(sliderRef.current, {
				range: { min: 0, max: sliderMax },
				start: [0, sliderMax],
				tooltips: [true, true],
				format: {
					to: function (value: number) {
						return String(Math.floor(value / 60)) + ":" + String(Math.floor(value % 60)).padStart(2, "0");
					},
					from: function (value: string) {
						return Number(value);
					},
				},
				pips: {
					mode: PipsMode.Values,
					values: [0, sliderMax],
					format: {
						to: function (value: number) {
							return String(Math.floor(value / 60)) + ":" + String(Math.floor(value % 60)).padStart(2, "0");
						},
						from: function (value: string) {
							return Number(value);
						},
					},
				},
				connect: true,
			});
			sliderRef.current.noUiSlider.on("change", (values: string[]) => {
				const valueBegin: number = Number(values[0].split(":")[0]) * 60 + Number(values[0].split(":")[1]);
				const valueEnd: number = Number(values[1].split(":")[0]) * 60 + Number(values[1].split(":")[1]);
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
	}, [sliderMax]);

	return (
		<>
			{isLoading && <Loading width={400} height={400} text={loadingText} />}
			<div className="side-project-container">
				<h1>Youtube Downloader</h1>
				{!isSearchList && !isPreview && (
					<div className="yt-search">
						<div className="centered">
							<div className="group">
								<input type="text" id="search" value={inputKeyWord} onChange={handleText} required />
								<label htmlFor="search">
									請輸入關鍵字<i className="fa-solid fa-magnifying-glass"></i>
								</label>
								<div className="bar"></div>
							</div>
							{inputKeyWord && (
								<div className="center">
									<button onClick={getYTList}>Search</button>
								</div>
							)}
						</div>
					</div>
				)}
				{isSearchList && !isPreview && (
                    <div className="yt-search-result">
                        <div className="yt-action">
                            <div className="yt-search">
                                <div className="group">
                                    <input type="text" id="search" value={inputKeyWord} onChange={handleText} required />
                                    <div className="bar"></div>
                                </div>
                                {inputKeyWord && (
                                    <button onClick={getYTList}>Search</button>
                                )}
                            </div>
                            <div className="center">
                                <div>
                                    <button onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}>上一頁</button>
                                    <button onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, Math.ceil(ytItems.length / itemsPerPage)))}>下一頁</button>
                                </div>
                                <span>第 {currentPage} 頁 / 共 {Math.ceil(ytItems.length / itemsPerPage)} 頁</span>
                            </div>
                        </div>
                        <div className="yt-list">
                            {currentYtItems.map((item: IYTItem, index: number) => {
                                return (
                                    <div key={index}
                                        className="yt-item"
                                        onClick={() => {
                                            setInputUrl(item.url);
                                            getYtVideo(item.url);
                                        }}
                                    >
                                        <img src={item.bestThumbnail.url} alt={item.title} title={item.title} />
                                        <div className="yt-title" title={item.title}>{item.title}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
				)}
				{isSearchList && isPreview && (
					<div className="yt-preview">
						<video
							ref={videoRef}
							preload="none"
							width={600}
							onTimeUpdate={() => {
								if (pauseTime !== 0) {
									if (videoRef.current && videoRef.current.currentTime >= pauseTime) {
										videoRef.current.pause();
									}
								}
							}}
							onLoadedMetadata={handleOnReady}
							controls
							autoPlay
							playsInline>
							<source type="video/mp4" src={videoPath} />
							<p>你的瀏覽器不支援 HTML 5 video tag</p>
						</video>
						<div className="volume" ref={volumeRef}></div>
						<div className="slider" ref={sliderRef}></div>
						<div className="center">
							{mediaTypes.map((mediaType: string, index: number) => {
								return (
									<button
										key={index}
										className={`type-btn ${index === mediaActiveIndex ? "type-btn-focus" : ""}`}
										onClick={() => {
											handleMediaType(mediaType, index);
										}}>
										{mediaType}
									</button>
								);
							})}
						</div>
						<div className="center">
							{videoItagList.length > 0 &&
								mediaActiveIndex === 1 &&
								videoItagList.map((videoItag: IItagInfo, index: number) => {
									return (
										<button
											key={index}
											className={`type-btn ${index === videoItagActiveIndex ? "type-btn-focus" : ""}`}
											onClick={() => {
												handleItagList("video", videoItag, index);
											}}>
											{videoItag.resolution}
										</button>
									);
								})}
							{audioItagList.length > 0 &&
								mediaActiveIndex === 0 &&
								audioItagList.map((audioItag: IItagInfo, index: number) => {
									return (
										<button
											key={index}
											className={`type-btn ${index === audioItagActiveIndex ? "type-btn-focus" : ""}`}
											onClick={() => {
												handleItagList("audio", audioItag, index);
											}}>
											{audioItag.resolution}
										</button>
									);
								})}
						</div>
						<div className="center">
							<button className="action-btn" onClick={download}>
								下載{mediaActiveIndex === 0 ? "音檔" : "影片"}
							</button>
							<button className="action-btn" onClick={reset}>
								重置預覽剪輯
							</button>
						</div>
						<div className="center">
							<button
								className="action-btn"
								onClick={() => {
									setIsPreview(false);
								}}>
								重新選擇影片
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Youtube;
