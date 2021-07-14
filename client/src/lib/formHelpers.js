// is the rollout value given within the valid parameters?
const invalidRolloutPercentage = (rollout) => {
	return rollout < 0 || rollout > 100;
};

// alert the client if invalid rollout was given
const alertInvalidRolloutPercentage = () => {
	alert(`Flag rollout percentage must be 0-100`);
};

export { invalidRolloutPercentage, alertInvalidRolloutPercentage };
