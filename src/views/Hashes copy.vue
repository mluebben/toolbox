<template>
  <div class="container">
    <div class="row">
      <h1 class="col">Hash tools</h1>
    </div>
    
    <div class="row">

      <form class="col">

        <div class="row">
          <label class="form-label">Function</label>
          <div class="input-group">
            <div class="form-check" v-for="algorithmx in algorithmList" :key="algorithmx.value">
              <input type="radio" class="form-check-input" :value="algorithmx.value" v-model="algorithm" />
              <label class="form-check-label">{{algorithmx.label}}</label>
            </div>
            
          </div>
        </div>

        <div class="row">
          <label for="text" class="form-label">Eingabe</label>
          <div class="input-group">
            <div class="input-group-text">
              <input class="form-check-input mt-0" type="radio" value="text" v-model="inputType" />
            </div>
            <textarea id="text" class="form-control" v-model="textIn"></textarea>
          </div>
        </div>

      
        <div class="row">
          <label for="file">Datei</label>
          <div class="input-group">
            <div class="input-group-text">
              <input class="form-check-input mt-0" type="radio" value="file" v-model="inputType" />
            </div>
            <input id="file" type="file" class="form-control" @change="onFileChanged" />
          </div>
        </div>

        <div class="row">
          <div class="input-group col">
            <select v-model="algorithm" class="form-select">
              <option v-for="item in algorithmList" :key="item.value" :value="item.value">{{item.label}}</option>
            </select>      
            <button class="btn btn-primary" type="button" id="hash" @click="hash">Hash</button>
          </div>
        </div>

        <div class="row">
          <label for="ausgabe">Ausgabe</label>
          <div class="input-group">
            <input id="ausgabe" class="form-control" v-model="outputText" />
          </div>
        </div>

        <div class="row">
          <label for="verify">Verify</label>
          <div class="input-group">
            <input id="verify" class="form-control" v-model="textVerify" />
            <span class="input-group-text" id="verify-addon">{{verifyResult}}</span>
          </div>
        </div>

        
      </form>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'



export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    algorithmList() {
      return [
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
      ]
    },
    cryptoJsAlgorithm() {
      return this.algorithmList.find(o => o.value == this.algorithm).algorithm
    },
    outputText() {
      const cryptoJsAlgorithm = this.cryptoJsAlgorithm
      if (!cryptoJsAlgorithm) {
        console.error('No algorithm selected')
        return
      }

      return this.hashString(this.textIn, cryptoJsAlgorithm)
    },
    verifyResult() {
      const ok = this.textOut === this.textVerify
      return ok ? 'OK' : 'DIFF'
    }
  },
  data() {
    return {
      inputType: 'text',
      textIn: '',
      textOut: '',
      algorithm: 'sha256',
      files: null,
      textVerify: ''
    }
  },
  watch: {
    textIn() {
      this.inputType = 'text'
    }
  },
  methods: {
    async hash() {

      let input = null
      if (this.inputType == 'text') {
        input = new Blob([this.textIn])
      }

      if (this.inputType == 'file') {
        input = this.files[0]
      }

      const cryptoJsAlgorithm = this.cryptoJsAlgorithm
      if (!cryptoJsAlgorithm) {
        console.error('No algorithm selected')
        return
      }

      this.textOut = await this.hashFile(input, cryptoJsAlgorithm)
    },
    onFileChanged(event) {
      const files = event.target.files
      this.files = files
      console.log("fileSelected: ", files)

      this.inputType = 'file'
    },
    hashString(text, algorithm) {
      const hash = algorithm(text)
      return hash.toString(CryptoJS.enc.Hex)
    },
    hashFile(blob, algorithm) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result
          const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer)
          const hash = algorithm(wordArray)
          resolve(hash.toString(CryptoJS.enc.Hex))
        }
        reader.onerror = () => {
          reject("Error")
        }
        reader.readAsArrayBuffer(blob)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
