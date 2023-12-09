<script setup>
const examQuestion = useState("examQuestion", () => {});
const examId = useState("examId");

onMounted(async () => {
  useState("examId", () => "2B401EC2213DA");
  await readNext();
})

</script>

<template>
  <Flex column gap="6" class="p-8" v-if="examQuestion">
    <Flex column>
      <h1 class="text-4xl">Ερώτηση #{{ examQuestion.questionIndex+1 }} ({{ examQuestion.index.id }})</h1>
      <h1 class="text-2xl">Αναγνωριστικό εξέτασης: <code>{{ examId }}</code></h1>
      <h1 class="text-2xl">Χρόνος που απομένει:</h1>
    </Flex>

    <Flex column items="center" justify="center">
      <h1 class="text-xl font-semibold pb-4">{{ examQuestion.payload.question }}</h1>

      <img v-if="examQuestion.payload.photo !== 0" :src="`https://img.comradeturtle.dev/assets/hamradio/${examQuestion.photo}.jpg`" />

      <Flex column items="center" class="w-1/4" gap="2">
        <UButton block @click="submitQuestion(index).then(() => readNext())" class="text-center" v-for="(i, index) in examQuestion.payload.options">{{ i }}</UButton>
      </Flex>
    </Flex>

    <Flex items="center" justify="center">
      <UButton class="text-center" color="red">Ακύρωση εξέτασης</UButton>
    </Flex>

  </Flex>
</template>
