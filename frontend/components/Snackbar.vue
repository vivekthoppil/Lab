<template>
  <v-snackbar v-model="show">
    {{ message }}
    <v-btn @click.native="show = false" flat color="accent">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: ''
    }
  },
  created() {
    this.$store.watch(
      (state) => state.snackbar.snack,
      () => {
        let msg = this.$store.state.snackbar.snack
        if (msg !== '') {
          if (Array.isArray(msg)) {
            msg = msg.reduce((a, b) => `${a}\n${b}`)
          }
          this.show = true
          this.message = msg
          this.$store.commit('snackbar/setSnack', '')
        }
      }
    )
  }
}
</script>
