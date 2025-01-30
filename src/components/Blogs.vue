<template>
  <div>
    <div class="search-container">
      <label for="search" class="search-label">Search:</label>
      <input
          type="text"
          id="search"
          v-model="searchTerm"
          placeholder="Enter search term..."
          class="search-input"
      />
    </div>

    <fieldset class="filter-container">
      <legend>Filter By:</legend>
      <div>
        <input
            type="checkbox"
            id="title"
            v-model="filters"
            value="title"
        />
        <label for="title">By Title</label>
      </div>
      <div>
        <input
            type="checkbox"
            id="description"
            v-model="filters"
            value="description"
        />
        <label for="description">By Content</label>
      </div>
    </fieldset>

    <div v-if="isLoading" class="loading">
      <p>Loading blogs...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Error: {{ error.message }}</p>
    </div>

    <div v-else>
      <h2>Blog List</h2>
      <div class="blogs-container">
        <div v-for="blog in filteredBlogs" :key="blog.id" class="blog-item">
          <img v-if="blog.heroImage" :src="blog.heroImage" :alt="blog.title" class="blog-image" />

          <div class="blog-content">
            <p class="blog-date">{{ new Date(blog.publishDate).toLocaleDateString() }}</p>
            <h3>{{ blog.title }}</h3>
            <p class="blog-author"><strong>By:</strong> {{ blog.author }}</p>
            <p>{{ blog.description }}</p>
          </div>

          <button @click="deleteBlog(blog.id)" class="remove-button">✖</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useSearch } from '../composables/useSearch';

export default {
  props: {
    blogs: {
      type: Array,
      default: () => [],
    },
    isLoading: Boolean,
    error: Object,
  },
  setup(props, { emit }) {
    const searchTerm = ref('');
    const filters = ref(['title']);
    const { filteredItems } = useSearch(props.blogs, filters);

    const filteredBlogs = computed(() => filteredItems(searchTerm.value));

    const deleteBlog = (id) => {
      emit('deleteBlog', id);
    };

    return {
      searchTerm,
      filters,
      filteredBlogs,
      deleteBlog,
    };
  },
};
</script>

<style scoped>
.blogs-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;
  margin: 2rem auto;
}

.blog-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  gap: 1rem;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.blog-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.blog-content {
  flex: 1;
}

.blog-item h3 {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  color: #000;
}

.blog-item p {
  font-size: 0.85rem;
  color: #000;
  margin-bottom: 0.3rem;
}

.blog-date {
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  font-weight: bold;
}

.remove-button {
  background-color: transparent;
  color: #777;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
}

.remove-button:hover {
  color: red;
}
</style>
