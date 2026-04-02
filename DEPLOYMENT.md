# Deploying to IBM Cloud Code Engine

This guide will help you deploy your IBM Cloud Dashboard to IBM Cloud Code Engine and get a public URL.

## Prerequisites

1. **IBM Cloud Account**: Sign up at [cloud.ibm.com](https://cloud.ibm.com)
2. **IBM Cloud CLI**: Install from [here](https://cloud.ibm.com/docs/cli?topic=cli-getting-started)

## Quick Deployment (Automated)

The easiest way to deploy is using the provided deployment script:

```bash
cd ibm-cloud-dashboard
./deploy.sh
```

This script will:
- Check for IBM Cloud CLI and Code Engine plugin
- Log you in to IBM Cloud (if needed)
- Create a Code Engine project
- Build and deploy your application
- Provide you with a public URL

## Manual Deployment

If you prefer to deploy manually, follow these steps:

### 1. Install IBM Cloud CLI

**macOS/Linux:**
```bash
curl -fsSL https://clis.cloud.ibm.com/install/linux | sh
```

**Windows:**
Download from [IBM Cloud CLI](https://cloud.ibm.com/docs/cli?topic=cli-getting-started)

### 2. Install Code Engine Plugin

```bash
ibmcloud plugin install code-engine
```

### 3. Log in to IBM Cloud

```bash
ibmcloud login --sso
```

Or with API key:
```bash
ibmcloud login --apikey YOUR_API_KEY
```

### 4. Target a Region

```bash
ibmcloud target -r us-south
```

Available regions: `us-south`, `us-east`, `eu-de`, `eu-gb`, `jp-tok`, `jp-osa`, `au-syd`, `ca-tor`, `br-sao`

### 5. Create a Code Engine Project

```bash
ibmcloud ce project create --name ibm-dashboard-project
ibmcloud ce project select --name ibm-dashboard-project
```

### 6. Deploy the Application

```bash
ibmcloud ce application create \
  --name ibm-cloud-dashboard \
  --build-source . \
  --strategy dockerfile \
  --port 8080 \
  --min-scale 1 \
  --max-scale 3 \
  --cpu 0.25 \
  --memory 0.5G \
  --build-timeout 900 \
  --wait
```

### 7. Get Your Public URL

```bash
ibmcloud ce application get --name ibm-cloud-dashboard
```

Look for the URL in the output. It will be something like:
`https://ibm-cloud-dashboard.xxxxx.us-south.codeengine.appdomain.cloud`

## Configuration Options

### Scaling

Adjust the scaling parameters:

```bash
ibmcloud ce application update \
  --name ibm-cloud-dashboard \
  --min-scale 0 \
  --max-scale 5
```

- `--min-scale 0`: Scale to zero when not in use (saves costs)
- `--max-scale 5`: Maximum number of instances

### Resources

Adjust CPU and memory:

```bash
ibmcloud ce application update \
  --name ibm-cloud-dashboard \
  --cpu 0.5 \
  --memory 1G
```

### Environment Variables

Add environment variables if needed:

```bash
ibmcloud ce application update \
  --name ibm-cloud-dashboard \
  --env KEY=VALUE
```

## Updating Your Application

After making changes to your code:

```bash
ibmcloud ce application update \
  --name ibm-cloud-dashboard \
  --build-source . \
  --wait
```

## Monitoring

### View Application Logs

```bash
ibmcloud ce application logs --name ibm-cloud-dashboard
```

### View Application Events

```bash
ibmcloud ce application events --name ibm-cloud-dashboard
```

### Check Application Status

```bash
ibmcloud ce application get --name ibm-cloud-dashboard
```

## Troubleshooting

### Build Fails

If the build fails, check the build logs:

```bash
ibmcloud ce buildrun logs --name ibm-cloud-dashboard
```

### Application Won't Start

1. Check the logs: `ibmcloud ce application logs --name ibm-cloud-dashboard`
2. Verify the port is set to 8080
3. Ensure the Dockerfile is correct

### Out of Memory

Increase memory allocation:

```bash
ibmcloud ce application update --name ibm-cloud-dashboard --memory 1G
```

## Cost Optimization

Code Engine pricing is based on:
- vCPU-seconds
- Memory GB-seconds
- HTTP requests

To minimize costs:
1. Set `--min-scale 0` to scale to zero when idle
2. Use appropriate CPU/memory sizes
3. Enable request timeout

## Deleting the Application

To remove the application:

```bash
ibmcloud ce application delete --name ibm-cloud-dashboard
```

To delete the entire project:

```bash
ibmcloud ce project delete --name ibm-dashboard-project
```

## Additional Resources

- [Code Engine Documentation](https://cloud.ibm.com/docs/codeengine)
- [Code Engine Pricing](https://cloud.ibm.com/docs/codeengine?topic=codeengine-pricing)
- [IBM Cloud CLI Reference](https://cloud.ibm.com/docs/cli?topic=cli-ibmcloud_cli)

## Support

For issues with deployment, check:
1. IBM Cloud Status: [cloud.ibm.com/status](https://cloud.ibm.com/status)
2. Code Engine Limits: [Documentation](https://cloud.ibm.com/docs/codeengine?topic=codeengine-limits)
3. IBM Cloud Support: [cloud.ibm.com/unifiedsupport](https://cloud.ibm.com/unifiedsupport)