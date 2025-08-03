export interface Pokemon {
  id: number;
  name: string;
  rarity: number;
  pack_price: number;
  exchange_price: number;
  action?: string;
}

export interface Extension {
  id: number;
  name: string;
}
