export type DelegateType = {
  address: string;
  blocks: {
    last: {
      id: string;
      height: number;
      timestamp: { epoch: number; human: string; unix: number };
    };
    produced: number;
  };
  forged: { fees: string; rewards: string; total: string };
  isResigned: false;
  production: { approval: number };
  publicKey: string;
  rank: number;
  username: string;
  votes: string;
};

export type InitialDelegateType = { delegates: DelegateType[] | null };
