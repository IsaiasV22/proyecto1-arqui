<script setup lang="ts">
import type { RecordRow } from '~/composables/useRecordsList'

const route = useRoute()
const noc = computed(() => String(route.params.noc).toUpperCase())
const year = computed(() => Number(route.params.year))

const { data: record } = await useAsyncData(
  () => `record-${noc.value}-${year.value}`,
  () => {
    return queryCollection('records')
      .where('noc', '=', noc.value)
      .where('year', '=', year.value)
      .first() as unknown as Promise<RecordRow | null>
  },
  { watch: [noc, year] }
)

if (!record.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `No se encontró un registro para ${noc.value} en ${year.value}`
  })
}

const { data: countryAppearances } = await useAsyncData(
  () => `country-appearances-${noc.value}`,
  () => {
    return queryCollection('records')
      .where('noc', '=', noc.value)
      .order('year', 'ASC')
      .all() as unknown as Promise<RecordRow[]>
  },
  { watch: [noc] }
)

const currentIndex = computed(() => {
  return (countryAppearances.value ?? []).findIndex((row) => row.year === year.value)
})

const prevYear = computed(() => {
  const list = countryAppearances.value ?? []
  return currentIndex.value > 0 ? list[currentIndex.value - 1].year : null
})

const nextYear = computed(() => {
  const list = countryAppearances.value ?? []
  return currentIndex.value >= 0 && currentIndex.value < list.length - 1
    ? list[currentIndex.value + 1].year
    : null
})
</script>

<template>
  <div v-if="record">
    <p class="breadcrumb">
      <NuxtLink to="/">Inicio</NuxtLink> /
      <NuxtLink to="/countries">Países</NuxtLink> /
      <NuxtLink :to="`/countries/${noc}`">{{ noc }}</NuxtLink> /
      {{ year }}
    </p>

    <h1 class="page-title">
      {{ noc }} &mdash; {{ year }}
      <span v-if="record.host_country === 1" class="badge">País anfitrión</span>
    </h1>
    <p class="page-subtitle">ISO3: {{ record.iso3 }} &middot; Grupo de ingreso: {{ record.income_group }}</p>

    <section class="stat-grid">
      <div class="stat-box">
        <span class="stat-label">Oro</span>
        <span class="stat-value">
          <span class="medal-count"><span class="medal-dot gold" />{{ record.gold }}</span>
        </span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Plata</span>
        <span class="stat-value">
          <span class="medal-count"><span class="medal-dot silver" />{{ record.silver }}</span>
        </span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Bronce</span>
        <span class="stat-value">
          <span class="medal-count"><span class="medal-dot bronze" />{{ record.bronze }}</span>
        </span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Total de medallas</span>
        <span class="stat-value">{{ record.total_medals }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Medallas por atleta</span>
        <span class="stat-value">{{ record.medals_per_athlete.toFixed(3) }}</span>
      </div>
    </section>

    <section class="stat-grid">
      <div class="stat-box">
        <span class="stat-label">Atletas enviados</span>
        <span class="stat-value">{{ record.athletes_sent }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Deportes en los que participó</span>
        <span class="stat-value">{{ record.sports_participated }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Eventos en los que participó</span>
        <span class="stat-value">{{ record.events_participated }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Atletas femeninas</span>
        <span class="stat-value">{{ record.female_athlete_percentage.toFixed(1) }}%</span>
      </div>
    </section>

    <h2>Contexto</h2>
    <section class="stat-grid">
      <div class="stat-box">
        <span class="stat-label">Población</span>
        <span class="stat-value">{{ record.population.toLocaleString() }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">PIB per cápita</span>
        <span class="stat-value">${{ record.gdp_per_capita.toFixed(0) }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Total de medallas anterior</span>
        <span class="stat-value">{{ record.prev_total_medals }}</span>
      </div>
      <div class="stat-box">
        <span class="stat-label">Medallas/atleta anterior</span>
        <span class="stat-value">{{ record.prev_medals_per_athlete.toFixed(3) }}</span>
      </div>
    </section>

    <nav class="detail-nav">
      <NuxtLink v-if="prevYear !== null" :to="`/countries/${noc}/${prevYear}`">
        &laquo; {{ noc }} {{ prevYear }}
      </NuxtLink>
      <span v-else class="disabled">&laquo; Sin registro anterior</span>

      <NuxtLink v-if="nextYear !== null" :to="`/countries/${noc}/${nextYear}`">
        {{ noc }} {{ nextYear }} &raquo;
      </NuxtLink>
      <span v-else class="disabled">Sin registro posterior &raquo;</span>
    </nav>
  </div>
</template>
