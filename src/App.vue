<template>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <AppHeader />
  <main id="contenido">
    <div v-if="error" class="container error-panel">
      <h2>No se ha podido cargar la lista de revistas</h2>
      <p>Compruebe su conexión a internet e inténtelo de nuevo.</p>
      <button class="btn btn--primary" type="button" @click="load">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
        </svg>
        Reintentar
      </button>
    </div>
    <template v-else>
      <HeroIssue
        :latest="latest"
        :loading="loading"
        @subscribe="openSubscribe"
      />
      <ArchiveSection :items="items" :loading="loading" />
    </template>
  </main>
  <AppFooter @subscribe="openSubscribe" />
  <SubscribeDialog ref="subscribeDialog" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import HeroIssue from './components/HeroIssue.vue'
import ArchiveSection from './components/ArchiveSection.vue'
import AppFooter from './components/AppFooter.vue'
import SubscribeDialog from './components/SubscribeDialog.vue'
import { useIssues } from './composables/useIssues.js'

const { items, loading, error, latest, load } = useIssues()

const subscribeDialog = ref(null)

function openSubscribe() {
  subscribeDialog.value.open()
}

onMounted(load)
</script>

<style scoped>
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  z-index: 100;
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  color: var(--color-link);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  box-shadow: var(--shadow-md);
}

.skip-link:focus-visible {
  top: 0;
}

.error-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
  padding-block: var(--space-8);
}
</style>
