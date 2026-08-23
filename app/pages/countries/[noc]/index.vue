<script setup lang="ts">
import type { RecordRow } from '~/composables/useRecordsList'

const route = useRoute()
const noc = computed(() => String(route.params.noc).toUpperCase())

const { data: appearances } = await useAsyncData(
  () => `country-${noc.value}`,
  () => {
    return queryCollection('records')
      .where('noc', '=', noc.value)
      .order('year', 'ASC')
      .all() as unknown as Promise<RecordRow[]>
  },
  { watch: [noc] }
)

if (!appearances.value?.length) {
  throw createError({ statusCode: 404, statusMessage: `No se encontraron registros para el país "${noc.value}"` })
}
</script>

<template>
  <div>
    <p class="breadcrumb">
      <NuxtLink to="/">Inicio</NuxtLink> / <NuxtLink to="/countries">Países</NuxtLink> / {{ noc }}
    </p>
    <h1 class="page-title">{{ noc }}</h1>
    <p class="page-subtitle">{{ appearances?.length }} participaciones en los Juegos de Verano en este conjunto de datos.</p>

    <div class="table-wrapper">
      <table class="results-table">
        <thead>
          <tr>
            <th>Año</th>
            <th>Anfitrión</th>
            <th>Atletas</th>
            <th>Oro</th>
            <th>Plata</th>
            <th>Bronce</th>
            <th>Total de medallas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in appearances" :key="row.year">
            <td><NuxtLink :to="`/countries/${noc}/${row.year}`">{{ row.year }}</NuxtLink></td>
            <td>{{ row.host_country === 1 ? 'Sí' : '' }}</td>
            <td>{{ row.athletes_sent }}</td>
            <td>{{ row.gold }}</td>
            <td>{{ row.silver }}</td>
            <td>{{ row.bronze }}</td>
            <td>{{ row.total_medals }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
