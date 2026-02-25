import { getVoidLogger } from '@backstage/backend-common';
import { mockServices } from '@backstage/backend-test-utils';
import express from 'express';
import request from 'supertest';
import { createRouter } from './router';

describe('createRouter', () => {
  let app: express.Application;

  beforeAll(async () => {
    const logger = getVoidLogger();
    const config = mockServices.rootConfig();
    const httpAuth = mockServices.httpAuth();

    const router = await createRouter({
      logger,
      config,
      httpAuth,
    });

    app = express().use(router);
  });

  it('should return ok on health check', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('should return 400 on missing provider', async () => {
    const response = await request(app)
      .post('/resources')
      .send({
        service: 'EC2',
        region: 'us-east-1',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('should return 400 on missing service', async () => {
    const response = await request(app)
      .post('/resources')
      .send({
        provider: 'AWS',
        region: 'us-east-1',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });



  it('should return 400 on missing region', async () => {
    const response = await request(app)
      .post('/resources')
      .send({
        provider: 'AWS',
        service: 'EC2',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
