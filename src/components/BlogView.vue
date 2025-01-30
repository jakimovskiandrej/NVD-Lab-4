<template>
  <div class="blog-view">
    <button v-if="!showEditor" @click="toggleEditor">Add New Blog</button>

    <BlogEditor v-if="showEditor" @addNewItem="addNewBlog" />

    <Blogs
        :blogs="blogs"
        :isLoading="isLoading"
        :error="error"
        @deleteBlog="deleteBlog"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import BlogEditor from './BlogEditor.vue';
import Blogs from './Blogs.vue';
import {useBlogs} from '../composables/useBlogs';

export default {
  components: {
    BlogEditor,
    Blogs,
  },
  setup() {
    const { blogs, isLoading, error, deleteItem, addItem } = useBlogs();
    const showEditor = ref(false);

    const addNewBlog = (newBlog) => {
      addItem(newBlog);
      showEditor.value = false;
    };

    const deleteBlog = (id) => {
      deleteItem(id);
    };

    const toggleEditor = () => {
      showEditor.value = !showEditor.value;
    };

    return {
      blogs,
      isLoading,
      error,
      showEditor,
      addNewBlog,
      deleteBlog,
      toggleEditor,
    };
  },
};
</script>

<style scoped>
.blog-view {
  padding: 2rem;
}

.blog-view h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.blog-view button {
  padding: 0.7rem 1.5rem;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.blog-view button:hover {
  background-color: #0056b3;
}
</style>
