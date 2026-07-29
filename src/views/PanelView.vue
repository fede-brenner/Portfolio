<template>
  <div class="min-h-screen bg-[#131418] text-white px-4 py-8">
    <div v-if="!configured" class="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-4">
      <h1 class="text-2xl font-bold">{{ t.panel.notConfigured.heading }}</h1>
      <p class="text-[#888888] max-w-md">
        {{ t.panel.notConfigured.description }}
      </p>
    </div>

    <div v-else-if="loading" class="flex items-center justify-center h-[60vh]">
      <p>{{ t.panel.loading }}</p>
    </div>

    <div v-else-if="!session" class="flex flex-col items-center justify-center h-[60vh] gap-4">
      <h1 class="text-2xl font-bold">{{ t.panel.login.heading }}</h1>
      <button
        class="pixel-corners-sm bg-[#5D42A9] hover:opacity-90 text-white font-bold py-2 px-4"
        @click="signInWithGoogle"
      >
        {{ t.panel.login.signIn }}
      </button>
      <p v-if="errorMsg" class="text-red-400 text-sm">{{ errorMsg }}</p>
    </div>

    <div v-else-if="!isAuthorized" class="flex flex-col items-center justify-center h-[60vh] gap-4">
      <h1 class="text-2xl font-bold">{{ t.panel.unauthorized.heading }}</h1>
      <p class="text-[#888888]">{{ t.panel.unauthorized.description }}</p>
      <div class="pixel-corners-sm inline-block bg-[#5D42A9] p-px">
        <button
          class="pixel-corners-sm bg-[#131418] hover:bg-[#1c1d22] transition-colors text-white py-2 px-4"
          @click="signOut"
        >
          {{ t.panel.unauthorized.signOut }}
        </button>
      </div>
    </div>

    <div v-else class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold mb-2">{{ t.panel.title }}</h1>
          <PixelTabs
            v-model="tab"
            variant="underline"
            :tabs="[
              { key: 'graficos', label: t.panel.tabs.graficos },
              { key: 'personas', label: t.panel.tabs.personas }
            ]"
          />
        </div>
        <div class="flex items-center gap-3">
          <div class="pixel-corners-sm inline-block bg-[#5D42A9] p-px">
            <button
              class="pixel-corners-sm bg-[#131418] hover:bg-[#1c1d22] transition-colors text-white py-1 px-2 text-sm flex flex-row items-center"
              :disabled="loadingPersonas"
              @click="fetchPersonas"
            >
              <ReloadIcon class="sm:me-1" :class="{ 'animate-spin': loadingPersonas }"/>
              <p class="m-0 hidden lg:block">{{ loadingPersonas ? t.panel.refresh.loading : t.panel.refresh.idle }}</p>
            </button>
          </div>

          <div class="relative" ref="userMenu">
            <button
              class="pixel-corners-sm shadow-on-hover flex items-center gap-2 py-1 px-2 hover:bg-[#1c1d22]"
              @click="showUserMenu = !showUserMenu"
            >
            <div class="pixel-corners-sm inline-block bg-[#5D42A9] p-px">
                <img
                    v-if="userAvatar"
                    :src="userAvatar"
                    class="w-8 h-8 pixel-corners-sm bg-[#131418]"
                    referrerpolicy="no-referrer"
                />
            </div>
              <span class="hidden sm:block text-sm text-[#888888]">{{ userName }}</span>
              <PixelTriangle direction="down" class="text-[#888888]" />
            </button>

            <div
              v-if="showUserMenu"
              class="absolute top-full right-0 mt-2 z-20 bg-[#1c1d22] border border-[#5D42A9] rounded p-1 text-sm w-56"
            >
              <p class="sm:hidden text-[#888888] px-3 py-2 truncate text-start border-b-2 border-[#333333]">{{ userName }}</p>
              <button
                class="pixel-corners-sm shadow-on-hover flex flex-row w-full items-center text-left px-3 py-2 hover:bg-[#2a2b31]"
                @click="goHome"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 11v2H4v-2zM8 13v2H6v-2zm2 2v2H8v-2zm2 2v2h-2v-2zm-4-6V9H6v2z"/>
                    <path d="M10 15V7H8v8zm2 2V5h-2v12z"/>
                </svg>
                <p class="m-0 ms-1">{{ t.panel.userMenu.goHome }}</p>
              </button>
              <button class="justify-between pixel-corners-sm shadow-on-hover flex flex-row w-full items-center text-left px-3 py-2 hover:bg-[#2a2b31]" @click.stop="setTheme(theme === 'light' ? 'dark' : 'light')">
                <span>{{ t.panel.userMenu.theme }}</span>
                <PixelMoon v-if="theme == 'dark'"/>
                <PixelSun v-if="theme == 'light'"/>
              </button>

              <button
                class="justify-between pixel-corners-sm shadow-on-hover flex flex-row w-full items-center text-left px-3 py-2 hover:bg-[#2a2b31]"
                @click.stop="cycleLanguage"
              >
                <span>{{ LANGUAGE_LABELS[languageState.value] }}</span>
                <LanguageIcon />
              </button>

              <button
                class="justify-between pixel-corners-sm shadow-on-hover flex flex-row w-full text-left px-3 py-2 hover:bg-[#2a2b31] text-[#BE2D2D]"
                @click="signOut"
              >
                <p class="m-o">{{ t.panel.userMenu.signOut }}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 22H6v-2h12v2ZM6 20H4V4h2v16Zm14 0h-2v-3h2v3ZM16 9h2v2h2v2h-2v2h-2v2h-2v-4H8v-2h6V7h2v2Zm4-2h-2V4h2v3Zm-2-3H6V2h12v2Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <PersonaCharts v-if="tab === 'graficos'" :personas="personas" :loading="loadingPersonas" />
      <PersonasList
        v-else
        :personas="personas"
        :loading="loadingPersonas"
        @refresh="fetchPersonas"
        @persona-saved="onPersonaSaved"
        @persona-deleted="onPersonaDeleted"
      />
    </div>
  </div>
