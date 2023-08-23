const { z } = require('zod');

const urlValidationSchema = z.object({
  urls: z.array(z.string().url()),
});

module.exports = urlValidationSchema;
