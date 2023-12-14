<script setup>
import {secondsToHMS} from "~/utils/index.js";

const examQuestion = useState("examQuestion", () => {});
const selectedType = useState("selectedType");
const nQuestions = ref();
const examId = useState("examId");
const remaining = ref();

const isLoading = ref([false, false, false, false]);
const isDisabled = ref([false, false, false, false]);

const modalState = ref(false);

switch (selectedType.value) {
  case ('SV'):
    nQuestions.value = 100;
    break;
  case ('SY'):
    nQuestions.value = 100;
    break;
  case ('SVcatA'):
    nQuestions.value = 50;
    break;
  case ('SYcatA'):
    nQuestions.value = 80;
    break;
}

onMounted(async () => {
  if (!examId.value) navigateTo('/');
  readNext().then(() => {
    if ((examQuestion.value.status && examQuestion.value.status === 'complete') || examQuestion.value.questionIndex === nQuestions-1) navigateTo('/result');

    const delta = 7200000 - (Date.now() - parseInt(examQuestion.value.time));
    remaining.value = secondsToHMS(Math.round(delta / 1000));

    setInterval(() => {
      const delta = 7200000 - (Date.now() - parseInt(examQuestion.value.time));
      remaining.value = secondsToHMS(Math.round(delta / 1000));
    })
  })
})
</script>

<template>
  <Flex column gap="6" class="p-8" v-if="examQuestion">
    <Flex column>
      <h1 class="text-4xl">Ερώτηση #{{ examQuestion.questionIndex+1 }}/{{ nQuestions }} ({{ examQuestion.index.id }})</h1>
      <h1 class="text-2xl">Αναγνωριστικό εξέτασης: <code>{{ examId }}</code></h1>
      <h1 class="text-2xl">Χρόνος που απομένει: <span v-if="remaining">{{ remaining }}</span></h1>
    </Flex>

    <Flex column items="center" justify="center" gap="2">
      <h1 class="text-xl text-center font-semibold pb-4">{{ examQuestion.payload.question }}</h1>

      <NuxtImg v-if="examQuestion.payload.photo !== '0'" class="rounded" :src="`https://img.comradeturtle.dev/assets/hamradio/${examQuestion.payload.photo}.jpg`" />

      <Flex column items="center" class="md:w-1/4 w-4/5" gap="2">
        <UButton block @click="isLoading[index] = true; isDisabled = [true, true, true, true]; submitQuestion(index).then(() => readNext().then(() => {isLoading = [false, false, false, false]; isDisabled = [false, false, false, false]; if (examQuestion.status === 'complete') navigateTo('/result')}))" class="text-center" :loading="isLoading[index]" :disabled="isDisabled[index]" v-for="(i, index) in examQuestion.payload.options">{{ i }}</UButton>
      </Flex>
    </Flex>

    <Flex items="center" justify="center">
      <UButton class="text-center" @click="modalState = true;" color="red">Ακύρωση εξέτασης</UButton>

      <UModal v-model="modalState">
        <Flex column gap="6" class="p-4" items="center" justify="center">
          <h1 class="text-xl font-semibold text-red-400 text-center">Παρακαλώ επιβεβαιώστε την ακύρωση της εξέτασης</h1>

          <UButton class="text-center" @click="navigateTo('/')" color="red">Ακύρωση εξέτασης</UButton>
          <UButton class="text-center" @click="modalState = false;">Παραμονή στην εξέταση</UButton>

        </Flex>
      </UModal>
    </Flex>

  </Flex>
</template>
