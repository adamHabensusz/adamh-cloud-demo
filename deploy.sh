#!/bin/bash

# IBM Cloud Code Engine Deployment Script
# This script will deploy your React app to IBM Cloud Code Engine

set -e

echo "🚀 IBM Cloud Code Engine Deployment Script"
echo "==========================================="
echo ""

# Configuration
APP_NAME="ibm-cloud-dashboard"
PROJECT_NAME="ibm-dashboard-project"
REGION="us-south"

# Check if IBM Cloud CLI is installed
if ! command -v ibmcloud &> /dev/null; then
    echo "❌ IBM Cloud CLI is not installed."
    echo "📥 Install it from: https://cloud.ibm.com/docs/cli?topic=cli-getting-started"
    exit 1
fi

echo "✅ IBM Cloud CLI found"

# Check if Code Engine plugin is installed
if ! ibmcloud plugin list | grep -q "code-engine"; then
    echo "📦 Installing Code Engine plugin..."
    ibmcloud plugin install code-engine -f
else
    echo "✅ Code Engine plugin found"
fi

# Login check
echo ""
echo "🔐 Checking IBM Cloud login status..."
if ! ibmcloud target &> /dev/null; then
    echo "Please log in to IBM Cloud:"
    ibmcloud login --sso
else
    echo "✅ Already logged in to IBM Cloud"
fi

# Target region
echo ""
echo "🌍 Targeting region: $REGION"
ibmcloud target -r $REGION

# Check if project exists, create if not
echo ""
echo "📁 Checking for Code Engine project: $PROJECT_NAME"
if ! ibmcloud ce project get --name $PROJECT_NAME &> /dev/null; then
    echo "Creating new Code Engine project: $PROJECT_NAME"
    ibmcloud ce project create --name $PROJECT_NAME
else
    echo "✅ Project exists, selecting it"
fi

ibmcloud ce project select --name $PROJECT_NAME

# Deploy the application
echo ""
echo "🚢 Deploying application: $APP_NAME"
echo "This will build from source and deploy..."
echo ""

ibmcloud ce application create \
  --name $APP_NAME \
  --build-source . \
  --strategy dockerfile \
  --port 8080 \
  --min-scale 1 \
  --max-scale 3 \
  --cpu 0.25 \
  --memory 0.5G \
  --build-timeout 900 \
  --wait

# Get the application URL
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Application details:"
ibmcloud ce application get --name $APP_NAME

echo ""
echo "🌐 Your application is now live!"
echo "Access it at the URL shown above."
echo ""

# Made with Bob
