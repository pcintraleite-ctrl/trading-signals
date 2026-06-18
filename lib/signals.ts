export type Signal = {
  symbol: string;
  type: "COMPRA" | "VENDA" | "MANTER";
  confidence: number; // 0-100
  price: number;
  reason: string;
  timestamp: string;
};

const ASSETS = [
  { symbol: "PETR4", basePrice: 38.5 },
  { symbol: "VALE3", basePrice: 61.2 },
  { symbol: "ITUB4", basePrice: 33.8 },
  { symbol: "BTC", basePrice: 412000 },
  { symbol: "ETH", basePrice: 14800 },
  { symbol: "AAPL", basePrice: 195 },
  { symbol: "TSLA", basePrice: 248 },
];

const REASONS = {
  COMPRA: [
    "Rompimento de resistência com volume acima da média",
    "Cruzamento de médias móveis (golden cross) detectado",
    "RSI saindo de zona de sobrevenda",
    "Fluxo de notícias positivo no setor",
  ],
  VENDA: [
    "Perda de suporte importante no gráfico",
    "RSI em zona de sobrecompra",
    "Cruzamento de médias móveis (death cross) detectado",
    "Volume de venda acima da média nas últimas horas",
  ],
  MANTER: [
    "Mercado em consolidação, sem sinal claro",
    "Indicadores técnicos mistos",
    "Aguardando confirmação de tendência",
  ],
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Gera uma lista de sinais SIMULADOS. Isso não é uma IA real prevendo o
 * mercado — é uma simulação com números aleatórios para fins de demonstração
 * e estudo. Nunca deve ser usado como recomendação financeira real.
 */
export function generateMockSignals(count = 6): Signal[] {
  const shuffled = [...ASSETS].sort(() => Math.random() - 0.5).slice(0, count);

  return shuffled.map((asset) => {
    const type = pickRandom<Signal["type"]>(["COMPRA", "VENDA", "MANTER"]);
    const variation = randomBetween(-0.03, 0.03);
    const price = asset.basePrice * (1 + variation);

    return {
      symbol: asset.symbol,
      type,
      confidence: Math.round(randomBetween(55, 95)),
      price: Number(price.toFixed(2)),
      reason: pickRandom(REASONS[type]),
      timestamp: new Date().toISOString(),
    };
  });
}
