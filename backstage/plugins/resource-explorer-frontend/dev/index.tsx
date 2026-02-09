import { createDevApp } from '@backstage/dev-utils';
import { resourceExplorerFrontendPlugin, ResourceExplorerFrontendPage } from '../src/plugin';

createDevApp()
  .registerPlugin(resourceExplorerFrontendPlugin)
  .addPage({
    element: <ResourceExplorerFrontendPage />,
    title: 'Root Page',
    path: '/resource-explorer-frontend',
  })
  .render();
