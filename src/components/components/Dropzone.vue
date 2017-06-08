<template>
  <!-- DROPZONE -->
  <div @dragover.stop.prevent @drop.stop.prevent="handleFileSelect" style="border:2px solid grey;min-height:100px;"
       class="dropzone-container">
    <div v-show="items.length === 0">Drop images here</div>
    <div v-for="item in items" class="img-dropzone">
      <img :src="item.src">
    </div>
  </div>
  <!-- -->
</template>
<script>
  export default{
    data() {
      return {
        items: [],
      };
    },
    methods: {
      handleFileSelect(evt) { // eslint-disable-line no-shadow
        // let result = this.$refs.dropzone;
        const files = evt.dataTransfer.files; // FileList object.

        // files is a FileList of File objects. List some properties.

        Array.from(files).forEach((f, i) => { // eslint-disable-line no-unused-vars
          const file = f;
          const start = 0;
          const stop = f.size - 1;
          const reader = new FileReader();
          // If we use onloadend, we need to check the readyState.
          reader.onloadend = (evt) => { // eslint-disable-line no-shadow
            if (evt.target.readyState === FileReader.DONE) { // DONE == 2
              this.items.push(
                {
                  name: file.name,
                  size: file.size,
                  src: 'data:image/jpeg;base64,' + btoa(evt.target.result), // eslint-disable-line prefer-template
                  formattedSrc: btoa(evt.target.result.replace(/^(.+,)/, '')), // eslint-disable-line prefer-template
                  content: evt.target.result,
                },
              );
              if (file.type.match(/(image)/)) {
                const div = document.createElement('div');

                const a = document.createElement('a');
                const img = document.createElement('img');

                div.style.display = 'inline-block';
                div.style.width = '300px';
                div.style.verticalAlign = 'top';
                img.style.width = '90%';
                a.textContent = 'X';
                a.setAttribute('href', '#');
                a.style.float = 'right';
              }
            }
          };
          const blob = f.slice(start, stop + 1);
          reader.readAsBinaryString(blob);
        });

        this.$emit('fileContent', this.items);
      },
    },
  };


</script>
<style>
    .dropzone-container {
        display: flex;
        flex-wrap: wrap;
    }
    .img-dropzone {
        width: calc(100% / 3);
    }
    .img-dropzone img {
        width: 100%;
    }


</style>