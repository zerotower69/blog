<template>
  <Select
    v-model:value="selected"
    :options="options"
    allow-clear
    placehodler="请选择分类"
    @popup-scroll="handleScroll"
  />
</template>
<script setup lang="ts">
  import { ref, reactive, watch, onMounted, computed } from 'vue';
  import { Select } from 'ant-design-vue';
  import { getClassListApi } from '@/api/blog/classes';

  const props = defineProps({
    value: {
      type: Array as PropType<number[]>,
    },
  });
  const emits = defineEmits(['update:value']);
  //@ts-ignore
  const selected = computed<number>({
    set(val: number) {
      emits('update:value', !val ? [] : [val]);
    },
    get() {
      return props?.value?.[0] ?? '';
    },
  });
  const options = ref<{ label: string; value: string; disabled: boolean }[]>([]);
  const loadState = reactive({
    loadingMore: false,
    name: '',
    page: 0,
  });
  watch(
    () => loadState.name,
    () => {
      loadState.page = 0;
      options.value.length = 0;
    },
  );
  function getOptions() {
    loadState.page++;
    loadState.loadingMore = true;
    getClassListApi({
      pageSize: 12,
      page: loadState.page,
      name: loadState.name,
    }).then((res: Recordable) => {
      const items = res?.items ?? [];
      options.value.push(
        ...items.map((item) => ({ label: item.name, value: item.id, disabled: false })),
      );
    });
  }
  onMounted(() => {
    getOptions();
  });
  function handleScroll(event: Event) {
    const target = event.target as HTMLElement;
    if (!loadState.loadingMore && target.scrollHeight - target.scrollTop <= target.clientHeight) {
      getOptions();
    }
  }
</script>

<style scoped lang="less"></style>
