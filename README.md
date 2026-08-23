# proyecto1-arqui

Explorador del medallero de los Juegos Olímpicos de Verano, construido con Nuxt 4 + `@nuxt/content`, para el curso EIF-511 Arquitectura de Información (Universidad Nacional, Escuela de Informática).

**Sitio desplegado:** <https://proyecto1-arqui-isaiasviquez.netlify.app>

## Conjunto de datos

248 registros país–año (25 NOC, 1960–2016) en [content/olympic_countries_efficiency.csv](content/olympic_countries_efficiency.csv) — población, PIB per cápita, grupo de ingreso, indicador de país anfitrión, tamaño de la delegación y cantidad de medallas por edición de los Juegos de Verano.

El archivo CSV original usa encabezados de columna con mayúsculas (`NOC`, `ISO3`, `Year`, `Gold`, `Silver`, `Bronze`). Nuxt Content mapea los encabezados del CSV directamente a las claves del esquema `data` sin ningún mecanismo de renombrado, por lo que fue necesario crear una copia en `content/` con los encabezados en minúscula (`noc`, `iso3`, `year`, `gold`, `silver`, `bronze`) para poder definirla como colección en `content.config.ts`. El resto de los valores de los datos no se modificó.

## Navegación

- `/countries` → `/countries/[noc]` → `/countries/[noc]/[year]` — explorar por país
- `/years` → `/years/[year]` — explorar por edición de los Juegos
- `/records` — buscar, filtrar (grupo de ingreso, país anfitrión) y paginar todos los registros
- `/medals` — tabla de medallas ordenada por total de medallas, con filtro por rango de medallas

## Desarrollo

```
npm install
npm run dev
```

## Compilación

Generación estática (usada para el despliegue en Netlify):

```
npm run generate
```

El resultado se genera en `.output/public`.
