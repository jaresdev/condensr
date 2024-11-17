// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

import dotenv from 'dotenv'

dotenv.config()

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
})
