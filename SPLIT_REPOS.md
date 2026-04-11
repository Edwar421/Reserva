# Separación en repositorios independientes

La carpeta `backend/` y la carpeta `frontend/` ya quedaron inicializadas como repositorios Git locales separados.

## Siguientes pasos para GitHub

1. Crear dos repositorios vacíos en GitHub, uno para backend y otro para frontend.
2. En `backend/`, configurar el remoto y hacer el primer commit.
3. En `frontend/`, configurar el remoto y hacer el primer commit.

## Comandos de referencia

```bash
cd backend
git add .
git commit -m "Initial backend import"
git remote add origin <url-del-repo-backend>
git push -u origin main
```

```bash
cd frontend
git add .
git commit -m "Initial frontend import"
git remote add origin <url-del-repo-frontend>
git push -u origin main
```

## Nota

La aplicación no cambia con esta separación. El frontend sigue apuntando al backend local en `http://localhost:3000` mientras no se centralice esa URL en una variable de entorno.