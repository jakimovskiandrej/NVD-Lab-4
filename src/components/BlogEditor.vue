<template>
  <div>
    <h2>Create a New Blog</h2>

    <div>
      <label for="title">Title:</label>
      <input v-model="title" type="text" id="title" placeholder="Enter blog title" />
    </div>

    <div>
      <label for="author">Author:</label>
      <input v-model="author" type="text" id="author" placeholder="Enter author's name" />
    </div>

    <div>
      <label for="id">Blog ID:</label>
      <input v-model="id" type="text" id="id" placeholder="Enter blog ID" />
    </div>

    <div>
      <label for="content">Content:</label>
      <textarea v-model="content" id="content" placeholder="Enter blog content"></textarea>
    </div>

    <button @click="saveBlog">Save Blog</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      author: '',
      id: '',
      content: '',
    };
  },
  methods: {
    saveBlog() {
      this.$emit('addNewItem', {
        id: this.id || Date.now(),
        title: this.title || "Untitled",
        author: this.author || "Anonymous",
        description: this.content || "No content available",
        publishDate: new Date().toISOString(),
        heroImage: "",
      });

      // Исчисти полињата
      this.title = '';
      this.author = '';
      this.id = '';
      this.content = '';
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 1rem;
}

.field label {
  margin-inline-end: 10px;
}
</style>
