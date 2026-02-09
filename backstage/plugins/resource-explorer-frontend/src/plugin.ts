import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const resourceExplorerFrontendPlugin = createPlugin({
  id: 'resource-explorer-frontend',
  routes: {
    root: rootRouteRef,
  },
});

export const ResourceExplorerFrontendPage = resourceExplorerFrontendPlugin.provide(
  createRoutableExtension({
    name: 'ResourceExplorerFrontendPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
