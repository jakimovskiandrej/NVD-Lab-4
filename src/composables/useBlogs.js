import { ref, onMounted } from 'vue';
import { useListAction } from './useListAction';
import {createClient} from 'contentful';
const clientContentful = createClient({
    space: "hpr0uushokd4",
    accessToken: "jwEHepvQx-kMtO7_2ldjhE4WMAsiDp3t1xxBT8aDp7U",
});
export function useBlogs() {

    const blogs = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const { list, addItem, deleteItem } = useListAction(blogs.value);

    const fetchBlogs = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await clientContentful.getEntries({
                content_type: 'blogPost',
                order: '-fields.publishDate',
            });

            blogs.value = response.items.map(item => ({
                id: item.fields.slug,
                title: item.fields.title,
                description: item.fields.description,
                heroImage: item.fields.heroImage?.fields?.file?.url || '',
                publishDate: item.fields.publishDate,
            }));

            list.splice(0, list.length, ...blogs.value);
        } catch (err) {
            error.value = 'Failed to fetch blogs: ' + err.message;
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchBlogs();
    });

    return {
        blogs: list,
        loading,
        error,
        addItem,
        deleteItem,
    };
}
