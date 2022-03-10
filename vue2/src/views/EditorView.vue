<template>
  <div>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
export default {
  name: "EditorView",
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        language: 'zh-cn',
        ckfinder: {
          uploadUrl: 'http://localhost:8080/upload',
        },
      }
    };
  },
}
</script>

<style scoped>

</style>