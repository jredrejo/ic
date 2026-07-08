<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <!-- eslint-disable-next-line vue/no-v-html -- SVG local estático, sin datos externos -->
        <span class="footer__logo" aria-hidden="true" v-html="logo"></span>
        <p class="footer__desc">
          Iglesia en Camino, semanario de la Archidiócesis de
          Mérida-Badajoz.<br />
          Director: Juan José Montes.
        </p>
      </div>

      <nav class="footer__links" aria-label="Enlaces del pie de página">
        <h2 class="footer__heading">Enlaces</h2>
        <ul>
          <li>
            <a :href="OLD_ARCHIVE_URL">Números antiguos (1996–2009)</a>
          </li>
          <li>
            <button class="footer__link-btn" type="button" @click="$emit('subscribe')">
              Suscribirse por correo electrónico
            </button>
          </li>
        </ul>
      </nav>

      <div class="footer__contact">
        <h2 class="footer__heading">Contacto</h2>
        <ul>
          <li>
            <a href="mailto:iglenca@meridabadajoz.es">iglenca@meridabadajoz.es</a>
          </li>
          <li>
            <a href="mailto:iglenca@archimeridabadajoz.org">
              iglenca@archimeridabadajoz.org
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logo from '../assets/logo-horizontal.svg?raw'

defineEmits(['subscribe'])
</script>

<style scoped>
.footer {
  background: var(--burdeos-oscuro);
  color: rgba(255, 255, 255, 0.88);
  padding-block: var(--space-7);
  border-top: 4px solid var(--oro);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
}

.footer__inner {
  display: grid;
  gap: var(--space-6);
}

.footer__logo {
  display: block;
  width: min(260px, 70vw);
  color: #fff;
  margin-bottom: var(--space-3);
}

.footer__logo :deep(svg) {
  width: 100%;
  height: auto;
}

.footer__desc {
  line-height: 1.7;
}

.footer__heading {
  font-family: var(--font-ui);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--oro-claro);
  margin-bottom: var(--space-3);
}

.footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer a,
.footer__link-btn {
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  transition: text-decoration-color var(--duration) var(--ease);
}

.footer__link-btn {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  text-align: left;
}

.footer a:hover,
.footer__link-btn:hover {
  text-decoration-color: var(--oro-claro);
}

.footer :focus-visible {
  outline-color: var(--oro-claro);
}

@media (min-width: 768px) {
  .footer__inner {
    grid-template-columns: 2fr 1fr 1fr;
    gap: var(--space-7);
  }
}
</style>
