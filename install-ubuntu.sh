
#!/bin/bash

# Crypto Dashboard Ubuntu Installation Script
# the 1. Million Dollar App

echo "🚀 Installing Crypto Dashboard - the 1. Million Dollar App"
echo "=================================================="

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
echo "📦 Installing Node.js and npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installations
echo "✅ Verifying installations..."
node --version
npm --version

# Clone or download project (user needs to adjust this)
echo "📁 Setting up project directory..."
mkdir -p ~/crypto-dashboard
cd ~/crypto-dashboard

# Install dependencies (assuming package.json is present)
echo "📦 Installing project dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Install global serve package for hosting
echo "📦 Installing serve package globally..."
sudo npm install -g serve

# Create systemd service for auto-start
echo "⚙️ Creating systemd service..."
sudo tee /etc/systemd/system/crypto-dashboard.service > /dev/null <<EOF
[Unit]
Description=Crypto Dashboard - the 1. Million Dollar App
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$(pwd)
ExecStart=/usr/bin/npx serve -s dist -l 3000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
echo "🚀 Enabling and starting the service..."
sudo systemctl daemon-reload
sudo systemctl enable crypto-dashboard.service
sudo systemctl start crypto-dashboard.service

# Create desktop entry for GUI access
echo "🖥️ Creating desktop entry..."
mkdir -p ~/.local/share/applications
tee ~/.local/share/applications/crypto-dashboard.desktop > /dev/null <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=Crypto Dashboard
Comment=the 1. Million Dollar App
Exec=xdg-open http://localhost:3000
Icon=accessories-calculator
Terminal=false
Categories=Office;Finance;
EOF

# Install Chrome/Chromium for better PWA support
echo "🌐 Installing Chromium for PWA support..."
sudo apt install -y chromium-browser

echo ""
echo "✅ Installation completed successfully!"
echo ""
echo "🎉 Crypto Dashboard - the 1. Million Dollar App is now installed!"
echo ""
echo "Access methods:"
echo "• Web Browser: http://localhost:3000"
echo "• Desktop App: Look for 'Crypto Dashboard' in your applications menu"
echo "• Service Status: sudo systemctl status crypto-dashboard"
echo ""
echo "For PWA installation:"
echo "1. Open http://localhost:3000 in Chromium"
echo "2. Click the install button in the address bar"
echo "3. The app will be installed as a standalone application"
echo ""
echo "MQTT Configuration: Press Ctrl+M in the application"
echo ""
echo "Service commands:"
echo "• Start: sudo systemctl start crypto-dashboard"
echo "• Stop: sudo systemctl stop crypto-dashboard"
echo "• Restart: sudo systemctl restart crypto-dashboard"
echo "• Logs: sudo journalctl -u crypto-dashboard -f"
