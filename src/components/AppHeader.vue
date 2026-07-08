<template>
  <header class="header">
    <div class="container header__inner">
      <!-- eslint-disable-next-line vue/no-v-html -- SVG local estático, sin datos externos -->
      <span class="header__sello" aria-hidden="true" v-html="sello"></span>
      <div class="header__titles">
        <p class="header__eyebrow">Archidiócesis de Mérida-Badajoz</p>
        <h1 class="header__title">Iglesia en Camino</h1>
        <p class="header__subtitle">Semanario diocesano · España</p>
      </div>
    </div>
  </header>
</template>

<script setup>
import sello from '../assets/logo-sello.svg?raw'
</script>

<style scoped>
.header {
  background: linear-gradient(160deg, var(--burdeos) 0%, var(--burdeos-oscuro) 100%);
  color: #fff;
  padding-block: var(--space-5);
  border-bottom: 4px solid var(--oro);
}

.header__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  text-align: center;
}

.header__sello {
  display: block;
  width: 72px;
  height: 72px;
  color: #fff;
}

.header__sello :deep(svg) {
  width: 100%;
  height: 100%;
}

.header__eyebrow {
  font-family: var(--font-ui);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--oro-claro);
}

.header__title {
  font-size: var(--text-3xl);
  font-weight: 600;
  color: #fff;
}

.header__subtitle {
  font-style: italic;
  color: rgba(255, 255, 255, 0.85);
}

@media (min-width: 768px) {
  .header__inner {
    flex-direction: row;
    text-align: left;
    gap: var(--space-5);
  }

  .header__sello {
    width: 96px;
    height: 96px;
  }
}
</style>
