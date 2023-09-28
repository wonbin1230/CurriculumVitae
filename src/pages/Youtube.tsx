import React, { useState } from "react";
import axios from "axios";

export default () => {
	const [inputUrl, setInputUrl] = useState("");
    const handleChenge = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputUrl(event.target.value);
    };
	const getYtVedio = () => {
        console.log(inputUrl);
    };
	return (
		<>
			<div className="side-project-container">
				<div className="title">
					<h1>Youtube Downloader</h1>
					<div className="yt-url">
						<div className="centered">
							<div className="group">
								<input
									type="text"
									id="url"
									value={inputUrl}
                                    onChange={handleChenge}
									required
								/>
								<label htmlFor="url">Youtube URL</label>
								<div className="bar"></div>
							</div>
							<div className="center">
								<button onClick={getYtVedio}>Start</button>
							</div>
						</div>
					</div>
				</div>
				{/* <video src="https://www.youtube.com/watch?v=jYEp86vn9EM&ab_channel=DanMusic" controls></video> */}
			</div>
		</>
	);
};
