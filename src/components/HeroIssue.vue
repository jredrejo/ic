<template>
  <section class="hero" aria-labelledby="hero-titulo">
    <div class="container hero__inner">
      <template v-if="loading">
        <div class="hero__meta">
          <div class="skeleton sk-line" style="width: 40%"></div>
          <div class="skeleton sk-title"></div>
          <div class="skeleton sk-line" style="width: 60%"></div>
        </div>
        <div class="skeleton hero__cover-skeleton"></div>
      </template>
      <template v-else-if="latest">
        <div class="hero__meta">
          <p class="eyebrow">Último número</p>
          <h2 id="hero-titulo" class="hero__title">
            Número {{ issueNumber(latest.id) }}
          </h2>
          <p class="hero__date">
            {{ issueDate(latest.id, latest.month, latest.year) }}
          </p>
          <p class="hero__lead">
            Lea o descargue gratis el semanario de esta semana en formato PDF,
            o recíbalo cada semana en su correo electrónico.
          </p>
          <div class="hero__actions">
            <a
              class="btn btn--primary"
              :href="pdfUrl(latest.id)"
              target="_blank"
              rel="noopener"
            >
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Leer en PDF
            </a>
            <button
              class="btn btn--outline"
              type="button"
              @click="$emit('subscribe')"
            >
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 6L2 7" />
              </svg>
              Suscribirse
            </button>
          </div>
        </div>
        <a
          class="hero__cover-link"
          :href="pdfUrl(latest.id)"
          target="_blank"
          rel="noopener"
          :aria-label="`Abrir el número ${issueNumber(latest.id)} en PDF`"
        >
          <img
            class="hero__cover"
            :src="coverUrl(latest.id)"
            :alt="`Portada del número ${issueNumber(latest.id)}, ${issueDate(latest.id, latest.month, latest.year)}`"
            width="423"
            height="600"
            fetchpriority="high"
          />
        </a>
      </template>
    </div>
  </section>
</template>

<script setup>
import { coverUrl, issueDate, issueNumber, pdfUrl } from '../composables/useIssues.js'

defineProps({
  latest: { type: Object, default: null },
  loading: { type: Boolean, default: false },
})

defineEmits(['subscribe'])
</script>

<style scoped>
.hero {
  padding-block: var(--space-6) var(--space-7);
  background:
    radial-gradient(
      60rem 30rem at 85% -10%,
      color-mix(in srgb, var(--oro) 12%, transparent),
      transparent 70%
    ),
    var(--color-bg);
}

.hero__inner {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: var(--space-6);
}

.hero__meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: center;
  text-align: center;
  max-width: 34rem;
  width: 100%;
}

.hero__title {
  font-size: var(--text-3xl);
}

.hero__date {
  font-size: var(--text-xl);
  font-style: italic;
  color: var(--color-text-muted);
}

.hero__lead {
  color: var(--color-text-muted);
  max-width: 45ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.hero__cover-link {
  display: block;
  border-radius: var(--radius-md);
}

.hero__cover {
  width: min(320px, 78vw);
  height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  transition: transform var(--duration) var(--ease);
  background-color: var(--color-surface);
}

.hero__cover-link:hover .hero__cover {
  transform: translateY(-6px) scale(1.015);
}

.hero__cover-skeleton {
  width: min(320px, 78vw);
  aspect-ratio: 423 / 600;
}

.sk-line {
  height: 1.1rem;
  width: 100%;
}

.sk-title {
  height: 3rem;
  width: 75%;
}

@media (min-width: 900px) {
  .hero__inner {
    flex-direction: row;
    justify-content: space-between;
  }

  .hero__meta {
    align-items: flex-start;
    text-align: left;
  }

  .hero__actions {
    justify-content: flex-start;
  }
}
</style>
