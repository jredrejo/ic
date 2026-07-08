<template>
  <a
    class="card"
    :href="pdfUrl(id)"
    target="_blank"
    rel="noopener"
    :aria-label="`Número ${issueNumber(id)}, ${issueDate(id, month, year)} (PDF)`"
  >
    <img
      class="card__cover"
      :src="coverUrl(id)"
      :alt="`Portada del número ${issueNumber(id)}`"
      width="423"
      height="600"
      loading="lazy"
    />
    <span class="card__caption">
      <span class="card__number">Nº {{ issueNumber(id) }}</span>
      <span class="card__date">{{ issueDate(id, month, year) }}</span>
    </span>
  </a>
</template>

<script setup>
import { coverUrl, issueDate, issueNumber, pdfUrl } from '../composables/useIssues.js'

defineProps({
  id: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: String, required: true },
})
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 240px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  color: var(--color-text);
  transition:
    transform var(--duration) var(--ease),
    box-shadow var(--duration) var(--ease);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.card:active {
  transform: translateY(-1px);
}

.card__cover {
  width: 100%;
  height: auto;
  aspect-ratio: 423 / 600;
  object-fit: cover;
  background-color: var(--color-surface-2);
  border-bottom: 1px solid var(--color-border);
}

.card__caption {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--space-3);
}

.card__number {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-heading);
}

.card__date {
  font-family: var(--font-ui);
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}
</style>
