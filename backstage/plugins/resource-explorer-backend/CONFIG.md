# CCD Resource Explorer Plugin Configuration Guide

This guide explains how to configure the CCD Resource Explorer plugin for your Backstage instance.

## Overview

The CCD Resource Explorer plugin requires API endpoint configuration for cloud resource management. All configuration should be placed in your `app-config.yaml` file under the `ccdResourceExplorer` section.

## Configuration Structure

Add the following section to your `app-config.yaml`:

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

## Configuration Parameters

### AWS Configuration

#### EC2 Service
- **url** (required): API endpoint for listing EC2 instances
- **actionUrl** (required): API endpoint for EC2 instance actions (start/stop/reboot)
- **token** (required): Authentication token for AWS EC2 API
- **timeout** (optional): Request timeout in milliseconds (default: 30000)

#### RDS Service
- **url** (required): API endpoint for listing RDS instances
- **actionUrl** (required): API endpoint for RDS instance actions (start/stop/reboot)
- **token** (required): Authentication token for AWS RDS API
- **timeout** (optional): Request timeout in milliseconds (default: 30000)

### GCP Configuration

#### Compute Engine
- **url** (required): API endpoint for listing GCP Compute Engine instances
- **actionUrl** (required): API endpoint for GCP Compute instance actions
- **token** (required): Authentication token for GCP Compute API
- **timeout** (optional): Request timeout in milliseconds (default: 30000)

#### Projects
- **url** (required): API endpoint for listing GCP projects
- **token** (required): Authentication token for GCP Projects API
- **timeout** (optional): Request timeout in milliseconds (default: 30000)

### Azure Configuration

#### Virtual Machines
- **url** (optional): API endpoint for listing Azure VMs
- **actionUrl** (optional): API endpoint for Azure VM actions
- **token** (optional): Authentication token for Azure VM API
- **timeout** (optional): Request timeout in milliseconds (default: 30000)

## Using Environment Variables

It's recommended to use environment variables for sensitive configuration like API tokens and URLs. This keeps credentials out of your version control.

### Example .env file

Create a `.env` file in your Backstage root directory:

```bash
# AWS EC2 Configuration
CCD_AWS_EC2_URL=http://your-api-server:3000/aws-ec2/list-instance
CCD_AWS_EC2_ACTION_URL=http://your-api-server:3000/ec2/start-stop-reboot-instance
CCD_AWS_EC2_TOKEN=your-aws-ec2-api-token

# AWS RDS Configuration
CCD_AWS_RDS_URL=http://your-api-server:3000/aws-rds/list-instances
CCD_AWS_RDS_ACTION_URL=http://your-api-server:3000/aws-rds/start-stop-reboot-instance
CCD_AWS_RDS_TOKEN=your-aws-rds-api-token

# GCP Compute Configuration
CCD_GCP_COMPUTE_URL=http://your-api-server:4747/compute/vm_instances/list
CCD_GCP_COMPUTE_ACTION_URL=http://your-api-server:4747/compute/vm_instances/instance-action
CCD_GCP_COMPUTE_TOKEN=your-gcp-compute-api-token

# GCP Projects Configuration
CCD_GCP_PROJECTS_URL=http://your-api-server:4747/projects/list
CCD_GCP_PROJECTS_TOKEN=your-gcp-projects-api-token

# Azure VM Configuration (optional)
CCD_AZURE_VM_URL=http://your-api-server:5000/azure/vm/list
CCD_AZURE_VM_ACTION_URL=http://your-api-server:5000/azure/vm/action
CCD_AZURE_VM_TOKEN=your-azure-vm-api-token
```

### Production Deployment

For production deployments, use your platform's secret management system:

- **Kubernetes**: Use Kubernetes Secrets or external secret managers
- **Docker**: Pass environment variables through Docker Compose or Kubernetes manifests
- **Cloud Platforms**: Use platform-specific secret stores (AWS Secrets Manager, GCP Secret Manager, Azure Key Vault)

## Validation

When the plugin starts, it will validate that all required configuration is present. If any required field is missing, the plugin will fail to start with a descriptive error message.

### Required Fields

The following fields are **required** and must be configured for the plugin to work:

- `aws.ec2.url`
- `aws.ec2.actionUrl`
- `aws.ec2.token`
- `aws.rds.url`
- `aws.rds.actionUrl`
- `aws.rds.token`
- `gcp.compute.url`
- `gcp.compute.actionUrl`
- `gcp.compute.token`
- `gcp.projects.url`
- `gcp.projects.token`

### Optional Fields

Azure configuration is currently optional and can be left empty if not used.

## Example Configuration

Here's a complete example with actual values (use your own API endpoints):

```yaml
ccdResourceExplorer:
  aws:
    ec2:
      url: http://10.224.110.5:3000/aws-ec2/list-instance
      actionUrl: http://10.224.110.5:3000/ec2/start-stop-reboot-instance
      token: your-ec2-token-here
      timeout: 30000
    rds:
      url: http://10.224.110.5:3000/aws-rds/list-instances
      actionUrl: http://10.224.110.5:3000/aws-rds/start-stop-reboot-instance
      token: your-rds-token-here
      timeout: 30000
  gcp:
    compute:
      url: http://10.224.110.5:4747/compute/vm_instances/list
      actionUrl: http://10.224.110.5:4747/compute/vm_instances/instance-action
      token: your-gcp-compute-token-here
      timeout: 30000
    projects:
      url: http://10.224.110.5:4747/projects/list
      token: your-gcp-projects-token-here
      timeout: 30000
  azure:
    vm:
      url: ''
      actionUrl: ''
      token: ''
      timeout: 30000
```

## Troubleshooting

### Plugin fails to start with configuration error

**Error**: `CCD Resource Explorer plugin configuration is missing`

**Solution**: Ensure you have added the `ccdResourceExplorer` section to your `app-config.yaml` file.

---

**Error**: `Missing value at key: aws.ec2.url`

**Solution**: Make sure all required configuration fields are present and the corresponding environment variables are set.

### API requests fail

1. Verify the API endpoints are accessible from your Backstage backend
2. Check that the authentication tokens are valid
3. Ensure the timeout values are sufficient for your network conditions
4. Review backend logs for detailed error messages

## Security Best Practices

1. **Never commit tokens to version control**: Always use environment variables or secret management systems
2. **Rotate tokens regularly**: Update API tokens on a regular schedule
3. **Use HTTPS in production**: Ensure all API endpoints use HTTPS in production environments
4. **Principle of least privilege**: Grant API tokens only the minimum permissions required
5. **Monitor access logs**: Keep track of API usage and watch for suspicious activity

## Support

For issues or questions about configuration, please refer to the plugin README or contact the plugin maintainers.