</template>

<script>
import { supabase, ALLOWED_EMAIL, isSupabaseConfigured } from '@/lib/supabaseClient'
import PersonasList from '@/components/panel/PersonasList.vue'
import PersonaCharts from '@/components/panel/PersonaCharts.vue'
import PixelTabs from '@/components/panel/PixelTabs.vue'
import PixelTriangle from '@/components/panel/icons/PixelTriangle.vue'
import PixelSun from '@/components/panel/icons/PixelSun.vue'
import PixelMoon from '@/components/panel/icons/PixelMoon.vue'
import LanguageIcon from '@/components/panel/icons/LanguageIcon.vue'
import { themeState, setTheme } from '@/lib/theme'
import { languageState, setLanguage, LANGUAGES, LANGUAGE_LABELS } from '@/lib/language'
import { translations } from '@/config/translations'
import ReloadIcon from '@/components/panel/icons/ReloadIcon.vue'
import { getCachedSignedUrl } from '@/lib/signedUrlCache'

const PERSONAS_CACHE_KEY = 'personasCache'
const PERSONAS_CACHE_TTL_MS = 15 * 60 * 1000

function loadPersonasCache() {
  try {
    const raw = JSON.parse(localStorage.getItem(PERSONAS_CACHE_KEY))
    if (raw && Array.isArray(raw.data) && typeof raw.fetchedAt === 'number') return raw
  } catch {
    // ignorar y forzar fetch
  }
  return null
}

function savePersonasCache(data) {
  try {
    localStorage.setItem(PERSONAS_CACHE_KEY, JSON.stringify({ data, fetchedAt: Date.now() }))
  } catch {
    // localStorage lleno o no disponible: sigue funcionando sin cache persistente
  }
}

function clearPersonasCache() {
  localStorage.removeItem(PERSONAS_CACHE_KEY)
}

