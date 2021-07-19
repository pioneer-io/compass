const SUBSCRIPTION_SUBJECTS = {
	ruleset : {
		fullSubject       : 'DATA.FullRuleSet',
		streamName        : 'DATA',
		subsetName        : 'FullRuleSet',
		subsetNameRequest : 'FullRuleSetRequest'
	},
	sdkKey  : {
		fullSubject       : 'KEY.sdkKey',
		streamName        : 'KEY',
		subsetName        : 'sdkKey',
		subsetNameRequest : 'sdkKeyRequest'
	}
};

module.exports.ruleset = SUBSCRIPTION_SUBJECTS.ruleset;
module.exports.sdkKey = SUBSCRIPTION_SUBJECTS.sdkKey;
