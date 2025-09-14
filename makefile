# Makefile

.PHONY: backend frontend all

backend:
	cd backend && npm run dev

frontend:
	cd frontend && npm run dev

all:
	@echo "Starting backend and frontend concurrently..."
	(cd backend && npm run dev) & (cd frontend && npm run dev)
