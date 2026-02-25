# CCD Resource Explorer Backend Plugin

Welcome to the CCD Resource Explorer backend plugin for Backstage! This plugin provides API endpoints for managing cloud resources across AWS, GCP, and Azure.

## Features

- **Multi-Cloud Support**: Manage resources across AWS (EC2, RDS), GCP (Compute Engine), and Azure (VMs)
- **Instance Management**: List, start, stop, and reboot cloud instances
- **Configurable API Endpoints**: Connect to your own cloud management APIs
- **Secure Authentication**: Token-based authentication for API access
- **Type-Safe**: Built with TypeScript for better developer experience

## Getting Started

### Installation

This plugin is part of your Backstage monorepo. If you're setting up a new Backstage instance:

```bash
# From your Backstage root directory
yarn --cwd packages/backend add @internal/backstage-plugin-resource-explorer-backend
```

### Configuration

**⚠️ Important**: Before using this plugin, you must configure your API endpoints.

1. **Copy the environment template**:
   ```bash
   cp plugins/resource-explorer-backend/env.template .env
   ```

2. **Fill in your API details** in the `.env` file with your actual API endpoints and tokens.

3. **Add configuration to app-config.yaml**:
   ```yaml
   ccdResourceExplorer:
     aws:
       ec2:
         url: ${CCD_AWS_EC2_URL}
         actionUrl: ${CCD_AWS_EC2_ACTION_URL}
         token: ${CCD_AWS_EC2_TOKEN}
         timeout: 30000
       rds:
         url: ${CCD_AWS_RDS_URL}
         actionUrl: ${CCD_AWS_RDS_ACTION_URL}
         token: ${CCD_AWS_RDS_TOKEN}
         timeout: 30000
     gcp:
       compute:
         url: ${CCD_GCP_COMPUTE_URL}
         actionUrl: ${CCD_GCP_COMPUTE_ACTION_URL}
         token: ${CCD_GCP_COMPUTE_TOKEN}
         timeout: 30000
       projects:
         url: ${CCD_GCP_PROJECTS_URL}
         token: ${CCD_GCP_PROJECTS_TOKEN}
         timeout: 30000
     azure:
       vm:
         url: ${CCD_AZURE_VM_URL}
         actionUrl: ${CCD_AZURE_VM_ACTION_URL}
         token: ${CCD_AZURE_VM_TOKEN}
         timeout: 30000
   ```

4. **See [CONFIG.md](./CONFIG.md) for detailed configuration documentation**.

### Backend Integration

Add the plugin to your backend in `packages/backend/src/index.ts`:

```typescript
// Add this import
import { ccdResourceExplorerPlugin } from '@internal/backstage-plugin-resource-explorer-backend';

// Add to your backend
backend.add(ccdResourceExplorerPlugin);
```

## API Endpoints

Once configured, the plugin exposes the following REST API endpoints:

### Health Check
```
GET /api/ccd-resource-explorer/health
```
Returns the health status of the plugin.

### List Resources
```
POST /api/ccd-resource-explorer/resources
```
Lists cloud resources based on provider, service, account, and region.

**Request Body**:
```json
{
  "provider": "AWS",
  "service": "EC2",
  "account": "cs-account-123",
  "region": "eu-north-1"
}
```

### EC2 Instance Actions
```
POST /api/ccd-resource-explorer/ec2-action
```
Performs actions (start/stop/reboot) on EC2 instances.

**Request Body**:
```json
{
  "provider": "AWS",
  "service": "EC2",
  "account": "cs-account-123",
  "region": "us-east-1",
  "instance_id": "i-1234567890abcdef0",
  "action": "start",
  "userId": "user@example.com"
}
```

### RDS Instance Actions
```
POST /api/ccd-resource-explorer/rds-action
```
Performs actions on RDS instances.

### GCP Compute Actions
```
POST /api/ccd-resource-explorer/gcp-action
```
Performs actions on GCP Compute Engine instances.

## Development

### Running in Development

```bash
# From the backend directory
yarn start
```

The plugin will use the configuration from your `app-config.yaml` and local environment variables.

### Testing

```bash
# Run unit tests
yarn test

# Run tests in watch mode
yarn test --watch
```

### Building

```bash
yarn build
```

## Architecture

```
┌─────────────────────┐
│  Frontend Plugin    │
│  (User Interface)   │
└──────────┬──────────┘
           │
           │ HTTP Requests
           ▼
┌─────────────────────┐
│  Backend Plugin     │
│  (This Plugin)      │
└──────────┬──────────┘
           │
           │ Configured APIs
           ▼
┌─────────────────────┐
│  External Cloud     │
│  Management APIs    │
│  (AWS, GCP, Azure)  │
└─────────────────────┘
```

The backend plugin:
1. Receives requests from the frontend
2. Validates input and authenticates users
3. Forwards requests to configured cloud management APIs
4. Normalizes responses and returns data to the frontend

## Security Considerations

- **Never commit tokens**: Always use environment variables for sensitive data
- **Use HTTPS in production**: Ensure all API endpoints use HTTPS
- **Rotate tokens regularly**: Update authentication tokens on a schedule
- **Validate input**: All user input is validated before processing
- **Audit logs**: Monitor backend logs for security events

## Configuration Reference

For detailed configuration options, see [CONFIG.md](./CONFIG.md).

**Required Configuration**:
- AWS EC2: `url`, `actionUrl`, `token`
- AWS RDS: `url`, `actionUrl`, `token`
- GCP Compute: `url`, `actionUrl`, `token`
- GCP Projects: `url`, `token`

**Optional Configuration**:
- Azure VM: `url`, `actionUrl`, `token` (if using Azure)
- Timeout values for all services

## Troubleshooting

### Plugin fails to start

**Error**: `CCD Resource Explorer plugin configuration is missing`

Make sure you have:
1. Added the `ccdResourceExplorer` section to `app-config.yaml`
2. Set all required environment variables
3. Verified the configuration syntax is correct

### API requests timeout

- Increase the `timeout` value in configuration
- Check network connectivity to your API endpoints
- Verify API endpoints are responsive

### Authentication errors

- Verify API tokens are correct and not expired
- Check that tokens have the necessary permissions
- Review API endpoint logs for authentication failures

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository** and create a feature branch
2. **Write tests** for new functionality
3. **Update documentation** for any configuration changes
4. **Follow coding standards** (TypeScript, ESLint)
5. **Test thoroughly** before submitting a pull request

### Development Workflow

```bash
# Make changes to the code
# ...

# Run tests
yarn test

# Build the plugin
yarn build

# Test in a local Backstage instance
yarn start
```

## Support

For issues, questions, or feature requests:
- Review the [CONFIG.md](./CONFIG.md) documentation
- Check existing GitHub issues
- Create a new issue with detailed information

## License

Copyright © 2024. All rights reserved.

---

**Note**: This plugin requires external cloud management APIs to be configured. The plugin itself does not directly interact with cloud providers; it acts as a proxy to your configured API endpoints.