export default {
  name: 'PanelView',
  components: { PersonasList, PersonaCharts, PixelTabs, PixelTriangle, PixelSun, PixelMoon, LanguageIcon, ReloadIcon },
  data() {
    return {
      configured: isSupabaseConfigured,
      loading: true,
      session: null,
      errorMsg: '',
      tab: ['graficos', 'personas'].includes(localStorage.getItem('panel:tab'))
        ? localStorage.getItem('panel:tab')
        : 'graficos',
      showUserMenu: false,
      languageState,
      LANGUAGES,
      LANGUAGE_LABELS,
      personas: [],
      loadingPersonas: false,
      hasLoadedPersonas: false,
      authSubscription: null
    }
  },
  computed: {
    theme() {
      return themeState.value
    },
    t() {
      return translations[this.languageState.value]
    },
    isAuthorized() {
      return !!this.session && this.session.user?.email === ALLOWED_EMAIL
    },
    userName() {
      const meta = this.session?.user?.user_metadata
      return meta?.full_name || meta?.name || this.session?.user?.email || ''
    },
    userAvatar() {
      const meta = this.session?.user?.user_metadata
      return meta?.avatar_url || meta?.picture || ''
    }
  },
  watch: {
    tab(value) {
      localStorage.setItem('panel:tab', value)
    }
  },
  async mounted() {
    document.addEventListener('click', this.handleOutsideClick)

    if (!this.configured) {
      this.loading = false
      return
    }

    const { data } = await supabase.auth.getSession()
    this.session = data.session
    this.loading = false

    // La lista de personas (y las imágenes que trae) ya no se carga sola en
    // cada login/vuelta a la pestaña: se reusa la última copia guardada en
    // localStorage mientras tenga menos de 15 minutos, y solo se pide de
    // nuevo con eso vencido o al apretar "Actualizar lista" a mano.
    if (this.isAuthorized) {
      const cache = loadPersonasCache()
      if (cache && Date.now() - cache.fetchedAt < PERSONAS_CACHE_TTL_MS) {
        this.personas = cache.data
        this.hasLoadedPersonas = true
      } else {
        this.fetchPersonas()
      }
    } else if (this.session) {
      await supabase.auth.signOut()
      this.session = null
    }

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      this.session = session
      if (session && session.user?.email !== ALLOWED_EMAIL) {
        await supabase.auth.signOut()
        this.session = null
      }
    })
    this.authSubscription = sub.subscription
  },
  beforeUnmount() {
    this.authSubscription?.unsubscribe()
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    handleOutsideClick(event) {
      const wrapper = this.$refs.userMenu
      if (wrapper && !wrapper.contains(event.target)) {
        this.showUserMenu = false
      }
    },
    setTheme,
    cycleLanguage() {
      const idx = this.LANGUAGES.indexOf(this.languageState.value)
      const next = this.LANGUAGES[(idx + 1) % this.LANGUAGES.length]
      setLanguage(next)
    },
    goHome() {
      this.showUserMenu = false
      this.$router.push('/')
    },
    async signInWithGoogle() {
      this.errorMsg = ''
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/panel' }
      })
      if (error) this.errorMsg = error.message
    },
    async signOut() {
      this.showUserMenu = false
      await supabase.auth.signOut()
      this.session = null
      this.personas = []
      this.hasLoadedPersonas = false
      clearPersonasCache()
    },
    async fetchPersonas() {
      this.loadingPersonas = true
      const { data, error } = await supabase
        .from('personas')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) {
        this.personas = await Promise.all(
          data.map(async (persona) => {
            if (!persona.imagen_path) return { ...persona, imagen_signed_url: null, imagen_thumb_signed_url: null }
            const url = await getCachedSignedUrl(supabase, 'personas-imagenes', persona.imagen_path)
            const thumbUrl = persona.imagen_thumb_path
              ? await getCachedSignedUrl(supabase, 'personas-imagenes', persona.imagen_thumb_path)
              : null
            return { ...persona, imagen_signed_url: url, imagen_thumb_signed_url: thumbUrl }
          })
        )
        this.hasLoadedPersonas = true
        savePersonasCache(this.personas)
      }
      this.loadingPersonas = false
    },
    onPersonaSaved(persona) {
      const idx = this.personas.findIndex((p) => p.id === persona.id)
      if (idx === -1) this.personas.unshift(persona)
      else this.personas.splice(idx, 1, persona)
      savePersonasCache(this.personas)
    },
    onPersonaDeleted(id) {
      const idx = this.personas.findIndex((p) => p.id === id)
      if (idx !== -1) this.personas.splice(idx, 1)
      savePersonasCache(this.personas)
    }
  }
}
</script>
