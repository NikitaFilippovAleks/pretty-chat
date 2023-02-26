const propertyGroups = require('stylelint-config-recess-order/groups')

module.exports = {
	extends: ['stylelint-order', 'stylelint-config-recess-order'],
  rules: {
		'order/properties-order': propertyGroups.map((group) => ({
			...group,
			emptyLineBefore: 'always',
			noEmptyLineBetween: true,
		}))
	}
};
