const dotenv = require("dotenv");
dotenv.config({ path: "./production.env" });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF } =
  process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: "git@github.com:VMBush/nodejs-pm2-deploy.git",
      path: DEPLOY_PATH,
      "post-deploy": "cd frontend && npm i && npm run build",
    },
  },
};
