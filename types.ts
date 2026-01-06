
export interface TextStats {
  characters: number;
  words: number;
  lines: number;
  readingTime: number;
  letterDensity: Array<{ char: string; count: number; percentage: number }>;
}

export interface AppConfig {
  excludeSpaces: boolean;
  setCharacterLimit: boolean;
  limitValue: number;
}
