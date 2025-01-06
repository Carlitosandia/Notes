#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}Starting backend setup...${NC}"
cd Backend
npm install
npm run start:dev &  # Ejecutar en segundo plano
BACKEND_PID=$!       # Guardar el PID del proceso backend

cd ..                # Volver a la raíz del proyecto

echo -e "${GREEN}Starting frontend setup...${NC}"
cd Frontend
npm install
npm run dev          # Ejecutar frontend en primer plano
