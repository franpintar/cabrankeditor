# Cabrankeditor

Web-based editor frontend for the **[Cabrankengine](https://github.com/cabranca/cabrankengine)** game engine. The engine is a C++ ECS runtime compiled to WebAssembly (via Emscripten); this React app acts as its host and provides the editor UI.

**Live build:** https://cabrankeditor.franpint.ar

## Getting started

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check then produce a production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally |
