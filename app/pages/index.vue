<script setup lang="ts">
import type { RecordRow } from '~/composables/useRecordsList'

const { data: records } = await useAsyncData('home-records', () => {
  return queryCollection('records').all() as unknown as Promise<RecordRow[]>
})

const countryCount = computed(() => new Set((records.value ?? []).map((r) => r.noc)).size)
const yearCount = computed(() => new Set((records.value ?? []).map((r) => r.year)).size)
const recordCount = computed(() => records.value?.length ?? 0)
</script>

<template>
  <div>
    <h1 class="page-title">Medallero de los Juegos Olímpicos de Verano</h1>
    <p class="page-subtitle">
      Explora {{ recordCount }} registros, uno por cada país en cada edición, que abarcan
      {{ countryCount }} países en {{ yearCount }} ediciones de los Juegos de Verano
      (1960&ndash;2016).
    </p>

    <div class="card-grid">
      <NuxtLink to="/countries" class="card-link">
        Por país
        <span class="card-link-sub">Explora el historial de cada país en los Juegos</span>
      </NuxtLink>
      <NuxtLink to="/years" class="card-link">
        Por año
        <span class="card-link-sub">Explora los participantes de cada edición</span>
      </NuxtLink>
      <NuxtLink to="/records" class="card-link">
        Todos los registros
        <span class="card-link-sub">Busca, filtra y pagina cada fila</span>
      </NuxtLink>
      <NuxtLink to="/medals" class="card-link">
        Tabla de medallas
        <span class="card-link-sub">Clasificados por total de medallas ganadas</span>
      </NuxtLink>
    </div>

    <section class="card">
      <h2>Acerca de este conjunto de datos</h2>
      <p>
        Cada registro representa la participación de un país en una edición de los Juegos
        Olímpicos de Verano, incluyendo población, PIB per cápita, grupo de ingreso, tamaño de la
        delegación y cantidad de medallas. El conjunto de datos abarca de 1960 a 2016 y usa los
        códigos NOC/ISO3 como identificadores de país.
      </p>
    </section>
  </div>
</template>
