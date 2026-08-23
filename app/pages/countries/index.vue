<script setup lang="ts">
import type { RecordRow } from '~/composables/useRecordsList'

const { data: records } = await useAsyncData('countries-index', () => {
  return queryCollection('records').all() as unknown as Promise<RecordRow[]>
})

const countries = computed(() => {
  const byNoc = new Map<string, RecordRow>()
  for (const row of records.value ?? []) {
    if (!byNoc.has(row.noc)) byNoc.set(row.noc, row)
  }
  return [...byNoc.values()].sort((a, b) => a.noc.localeCompare(b.noc))
})
</script>

<template>
  <div>
    <p class="breadcrumb"><NuxtLink to="/">Inicio</NuxtLink> / Países</p>
    <h1 class="page-title">Países</h1>
    <p class="page-subtitle">{{ countries.length }} países con al menos una participación en los Juegos de Verano en este conjunto de datos.</p>

    <div class="card-grid">
      <NuxtLink
        v-for="country in countries"
        :key="country.noc"
        :to="`/countries/${country.noc}`"
        class="card-link"
      >
        {{ country.noc }}
        <span class="card-link-sub">{{ country.iso3 }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
