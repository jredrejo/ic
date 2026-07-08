# Iglesia en Camino

Galería PDF de la revista **Iglesia en Camino**, semanario de la Archidiócesis
de Mérida-Badajoz. SPA construida con Vite + Vue 3, sin framework de UI:
estilos propios basados en el manual de identidad corporativa del Arzobispado
(burdeos #660033, oro litúrgico #C4A84A, tipografías Bodoni/Alegreya/Roboto).

Los datos se obtienen del índice remoto (API estable y congelada):
`https://www.meridabadajoz.net/iglesiaencamino/ic.json`

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo (localhost:5173)
npm run build    # build de producción en dist/
npm run preview  # sirve el build de producción
npm run lint     # eslint
```

Requiere Node 18 o superior.

## API de suscripción

```bash
curl -X POST -H "Content-Type: application/json" \
  https://www.meridabadajoz.net/wp-json/newsletter/v1/subscribe \
  -d '{"email":"test@example.com", "name":"My name", "surname":"mysurname"}'
```

## Archivo histórico

Los números de 1996 a 2009 se sirven como HTML estático en
<https://iglesiaencamino.meridabadajoz.net/antiguos/index.html>.
