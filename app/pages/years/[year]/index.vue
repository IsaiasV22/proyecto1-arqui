<script setup lang="ts">
import type { RecordRow } from '~/composables/useRecordsList'

const route = useRoute()
const year = computed(() => Number(route.params.year))

const { data: participants } = await useAsyncData(
  () => `year-${year.value}`,
  () => {
    return queryCollection('records')
      .where('year', '=', year.value)
      .order('noc', 'ASC')
      .all() as unknown as Promise<RecordRow[]>
  },
  { watch: [year] }
)

if (!participants.value?.length) {
  throw createError({ statusCode: 404, statusMessage: `No se encontraron registros para el año ${year.value}` })
}
</script>

<template>
  <div>
    <p class="breadcrumb">
      <NuxtLink to="/">Inicio</NuxtLink> / <NuxtLink to="/years">Años</NuxtLink> / {{ year }}
    </p>
    <h1 class="page-title">Juegos de Verano {{ year }}</h1>
    <p class="page-subtitle">{{ participants?.length }} países con registros para esta edición.</p>

    <div class="table-wrapper">
      <table class="results-table">
        <thead>
          <tr>
            <th>NOC</th>
            <th>Anfitrión</th>
            <th>Grupo de ingreso</th>
            <th>Oro</th>
            <th>Plata</th>
            <th>Bronce</th>
            <th>Total de medallas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in participants" :key="row.noc">
            <td><NuxtLink :to="`/countries/${row.noc}/${year}`">{{ row.noc }}</NuxtLink></td>
            <td>{{ row.host_country === 1 ? 'Sí' : '' }}</td>
            <td>{{ row.income_group }}</td>
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
