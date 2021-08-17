<template>
  <div class="container">
    <div class="row">
      <h1 class="col">Hash files</h1>
    </div>
    
    <div class="row">

      <form class="col">

        <div class="row">
          <label class="form-label">Function</label>
          <div class="input-group">
            <div class="form-check" v-for="item in algorithmList" :key="item.value">
              <input type="radio" class="form-check-input" :value="item.value" v-model="hashFunction" />
              <label class="form-check-label">{{item.label}}</label>
            </div>
            
          </div>
        </div>
        
        <div class="row">
          <label for="file">Input file</label>
          <div class="input-group">
            <input id="file" type="file" class="form-control" @change="onFileChanged" />
          </div>
        </div>

        <div class="row">
          <div class="input-group">
            <button type="button" class="btn btn-primary" @click="hash">Hash</button>
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
      outputText: '',
      files: null
    }
  },

  computed: {
    cryptoJsAlgorithm() {
      return this.algorithmList.find(o => o.value == this.hashFunction).algorithm
    }
  },

  methods: {
    async hash() {
      
      const inputFile = this.files[0]
      if (!inputFile) {
        console.error('No input file selected')
        return
      }

      const cryptoJsAlgorithm = this.cryptoJsAlgorithm
      if (!cryptoJsAlgorithm) {
        console.error('No algorithm selected')
        return
      }

      this.outputText = await this.hashFile(inputFile, cryptoJsAlgorithm)
    },

    onFileChanged(event) {
      const files = event.target.files
      this.files = files
      console.log("fileSelected: ", files)

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

<style scoped>

</style>
