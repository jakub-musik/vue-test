export type ModelDraw = {
  additionalNumbers?: string[];
  date?: string;
  gameAmount?: number;
  jackpot?: number;
  megaPlier?: string;
  numbers?: string[];
  // odds: ModelOdd[];
  powerPlay?: string;
  // seo: ModelSeo;
  shares?: string[];
  time?: string;
  video?: string;
};

export type VisibleErrors = {
  idents: string[];
  messages: string[];
  types?: string[];
};

export type ErrorHandling = {
  backendError?: string;
  visibleErrors: VisibleErrors;
  success: boolean;
};

export type DrawQueryResponse = ErrorHandling & {
  draw?: {
    draws?: ModelDraw[];
  };
};
