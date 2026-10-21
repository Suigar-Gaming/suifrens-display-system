import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
if (!/^\d+\.\d+\.\d+$/.test(manifest.version)) {
	throw new Error('Release version must be stable semver.');
}
const pending = (await readdir(resolve(root, '.changeset'))).filter(
	(name) => name.endsWith('.md') && name !== 'README.md',
);
assert.equal(pending.length, 0, 'Run pnpm release:version before packaging pending changesets.');
const changelog = await readFile(resolve(root, 'CHANGELOG.md'), 'utf8');
const sections = [...changelog.matchAll(/^## (\d+\.\d+\.\d+)\s*$/gm)];
assert.equal(
	sections[0]?.[1],
	manifest.version,
	'The latest changelog version must match package.json.',
);
const body = changelog.slice(sections[0].index + sections[0][0].length, sections[1]?.index).trim();
assert.ok(body.length > 0, 'Release notes must not be empty.');
const notes = `## ${manifest.version}\n\n${body}\n`;
const output = resolve(root, 'artifacts');
const staging = await mkdtemp(resolve(tmpdir(), 'suifrens-release-'));
try {
	for (const entry of Object.values(manifest.exports)) {
		for (const path of [entry.import, entry.types]) {
			await readFile(resolve(root, path));
		}
	}
	const release = Object.fromEntries(
		[
			'name',
			'private',
			'version',
			'description',
			'license',
			'repository',
			'type',
			'sideEffects',
			'main',
			'module',
			'types',
			'exports',
			'peerDependencies',
		]
			.filter((key) => key in manifest)
			.map((key) => [key, manifest[key]]),
	);
	release.files = ['dist', 'BUILD_INFO.json', 'CHANGELOG.md'];
	await cp(resolve(root, 'dist'), resolve(staging, 'dist'), { recursive: true });
	await cp(resolve(root, 'README.md'), resolve(staging, 'README.md'));
	await cp(resolve(root, 'CHANGELOG.md'), resolve(staging, 'CHANGELOG.md'));
	for (const name of ['LICENSE', 'LICENSE.md', 'LICENSE.txt']) {
		try {
			await cp(resolve(root, name), resolve(staging, name));
		} catch (error) {
			if (error.code !== 'ENOENT') {
				throw error;
			}
		}
	}
	const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
	const dirty =
		execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim() !== '';
	await writeFile(
		resolve(staging, 'BUILD_INFO.json'),
		JSON.stringify({ name: release.name, version: release.version, commit, dirty }, null, 2) + '\n',
	);
	await writeFile(resolve(staging, 'package.json'), JSON.stringify(release, null, 2) + '\n');
	await mkdir(output, { recursive: true });
	await writeFile(resolve(output, 'RELEASE_NOTES.md'), notes);
	const packed = JSON.parse(
		execFileSync('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', output], {
			cwd: staging,
			encoding: 'utf8',
		}),
	)[0];
	const digest = createHash('sha256')
		.update(await readFile(resolve(output, packed.filename)))
		.digest('hex');
	await writeFile(resolve(output, packed.filename + '.sha256'), `${digest}  ${packed.filename}\n`);
	console.log(JSON.stringify({ file: packed.filename, sha256: digest, commit, dirty }, null, 2));
} finally {
	await rm(staging, { recursive: true, force: true });
}
