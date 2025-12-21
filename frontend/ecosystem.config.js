require("dotenv").config();

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/master",
} = process.env;

module.exports = {
  apps: [
    {
      name: "mesto-frontend",
      script: "pm2",
      args: "serve build 3000 --spa",
      interpreter: "none",
      cwd: "frontend",
      // node_args: "--openssl-legacy-provider",
      autorestart: true,
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        NODE_OPTIONS: "--openssl-legacy-provider",
      },
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "git@github.com:VMBush/nodejs-pm2-deploy.git",
      path: `${DEPLOY_PATH}`,
      // "pre-deploy-local": `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      "pre-deploy-local": `scp frontend/production.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}shared/.env.production`,
      // // "post-deploy": "npm i && npm run build",
      "post-deploy": `
        cd frontend &&
        ln -sfn ${DEPLOY_PATH}/shared/.env.production .env.production &&
        npm ci &&
        npm run build &&
        pm2 reload ecosystem.config.js --env production`,
    },
  },
};
