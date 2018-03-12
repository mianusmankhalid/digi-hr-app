#!/bin/bash
SELENV=$1

# Available Environments
# DEVELOPMENT
# STAGING
# PRODUCTION

echo "Loading environment ${SELENV}"

API_VAR="${SELENV}_API_URL"
yarn inject_api_url -r . -a  ${!API_VAR}