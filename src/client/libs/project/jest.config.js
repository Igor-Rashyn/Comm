module.exports = {
  name: 'project',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/project',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
