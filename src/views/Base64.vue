<template>
  <div>
    
    <h3>Base64 tools</h3>

    <div>
      <label class="form-label">Plain text</label>
      <textarea class="form-control" v-model="plainText"></textarea>
    </div>
    <div>
      <label class="form-label">Encoded text</label>
      <textarea class="form-control" v-model="encodedText"></textarea>
    </div>

    <div class="row">
      <div class="input-group">
        <button type="button" class="btn btn-primary" @click="encode">Encode Base64</button>
        <button type="button" class="btn btn-primary" @click="decode">Decode Base64</button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {      
      plainText: '',
      encodedText: ''
    }
  },
  methods: {
    encode() {
      this.encodedText = btoa(this.plainText)
    },
    decode() {
      this.plainText = atob(this.encodedText)
    }
  }
}
</script>

<style scoped>

</style>
