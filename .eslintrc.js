module.exports = {
  'extends': ['airbnb', 'airbnb/hooks'],
  'env': {
    'browser': true,
    'node': true
  },
  rules: {
    'no-param-reassign': [0, {
      props: true,
      ignorePropertyModificationsFor: ['state']
    }],
    'react/jsx-props-no-spreading': [0, {
      'html': 'enforce',
      'custom': 'enforce',
      'explicitSpread': 'ignore',
    }]
  },
};
