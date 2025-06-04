
#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting Crypto Dashboard - Million Dollar App');
console.log('================================================');

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.log('📦 Building application...');
  
  const buildProcess = spawn('npm', ['run', 'build'], {
    stdio: 'inherit',
    shell: true
  });
  
  buildProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Build completed successfully');
      startServer();
    } else {
      console.error('❌ Build failed');
      process.exit(1);
    }
  });
} else {
  console.log('📁 Using existing build');
  startServer();
}

function startServer() {
  console.log('🌐 Starting HTTP server...');
  
  const serverProcess = spawn('node', ['server.js'], {
    stdio: 'inherit',
    shell: true
  });
  
  serverProcess.on('close', (code) => {
    console.log(`Server exited with code ${code}`);
  });
  
  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    serverProcess.kill('SIGTERM');
  });
  
  process.on('SIGINT', () => {
    serverProcess.kill('SIGINT');
  });
}
