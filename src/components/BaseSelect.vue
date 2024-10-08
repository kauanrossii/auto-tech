<template>
  <v-select
    :items="items"
    v-model="internalValue"
    :item-props="true"
    persistent-hint
    :hint="hintSelectedValue"
    :variant="variant"
    :label="label"
  ></v-select>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import IBaseDisplayEnum from "../data/components/IBaseDisplayEnum";

const props = defineProps<{
  modelValue: string;
  readonly: boolean;
  variant:
    | "outlined"
    | "plain"
    | "filled"
    | "underlined"
    | "solo"
    | "solo-inverted"
    | "solo-filled"
    | undefined;
  label: string;
  items: IBaseDisplayEnum[];
}>();

const emit = defineEmits(["update:modelValue"]);

const internalValue = ref(props.modelValue);

const hintSelectedValue = computed(() => {
  const enumValue = props.items.find(
    (item) => item.value == internalValue.value
  );
  return enumValue ? enumValue.subtitle : "";
});

watch(internalValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
