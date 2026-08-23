import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    records: defineCollection({
      type: 'data',
      source: 'olympic_countries_efficiency.csv',
      schema: z.object({
        noc: z.string(),
        iso3: z.string(),
        year: z.number(),
        population: z.number(),
        gdp_per_capita: z.number(),
        income_group: z.string(),
        host_country: z.number(),
        athletes_sent: z.number(),
        sports_participated: z.number(),
        events_participated: z.number(),
        female_athlete_percentage: z.number(),
        prev_total_medals: z.number(),
        prev_medals_per_athlete: z.number(),
        gold: z.number(),
        silver: z.number(),
        bronze: z.number(),
        total_medals: z.number(),
        medals_per_athlete: z.number()
      })
    })
  }
})
