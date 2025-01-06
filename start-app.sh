#!/bin/bash

# Salir inmediatamente si ocurre un error
set -e

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # Sin color

echo -e "${GREEN}Checking prerequisites...${NC}"

# 1. Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Installing Node.js...${NC}"
    # Detectar sistema operativo
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Instalar Node.js en Linux
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # Instalar Node.js en macOS
        brew install node
    else
        echo -e "${RED}Unsupported OS. Please install Node.js manually.${NC}"
        exit 1
    fi
fi

# Verificar instalación exitosa de Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Failed to install Node.js. Please install it manually.${NC}"
    exit 1
fi

echo -e "${GREEN}Node.js and npm are installed.${NC}"

# 2. Configuración del backend
echo -e "${GREEN}Setting up the backend...${NC}"
cd Backend
npm install
npm run start:dev &    # Ejecutar el backend en segundo plano
BACKEND_PID=$!

cd ..                  # Volver al directorio raíz

# 3. Configuración del frontend
echo -e "${GREEN}Setting up the frontend...${NC}"
cd Frontend
npm install
npm run dev &          # Ejecutar el frontend en segundo plano
FRONTEND_PID=$!

cd ..                  # Volver al directorio raíz

# 4. Esperar a que ambos procesos terminen (opcional)
wait $BACKEND_PID $FRONTEND_PID
