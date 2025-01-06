#!/bin/bash

# Salir si ocurre un error
set -e

# Colores para mensajes
GREEN='\033[0;32m'
NC='\033[0m' # Sin color

# Cargar variables de entorno desde el archivo .env
if [ -f .env ]; then
  echo -e "${GREEN}Loading environment variables from .env...${NC}"
  export $(grep -v '^#' .env | xargs)
else
  echo -e "${GREEN}No .env file found. Skipping environment variable loading.${NC}"
fi

echo -e "${GREEN}Starting the application setup...${NC}"

# 1. Instalar dependencias del backend
echo -e "${GREEN}Setting up the backend...${NC}"
cd Backend
if [ ! -d "node_modules" ]; then
  npm install
fi

# Configurar la base de datos
echo -e "${GREEN}Initializing database...${NC}"
if [ -n "$DATABASE_URL" ]; then
  echo -e "${GREEN}Using DATABASE_URL: $DATABASE_URL${NC}"
else
  echo -e "${GREEN}DATABASE_URL not set. Please check your .env file.${NC}"
fi
npx prisma migrate dev

cd ..

# 2. Instalar dependencias del frontend
echo -e "${GREEN}Setting up the frontend...${NC}"
cd Frontend
if [ ! -d "node_modules" ]; then
  npm install
fi

# Cargar variables específicas para Vite
if [ -f .env ]; then
  echo -e "${GREEN}Loading frontend-specific environment variables...${NC}"
fi

cd ..

# 3. Crear configuraciones adicionales si es necesario
echo -e "${GREEN}Creating additional configurations (if needed)...${NC}"
# Puedes agregar aquí pasos adicionales de configuración

# 4. Arrancar backend y frontend en paralelo
echo -e "${GREEN}Starting backend and frontend...${NC}"
cd Backend && npm run start:dev &
BACKEND_PID=$!
cd ../Frontend && npm run dev -- --host &
FRONTEND_PID=$!

# Esperar a que ambos procesos terminen
wait $BACKEND_PID $FRONTEND_PID
