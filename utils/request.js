async function request(url) {
  const result = await fetch(url);
  return result.json();
}

module.exports = request;
