import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-cpu';

import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import { drawHand } from './drawHand';

const fps = 24;

const detectHand = async (webcamRef, canvasRef) => {
	await tf.ready();
	const model = await handpose.load();
	console.log('tf and model ready.');

	const detect = async () => {
		if (
			typeof webcamRef.current !== 'undefined' &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			// Get Video Properties
			const video = webcamRef.current.video;
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			// Set video width
			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;

			// Set canvas height and width
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			// Make Detections
			const hand = await model.estimateHands(video);
			console.log(hand);
			// Log coords of keypoints
			// if (hand.length > 0) {
			// 	for (let i = 0; i < hand.length; i++) {
			// 		const keypoints = hand[i].landmarks;
			// 		console.log(keypoints);
			// 		Log hand keypoints.
			// 		for (let i = 0; i < keypoints.length; i++) {
			// 			const [x, y, z] = keypoints[i];
			// 			console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
			// 		}
			// 	}
			// }

			// Draw mesh
			const ctx = canvasRef.current.getContext('2d');
			drawHand(hand, ctx);
		}
	};
	setInterval(detect, 1000 / fps);
};

export default detectHand;
