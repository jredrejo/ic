<template>
  <section class="archive" aria-labelledby="archivo-titulo">
    <div class="container">
      <h2 id="archivo-titulo" class="archive__title">Números anteriores</h2>

      <template v-if="loading">
        <div class="pills" aria-hidden="true">
          <div v-for="n in 8" :key="n" class="skeleton sk-pill"></div>
        </div>
        <div class="grid">
          <div v-for="n in 4" :key="n" class="skeleton sk-card"></div>
        </div>
      </template>

      <template v-else>
        <nav class="archive__nav" aria-label="Navegación por año y mes">
          <div
            class="pills pills--scroll"
            role="tablist"
            aria-label="Seleccionar año"
          >
            <button
              v-for="year in years"
              :key="year"
              class="pill"
              type="button"
              role="tab"
              :aria-selected="year === viewYear"
              :class="{ 'pill--active': year === viewYear }"
              @click="selectYear(year)"
            >
              {{ year }}
            </button>
            <a class="pill pill--link" :href="OLD_ARCHIVE_URL">
              1996–2009
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>

          <div class="pills" role="tablist" aria-label="Seleccionar mes">
            <button
              v-for="month in months"
              :key="month"
              class="pill pill--month"
              type="button"
              role="tab"
              :aria-selected="month === viewMonth"
              :class="{ 'pill--active': month === viewMonth }"
              @click="viewMonth = month"
            >
              {{ month }}
            </button>
          </div>
        </nav>

        <h3 class="archive__current">{{ viewMonth }} de {{ viewYear }}</h3>
        <ul class="grid">
          <li v-for="issue in issues" :key="issue">
            <IssueCard :id="issue" :month="viewMonth" :year="viewYear" />
          </li>
        </ul>

        <p class="archive__note">
          Los números publicados entre diciembre de 1996 y 2009 están
          disponibles en el
          <a :href="OLD_ARCHIVE_URL">archivo histórico en formato HTML</a>.
        </p>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import IssueCard from './IssueCard.vue'
import { OLD_ARCHIVE_URL } from '../composables/useIssues.js'

const props = defineProps({
  items: { type: Object, required: true },
  loading: { type: Boolean, default: false },
})

const viewYear = ref(null)
const viewMonth = ref(null)

const years = computed(() => Object.keys(props.items).reverse())

const months = computed(() =>
  viewYear.value ? Object.keys(props.items[viewYear.value]) : []
)

const issues = computed(() =>
  viewYear.value && viewMonth.value
    ? props.items[viewYear.value][viewMonth.value]
    : []
)

function selectYear(year) {
  viewYear.value = year
  viewMonth.value = Object.keys(props.items[year])[0]
}

watch(
  years,
  (value) => {
    if (value.length && !viewYear.value) selectYear(value[0])
  },
  { immediate: true }
)
</script>

<style scoped>
.archive {
  padding-block: var(--space-7);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.archive__title {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-5);
  text-align: center;
}

.archive__nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
}

.pills--scroll {
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow-x: auto;
  padding-block: var(--space-1);
  padding-inline: var(--space-1);
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 500;
  white-space: nowrap;
  text-decoration: none;
  transition:
    background-color var(--duration) var(--ease),
    color var(--duration) var(--ease),
    border-color var(--duration) var(--ease);
  touch-action: manipulation;
}

.pill:hover {
  border-color: var(--color-primary);
  color: var(--color-link);
}

.pill--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-on-primary);
}

.pill--active:hover {
  color: var(--color-on-primary);
}

.pill--link .icon {
  width: 1em;
  height: 1em;
}

.archive__current {
  font-size: var(--text-xl);
  text-align: center;
  margin-bottom: var(--space-5);
}

.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--space-4);
  justify-items: center;
}

.sk-pill {
  width: 4.5rem;
  height: 44px;
  border-radius: var(--radius-pill);
  flex-shrink: 0;
}

.sk-card {
  width: 100%;
  max-width: 240px;
  aspect-ratio: 423 / 680;
}

.archive__note {
  margin-top: var(--space-6);
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-family: var(--font-ui);
}

@media (min-width: 768px) {
  .pills--scroll {
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: visible;
  }

  .grid {
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
    gap: var(--space-5);
  }
}
</style>
