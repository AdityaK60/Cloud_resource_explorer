import { createPlugin, createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'ccd-resource-explorer',
});

export const plugin = createPlugin({
  id: 'ccd-resource-explorer',
  routes: {
    root: rootRouteRef,
  },
});
