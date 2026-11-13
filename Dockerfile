# Dockerfile para producción
FROM nginx:alpine

# Copiar todo el contenido de la app al directorio de Nginx
COPY . /usr/share/nginx/html

EXPOSE 80
