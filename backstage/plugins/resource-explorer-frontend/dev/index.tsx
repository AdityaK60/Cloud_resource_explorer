import { createDevApp } from '@backstage/dev-utils';
import { ccdResourceExplorerPlugin, CcdResourceExplorerPage } from '../src/plugin';

createDevApp()
  .registerPlugin(ccdResourceExplorerPlugin)
  .addPage({
    element: <CcdResourceExplorerPage />,
    title: 'Root Page',
    path: '/ccd-resource-explorer',
  })
  .render();
