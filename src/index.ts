import 'reflect-metadata';

import { QuickStartLoyalty } from './app/passkit/provider';

console.log(QuickStartLoyalty);
const provider = new QuickStartLoyalty();

const run = async () => {
  const resp = await provider.createSilverMember();
  console.log(resp);
};

run();
