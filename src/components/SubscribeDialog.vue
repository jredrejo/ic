<template>
  <dialog ref="dialogEl" class="dialog" @close="reset" @click="onBackdropClick">
    <div class="dialog__body">
      <header class="dialog__header">
        <h2 class="dialog__title">Suscripción por correo</h2>
        <button
          class="dialog__close"
          type="button"
          aria-label="Cerrar"
          @click="close"
        >
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div v-if="status === 'success'" class="dialog__success" role="status">
        <svg class="icon dialog__success-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m8 12.5 3 3 5-6" />
        </svg>
        <p>
          <strong>Suscripción realizada.</strong> Recibirá Iglesia en Camino en
          su correo cada semana, en cuanto se publique.
        </p>
        <button class="btn btn--primary" type="button" @click="close">
          Cerrar
        </button>
      </div>

      <form v-else novalidate @submit.prevent="submit">
        <p class="dialog__intro">
          Recibirá el archivo PDF de Iglesia en Camino en su correo electrónico
          todas las semanas en cuanto esté publicado.
        </p>

        <div class="field-row">
          <div class="field">
            <label for="sus-nombre">Nombre <small>(opcional)</small></label>
            <input
              id="sus-nombre"
              v-model.trim="name"
              type="text"
              autocomplete="given-name"
            />
          </div>
          <div class="field">
            <label for="sus-apellidos">Apellidos <small>(opcional)</small></label>
            <input
              id="sus-apellidos"
              v-model.trim="surname"
              type="text"
              autocomplete="family-name"
            />
          </div>
        </div>

        <div class="field">
          <label for="sus-email">Correo electrónico *</label>
          <input
            id="sus-email"
            v-model.trim="email"
            type="email"
            required
            autocomplete="email"
            :aria-invalid="Boolean(emailError)"
            aria-describedby="sus-email-error"
            @blur="validateEmail"
          />
          <p v-if="emailError" id="sus-email-error" class="field__error" role="alert">
            {{ emailError }}
          </p>
        </div>

        <p v-if="status === 'error'" class="dialog__error" role="alert">
          No se ha podido completar la suscripción. Inténtelo de nuevo en unos
          minutos.
        </p>

        <div class="dialog__actions">
          <button class="btn btn--outline" type="button" @click="close">
            Cancelar
          </button>
          <button
            class="btn btn--primary"
            type="submit"
            :disabled="status === 'sending'"
          >
            <span v-if="status === 'sending'" class="spinner" aria-hidden="true"></span>
            {{ status === 'sending' ? 'Enviando…' : 'Suscribirme' }}
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'

const SUBSCRIBE_URL =
  'https://www.meridabadajoz.net/wp-json/newsletter/v1/subscribe'

const dialogEl = ref(null)
const name = ref('')
const surname = ref('')
const email = ref('')
const emailError = ref('')
const status = ref('idle')

function open() {
  dialogEl.value.showModal()
}

function close() {
  dialogEl.value.close()
}

function reset() {
  status.value = 'idle'
  emailError.value = ''
}

function onBackdropClick(event) {
  if (event.target === dialogEl.value) close()
}

function validateEmail() {
  if (!email.value) {
    emailError.value = 'El correo electrónico es obligatorio'
  } else if (!/.+@.+\..+/.test(email.value)) {
    emailError.value = 'Debe usar un correo electrónico válido'
  } else {
    emailError.value = ''
  }
  return !emailError.value
}

async function submit() {
  if (!validateEmail()) {
    document.getElementById('sus-email').focus()
    return
  }
  status.value = 'sending'
  try {
    const response = await fetch(SUBSCRIBE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        surname: surname.value,
        email: email.value,
      }),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}

defineExpose({ open })
</script>

<style scoped>
.dialog {
  width: min(34rem, calc(100vw - 2rem));
  border: none;
  border-radius: var(--radius-lg);
  padding: 0;
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-lg);
}

.dialog::backdrop {
  background: var(--scrim);
}

.dialog__body {
  padding: var(--space-5);
}

.dialog__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.dialog__title {
  font-size: var(--text-xl);
}

.dialog__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: -6px -6px 0 0;
  border: none;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text-muted);
  transition: background-color var(--duration) var(--ease);
}

.dialog__close:hover {
  background: var(--color-surface-2);
}

.dialog__intro {
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.field-row {
  display: grid;
  gap: var(--space-3);
}

@media (min-width: 480px) {
  .field-row {
    grid-template-columns: 1fr 1fr;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin-bottom: var(--space-3);
}

.field label {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: 600;
}

.field label small {
  font-weight: 400;
  color: var(--color-text-muted);
}

.field input {
  min-height: 48px;
  padding: var(--space-2) var(--space-3);
  font: inherit;
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.field input:focus-visible {
  outline: 3px solid var(--color-ring);
  outline-offset: 0;
  border-color: transparent;
}

.field input[aria-invalid='true'] {
  border-color: var(--color-error);
}

.field__error,
.dialog__error {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-error);
}

.dialog__error {
  margin-bottom: var(--space-3);
}

.dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.dialog__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
  padding-block: var(--space-4);
}

.dialog__success-icon {
  width: 3rem;
  height: 3rem;
  color: var(--color-success);
}

.spinner {
  width: 1.1em;
  height: 1.1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
