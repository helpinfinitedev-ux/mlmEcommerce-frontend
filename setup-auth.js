#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Authentication System for E-commerce MLM Platform\n');

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js v14 or higher.');
  process.exit(1);
}

// Check if backend directory exists
const backendPath = path.join(__dirname, 'backend');
if (!fs.existsSync(backendPath)) {
  console.error('❌ Backend directory not found. Please ensure the backend folder exists.');
  process.exit(1);
}

// Check if package.json exists in backend
const backendPackagePath = path.join(backendPath, 'package.json');
if (!fs.existsSync(backendPackagePath)) {
  console.error('❌ Backend package.json not found. Please ensure the backend setup is complete.');
  process.exit(1);
}

console.log('📦 Installing backend dependencies...');
try {
  execSync('npm install', { cwd: backendPath, stdio: 'inherit' });
  console.log('✅ Backend dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Check if .env exists in backend
const envPath = path.join(backendPath, '.env');
const envExamplePath = path.join(backendPath, 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📝 Creating .env file from template...');
    try {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ .env file created successfully');
    } catch (error) {
      console.error('❌ Failed to create .env file');
      process.exit(1);
    }
  } else {
    console.log('📝 Creating .env file...');
    const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce-mlm
NODE_ENV=development`;
    
    try {
      fs.writeFileSync(envPath, envContent);
      console.log('✅ .env file created successfully');
    } catch (error) {
      console.error('❌ Failed to create .env file');
      process.exit(1);
    }
  }
} else {
  console.log('✅ .env file already exists');
}

// Check if frontend dependencies are installed
const frontendPackagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(frontendPackagePath)) {
  console.log('📦 Checking frontend dependencies...');
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    console.log('📦 Installing frontend dependencies...');
    try {
      execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
      console.log('✅ Frontend dependencies installed successfully');
    } catch (error) {
      console.error('❌ Failed to install frontend dependencies');
      process.exit(1);
    }
  } else {
    console.log('✅ Frontend dependencies already installed');
  }
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Start MongoDB (if using local installation):');
console.log('   - Windows: mongod');
console.log('   - macOS/Linux: sudo systemctl start mongod');
console.log('\n2. Start the backend server:');
console.log('   cd backend && npm run dev');
console.log('\n3. Start the frontend:');
console.log('   npm start');
console.log('\n4. Open your browser and navigate to:');
console.log('   http://localhost:3000');
console.log('\n📚 For detailed instructions, see: AUTHENTICATION_SETUP.md');
console.log('\n🔧 For troubleshooting, check the setup guide or console logs.'); 