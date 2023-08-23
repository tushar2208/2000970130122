const express = require('express');

const urlValidationSchema = require('../validations/urlValidation');
const request = require('../utils/request');

const numbersRouter = express.Router();

numbersRouter.get('/', async (req, res) => {
  const urls = [];

  if (!('url' in req.query))
    return res.status(400).json({ error: 'Invalid urls provided' });

  if (Array.isArray(req.query.url))
    req.query.url.forEach(url => urls.push(url));
  else urls.push(req.query.url);

  try {
    const { urls: validUrls } = await urlValidationSchema.parseAsync({ urls });
    const results = await Promise.all(validUrls.map(url => request(url)));

    const numberSet = new Set(
      results.reduce((acc, result) => [...acc, ...result.numbers], []),
    );

    return res.json({ numbers: [...numberSet].sort((a, b) => a - b) });
  } catch (err) {
    return res.status(400).json(err.errors);
  }
});

module.exports = numbersRouter;
