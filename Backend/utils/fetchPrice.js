const COIN_IDS = {
  btc: "bitcoin",
  bitcoin: "bitcoin",
  eth: "ethereum",
  ethereum: "ethereum",
};

export const getCryptoPrice = async (currency) => {
  const coinId = COIN_IDS[currency.toLowerCase()];
  if (!coinId) throw new Error(`Unsupported currency: ${currency}`);

  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
  );
  const data = await res.json();

  // if (!data[coinId] || !data[coinId].usd) {
  //   throw new Error("Price fetch failed");
  // }

  return data[coinId].usd;
};
