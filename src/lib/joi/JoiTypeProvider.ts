import { FastifyPluginAsync } from 'fastify';
import  joi  from 'joi';

const JoiTypeProvider: FastifyPluginAsync = async (fastify, opts) => {
  const joiTypeProvider = {
    createSchema: (schema: any) => {
      return joi.object(schema);
    },
    validate: (data: any, schema: any) => {
      const compiledSchema = joi.compile(schema);
      return compiledSchema.validate(data);
    },
  };

  fastify.decorate('joiTypeProvider', joiTypeProvider);
};

export default JoiTypeProvider;