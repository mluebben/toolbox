<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <h3>Tools</h3>
    
    <div>
      <label>Eingabe</label>
      <input type="radio" id="eingabe" value="text" v-model="inputType"/> <label for="eingabe">Text</label>
      <input type="radio" id="file" value="file" v-model="inputType"/> <label for="file">Datei</label>

      <textarea v-model="textIn"></textarea>
      <label>Datei</label>
      <input type="file" @change="fileSelected">
    </div>
    <div>
      <label>Ausgabe</label>
      <textarea v-model="textOut"></textarea>
    </div>

    <button @click="encode">Encode Base64</button>
    <button @click="decode">Decode Base64</button>


    <select v-model="algorithm">
      <option v-for="item in algorithmList" :key="item.value" :value="item.value">{{item.label}}</option>
    </select>
    <button @click="hash">Hash</button>

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
    }
  },
  data() {
    return {
      inputType: 'text',
      textIn: '',
      textOut: '',
      algorithm: 'sha256',
      files: null
    }
  },
  methods: {
    encode() {
      this.textOut = btoa(this.textIn)
    },
    decode() {
      this.textIn = atob(this.textOut)
    },


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
    fileSelected(event) {
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
