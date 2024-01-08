import { handlers as kubernetesHandlers } from './kubernetes';
import { handlers as networksHandlers } from './networks';
import { handlers as regionHandlers } from './regions';

export const handlers = [
  ...regionHandlers,
  ...networksHandlers,
  ...kubernetesHandlers,
];
