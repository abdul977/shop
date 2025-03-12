interface Window {
  fbq: (
    track: 'track' | 'init',
    eventName: string,
    parameters?: {
      currency?: string;
      value?: number;
      [key: string]: any;
    }
  ) => void;
}

declare function fbq(
  track: 'track' | 'init',
  eventName: string,
  parameters?: {
    currency?: string;
    value?: number;
    [key: string]: any;
  }
): void;
