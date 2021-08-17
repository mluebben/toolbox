<template>
  <div class="container">
    <div class="row">
      <h1 class="col">Hash tools</h1>
    </div>
    
    <h2>Strings</h2>
    <router-link to="/hashstrings">Hash strings</router-link>

    <h2>Files</h2>
    <router-link to="/hashfiles">Hash files</router-link>

  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  data() {
    return {
      algorithmList: [
        {
          value: 'md5',
          label: 'MD5',
          algorithm: CryptoJS.MD5
        },
        {
          value: 'sha1',
          label: 'SHA1',
          algorithm: CryptoJS.SHA1
        },
        {
          value: 'sha224',
          label: 'SHA224',
          algorithm: CryptoJS.SHA224
        },
        {
          value: 'sha256',
          label: 'SHA256',
          algorithm: CryptoJS.SHA256
        },
        {
          value: 'sha384',
          label: 'SHA384',
          algorithm: CryptoJS.SHA384
        },
        {
          value: 'sha512',
          label: 'SHA512',
          algorithm: CryptoJS.SHA512
        }
      ],
      hashFunction: 'sha256',
      inputText: ''
    }
  },
  computed: {
    hashAlgorithm() {
      return this.algorithmList.find(o => o.value == this.hashFunction).algorithm
    },
    outputText() {
      const hashAlgorithm = this.hashAlgorithm
      
      const arrayBuffer = new TextEncoder().encode(this.inputText);
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer)
      const hash = hashAlgorithm(wordArray)

      return hash.toString(CryptoJS.enc.Hex)
    }
  }
}
</script>

<style scoped>

</style>
