const fp = require('fingerpose');

const predictConfidence = 8.5;

const detectGesture = (hand) => {
	const GE = new fp.GestureEstimator([
		fp.Gestures.VictoryGesture,
		fp.Gestures.ThumbsUpGesture,
	]);
	if (hand.length > 0) {
		const estimatedGestures = GE.estimate(
			hand[0].landmarks,
			predictConfidence
		);
		if (estimatedGestures) return estimatedGestures.gestures[0];
		else return 'invalid pose';
	} else return hand;
};

export default detectGesture;
