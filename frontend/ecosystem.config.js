require("dotenv").config({ path: "./production.env" });

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
      script: "npm",
      args: "start",
      cwd: "frontend",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "git@github.com:VMBush/nodejs-pm2-deploy.git",
      path: `${DEPLOY_PATH}/frontend`,
      // "pre-deploy-local": `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      //"pre-deploy-local": `scp production.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}frontend/current/production.env`,
      // "post-deploy": "npm i && npm run build",
      "post-deploy": [
        "cp ../production.env current/production.env",
        "cp ./*.env ./frontend/*.env",
        "cd frontend",
        // "npm ci --only=production",
        "npm i && npm run build",
        // "pm2 startOrRestart ecosystem.config.js --env production >> logs.txt",
      ],
    },
    // production: {
    //   user: "user",
    //   host: "158.160.203.193",
    //   ref: "origin/main",
    //   repo: "git@github.com:VMBush/nodejs-pm2-deploy.git",
    //   path: "/home/user/mesto/frontend",
    //   "pre-setup": "rm -rf releases/* current shared",
    //   "post-deploy": [
    //     "npm ci",
    //     "npm run build",
    //     //# Serve статических файлов (установите nginx или serve)
    //     "npx serve -s build -l 3000 &",
    //   ],
    //   env: {
    //     NODE_ENV: "production",
    //   },
    // },
  },
};
