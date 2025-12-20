module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: 'src/app.ts',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 8001,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8001,
    },
  }],
  deploy: {
    production: {
      user: 'user',
      host: '158.160.203.193',
      ref: 'origin/main',
      repo: 'git@github.com:VMBush/nodejs-pm2-deploy.git',
      path: '/home/user/mesto/backend',
      'post-deploy': [
        'npm ci --only=production',
        'npm run build',
        'pm2 startOrRestart ecosystem.config.js --env production',
      ],
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
