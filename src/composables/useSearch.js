import { computed } from 'vue';

export function useSearch(blogs, filters) {
    return {
        filteredItems: (searchTerm) => {
            if (!searchTerm) return blogs;
            return blogs.filter(blog =>
                filters.value.some(filter =>
                    blog[filter]?.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    };
}
