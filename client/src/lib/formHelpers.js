// is the rollout value given within the valid parameters?
const invalidRolloutPercentage = (rollout) => {
	return rollout === '' ||
				 	isNaN(rollout) ||
				 	Number(rollout) < 0 ||
					Number(rollout) > 100;
};

// alert the client if invalid rollout was given
const alertInvalidRolloutPercentage = () => {
	alert(`Flag rollout percentage must be 0-100`);
};

const alertEmptyTitle = () => {
	alert('You must have a flag title');
};

const alertRedundantTitle = (flagTitle) => {
	alert(`The flag name ${flagTitle} has already been used. Please choose another.`);
};

// check if name is unique among array of flags
const nameIsUnique = (newFlagTitle, existingFlags = []) => {
	newFlagTitle = newFlagTitle.toLowerCase();
	return existingFlags.every((flag) => flag.title.toLowerCase() !== newFlagTitle);
};

export { invalidRolloutPercentage, alertInvalidRolloutPercentage, nameIsUnique, alertEmptyTitle, alertRedundantTitle };
