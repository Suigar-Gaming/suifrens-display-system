import assert from 'node:assert/strict';
import { test, mock } from 'node:test';
import { ObjectError } from '@mysten/sui/client';
import { buildServer } from '../src/api/app.js';
import { suiClient, getSuiFrenAccessories } from '../src/api/client/sui-client.js';
import { ACCESSORIES_KEY_TYPE, CAPY_TYPE } from '../src/api/lib/config.js';
import { accessories } from '../src/constants/accessories.js';

test('Fastify 5 serves health and SVGs, and completes missing-accessory responses', async () => {
	const app = buildServer({ logger: false });
	try {
		assert.deepEqual((await app.inject('/')).json(), { ok: true });
		const image = await app.inject('/accessories/soccer%20team%20shirt/svg');
		assert.equal(image.statusCode, 200);
		assert.match(image.headers['content-type']!, /image\/svg\+xml/);
		assert.match(image.body, /^<svg/);
		assert.equal((await app.inject('/accessories/missing/svg')).statusCode, 404);
		const cors = await app.inject({
			method: 'OPTIONS',
			url: '/',
			headers: { origin: 'https://example.com', 'access-control-request-method': 'GET' },
		});
		assert.equal(cors.statusCode, 204);
		assert.equal(cors.headers['access-control-allow-origin'], '*');
	} finally {
		await app.close();
	}
});

test('Sui gRPC reads JSON attributes and maps missing objects to 404', async () => {
	const app = buildServer({ logger: false });
	const get = mock.method(suiClient, 'getObject', async () => ({
		object: {
			type: `0x1::suifrens::SuiFren<${CAPY_TYPE}>`,
			json: { attributes: ['basic', '6FBBEE', 'E6FBFF', 'happy', 'ear1'] },
		},
	}));
	const fields = mock.method(suiClient, 'listDynamicFields', async () => ({
		dynamicFields: [],
		cursor: null,
		hasNextPage: false,
	}));
	try {
		const image = await app.inject('/suifrens/0x1/svg');
		assert.equal(image.statusCode, 200);
		assert.match(image.body, /^<svg/);
		get.mock.mockImplementation(async () => {
			throw new ObjectError('NOT_FOUND', 'missing', { reason: 'notFound' });
		});
		assert.equal((await app.inject('/suifrens/0x1/svg')).statusCode, 404);
		get.mock.mockImplementation(async () => {
			throw new Error('private upstream detail');
		});
		const failed = await app.inject('/suifrens/0x1/svg');
		assert.equal(failed.statusCode, 500);
		assert.doesNotMatch(failed.body, /private upstream detail/);
	} finally {
		get.mock.restore();
		fields.mock.restore();
		await app.close();
	}
});

test('gRPC accessory lookup follows pagination and dynamic-object names', async () => {
	const name = { type: ACCESSORIES_KEY_TYPE, bcs: new Uint8Array([1]) };
	const list = mock.method(
		suiClient,
		'listDynamicFields',
		async ({ cursor }: { cursor?: string | null }) =>
			cursor
				? { dynamicFields: [{ $kind: 'DynamicObject', name }], cursor: null, hasNextPage: false }
				: {
						dynamicFields: [{ name: { ...name, type: 'unrelated' } }],
						cursor: 'next',
						hasNextPage: true,
					},
	);
	const get = mock.method(suiClient, 'getDynamicObjectField', async () => ({
		object: { json: { name: accessories[0].name } },
	}));
	try {
		assert.deepEqual(await getSuiFrenAccessories('0x1'), [accessories[0]]);
		assert.equal(list.mock.callCount(), 2);
		assert.equal(get.mock.callCount(), 1);
		assert.deepEqual(get.mock.calls[0].arguments[0]!.name, name);
	} finally {
		list.mock.restore();
		get.mock.restore();
	}
});
