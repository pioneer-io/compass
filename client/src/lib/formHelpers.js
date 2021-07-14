// is the rollout value given within the valid parameters?
const invalidRolloutPercentage = (rollout) => {
	return rollout < 0 || rollout > 100;
};

// alert the client if invalid rollout was given
const alertInvalidRolloutPercentage = () => {
	alert(`Flag rollout percentage must be 0-100`);
};

const nameIsUnique = (newFlagTitle, existingFlags = []) => {
	newFlagTitle = newFlagTitle.toLowerCase();
	return existingFlags.every((flag) => flag.title.toLowerCase() !== newFlagTitle);
};

export { invalidRolloutPercentage, alertInvalidRolloutPercentage, nameIsUnique };
