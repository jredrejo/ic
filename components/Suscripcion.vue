<template>
  <v-layout column wrap class="mt-1 pt-1" align-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" dark v-on="on"
          >Suscribirse por correo electrónico</v-btn
        >
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Formulario de suscripción</span>
        </v-card-title>
        <v-card-text>
          <span
            >Recibirá el archivo de Iglesia en Camino en su correo electrónico
            todas las semanas en cuanto esté publicado</span
          >
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Nombre"
                  hint="No es un dato necesario"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Apellidos"
                  hint="No es un dato necesario"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Correo electrónico*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>* es un dato imprescindible</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cancelar</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Enviar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
}
</script>
