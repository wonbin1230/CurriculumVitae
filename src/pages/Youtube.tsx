import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

interface IAxiosRes {
	data: string,
}

interface IVedioValues {
	duration: number,
	currentTime: number,
    play: (() => void),
}

export default () => {
	const [inputUrl, setInputUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [videoPath, setVideoPath] = useState("");
	const [isPreview, setIsPreview] = useState(false);
	const [duration, setDuration] = useState(1);
    const [pauseTime, setPauseTime] = useState(0);
    // const [slider, setSlider] = useState(null);

	const vRef = useRef(null);

	const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputUrl(event.target.value);
	};

	const getYtVedio = async () => {
		setIsLoading(true);
		const apiUrl = "http://127.0.0.1:5000/crawler/youtube/preview";
		const result: IAxiosRes = await axios.post(apiUrl, { url: inputUrl });
		setVideoPath(
			`http://127.0.0.1:5000/crawler/youtube/preview/${result.data}`
		);
		setIsPreview(true);
		setIsLoading(false);
	};

	const onReady = async () => {
		const folderName = videoPath.split("/preview/")[1];
		await axios.delete(
			`http://127.0.0.1:5000/crawler/youtube/video/${folderName}`
		);
		if (vRef.current) {
			const videoRef: IVedioValues = vRef.current;
			setDuration(videoRef.duration);
		}
	};

	const handleSlider = (values: string[]) => {
		if (vRef.current) {
            const videoRef: IVedioValues = vRef.current;
            const valueBegin = (Number(values[0].split(":")[0]) * 60) + Number(values[0].split(":")[1]);
            const valueEnd = (Number(values[1].split(":")[0]) * 60) + Number(values[1].split(":")[1]);
            videoRef.currentTime = valueBegin;
            setPauseTime(valueEnd);
            videoRef.play();
        }
	};

	const test = () => {
        // console.log(slider.noUiSlider.get(true));
	};

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
									<button onClick={getYtVedio}>Start</button>
								</div>
							)}
						</div>
					</div>
				) : (
					<div className="yt-preview">
						<video
							ref={vRef}
							preload="auto"
							width={600}
                            onTimeUpdate={() => {
                                if (pauseTime !== 0) {
                                    if (vRef.current && vRef.current.currentTime >= pauseTime) {
                                        vRef.current.pause();
                                    }
                                }
                            }}
							onLoadedData={onReady}>
							<source type="video/mp4" src={videoPath} />
							<p>你的瀏覽器不支援 HTML 5 video tag</p>
						</video>
						<div className="slider">
							<Nouislider
								// instanceRef={(instance) => {
                                //     if (instance && !slider) {
                                //         setSlider(instance);
                                //     }
                                // }}
								onChange={(values: string[]) => {
                                    handleSlider(values);
                                }}
								tooltips={[true, true]}
								range={{ min: 0, max: duration }}
								start={[0, duration]}
								format={{
									to: function (value) {
										return (
											Math.floor(value / 60) +
											":" +
											Math.floor(value % 60)
										);
									},
									from: function (value) {
										return Number(value);
									},
								}}
								connect
							/>
						</div>
						<div className="center">
							<button onClick={test}>Test</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
