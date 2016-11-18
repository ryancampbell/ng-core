import { BizConfig } from './src/biz/config';
import { BizClient } from './src/biz/client';

export function client(config?: BizConfig): BizClient {
  return new BizClient(config);
}
