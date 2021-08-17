<template>
  <div class="container">
    <div class="row">
      <h1 class="col">Hash strings</h1>
    </div>
    
    <div class="row">

      <form class="col">

        <div class="row">
          <label class="form-label">Hash function</label>
          <div class="input-group">
            <div class="form-check" v-for="item in algorithmList" :key="item.value">
              <input type="radio" class="form-check-input" :value="item.value" v-model="hashFunction" />
              <label class="form-check-label">{{item.label}}</label>
            </div>
          </div>
        </div>

        <div class="row">
          <label for="text" class="form-label">Input text</label>
          <div class="input-group">
            <textarea id="text" class="form-control" v-model="inputText"></textarea>
          </div>
        </div>

        <div class="row">
          <label for="ausgabe">Output text</label>
          <div class="input-group">
            <input id="ausgabe" class="form-control" :readonly="true" v-model="outputText" />
          </div>
        </div>
        
      </form>
    </div>
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
