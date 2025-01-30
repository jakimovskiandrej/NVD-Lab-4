import { reactive } from 'vue';

export function useListAction(initialItems = []) {
    const list = reactive([...initialItems]);

    const addItem = (item) => {
        list.push(item);
    };

    const deleteItem = (id) => {
        const index = list.findIndex(item => item.id === id);
        if (index !== -1) {
            list.splice(index, 1);
        }
    };

    return {
        list,
        addItem,
        deleteItem
    };
}
