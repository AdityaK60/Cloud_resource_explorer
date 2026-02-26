import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';

/**
 * CCD Resource Explorer backend plugin
 *
 * @public
 */
export const ccdResourceExplorerPlugin = createBackendPlugin({
  pluginId: 'ccd-resource-explorer',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        httpRouter: coreServices.httpRouter,
        httpAuth: coreServices.httpAuth,
      },
      async init({ logger, config, httpRouter, httpAuth }) {
        logger.info('Initializing CCD Resource Explorer backend plugin');

        // Set auth policies first, before mounting the router
        httpRouter.addAuthPolicy({
          path: '/health',
          allow: 'unauthenticated'
        });
        httpRouter.addAuthPolicy({
          path: '/resources',
          allow: 'unauthenticated'
        });
        httpRouter.addAuthPolicy({
          path: '/ec2-action',
          allow: 'unauthenticated'
        });
        httpRouter.addAuthPolicy({
          path: '/rds-action',
          allow: 'unauthenticated'
        });
        httpRouter.addAuthPolicy({
          path: '/gcp-action',
          allow: 'unauthenticated'
        });

        // Create and mount the router
        const router = await createRouter({
          logger,
          config,
          httpAuth,
        });

        httpRouter.use(router);

        logger.info('CCD Resource Explorer backend plugin initialized successfully');
      },
    });
  },
});