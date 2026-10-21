import Fastify from 'fastify';
import cors from '@fastify/cors';
import compress from '@fastify/compress';

import { suifrens } from './routes/suifrens.js';
import { accessories } from './routes/accessories.js';

export function buildServer(options: import('fastify').FastifyServerOptions = {}) {
	const fastify = Fastify({
		...options,
		logger: options.logger ?? {
			transport: {
				target: 'pino-pretty',
				options: {
					translateTime: 'HH:MM:ss Z',
					ignore: 'pid,hostname',
				},
			},
		},
	});

	// Register plugins:
	fastify.register(compress);
	fastify.register(cors);

	// Register routes:
	fastify.register(suifrens);
	fastify.register(accessories);

	// Health check:
	fastify.get('/', async (_request, _reply) => {
		return { ok: true };
	});

	return fastify;
}
