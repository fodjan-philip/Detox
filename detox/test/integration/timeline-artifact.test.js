const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const execCommand = async (cmd) => {
  const cp = exec(cmd);
  cp.stdout.pipe(process.stdout);
  cp.stderr.pipe(process.stderr);
  return new Promise((resolve) => {
    cp.on('close', resolve);
  });
}

describe('Timeline integration test', () => {
  const artifactsDirectory = 'integration_artifacts/'
  const timelineArtifactFilename = 'detox.trace.json';
  const timelineArtifactPath = path.join(artifactsDirectory, timelineArtifactFilename);
  const clearAllArtifacts = () => execCommand(`rm -fr ${artifactsDirectory}`);

  beforeEach(clearAllArtifacts);

  it('should deterministically produce a timeline artifact', async () => {
    await execCommand(`detox test -c stub -o integration/e2e/config.js -a ${artifactsDirectory} -w 2 --record-timeline all .`);
    const timelineArtifactContent = await readFile(timelineArtifactPath, 'utf8');
    expect(timelineArtifactContent).toMatchSnapshot();

    await clearAllArtifacts();
  });
});
