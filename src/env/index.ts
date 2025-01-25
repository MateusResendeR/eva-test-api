import 'dotenv/config';
import Joi from 'joi';

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'test', 'production').default('dev'),
  PORT: Joi.number().default(3333),
});

const _env = envSchema.validate(process.env);

if (_env.error) {
  console.error('Invalid environment variables', _env.error);
}