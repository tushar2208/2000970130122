const express = require('express');

const numbersRouter = require('./routes/numbers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// @route   GET /v1/health
// @desc    Health route
// @access  Public
app.get('/', (_req, res) =>
  res.json({
    status: 'Server is working fine',
  }),
);

app.use('/numbers', numbersRouter);

const port = process.env.PORT || 8008;

app.listen(port, () => {
  console.log(`Listening on: http://localhost:${port}`);
});
