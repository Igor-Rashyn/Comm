module.exports = {
  name: 'community',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/community',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
