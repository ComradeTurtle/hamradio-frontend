<script setup>
  const examId = useState("examId");
  const examResults = useState("examResults", () => {});
  const selectedType = useState("selectedType");
  const typeString = ref();
  const numCorrect = ref(1);
  const fracResult = ref();
  const nQuestions = ref();

  onMounted(async () => {
    if (examId.value) {
      examResults.value = await getResults(examId.value);
      selectedType.value = examResults.value.type;
      switch (selectedType.value) {
        case ('SV'):
          typeString.value = 'Κατηγορίας 1 (SV)';
          nQuestions.value = 100;
          break;
        case ('SY'):
          typeString.value = 'Εισαγωγικού Επιπέδου (SY)';
          nQuestions.value = 100;
          break;
        case ('SVcatA'):
          typeString.value = 'Κατηγορίας 1 με απαλλ. κατ. Α (SV)';
          nQuestions.value = 50;
          break;
        case ('SYcatA'):
          typeString.value = 'Εισαγωγικού Επιπέδου με απαλλ. κατ. Α (SY)';
          nQuestions.value = 80;
          break;
      }
      numCorrect.value = examResults.value.payload.filter((v) => v.correct).length;
      fracResult.value = numCorrect.value / examResults.value.payload.length;
    } else navigateTo('/');
  })
</script>

<template>
  <Flex v-if="examResults" column justify="center" items="center" class="p-8 text-center">
    <h1 class="font-semibold text-3xl">Δοκιμαστικές εξετάσεις για πτυχίο ραδιοερασιτέχνη</h1>
    <UMeter :color="fracResult < 0.8 ? 'red' : 'primary'" indicator size="2xl" :label="`${numCorrect}/${examResults.payload.length} σωστές απαντήσεις`" :value="Math.round((numCorrect / examResults.payload.length) * 100)" />
    <h1 class="text-3xl">Αποτέλεσμα: <span class="font-semibold" :class="fracResult < 0.8 ? 'text-red-500' : 'text-primary'">{{ fracResult < 0.8 ? 'Απορρίφθηκε' : 'Επέτυχε' }}</span></h1>
    <h1 class="text-2xl">Αναγνωριστικό εξέτασης: {{ examId }}</h1>
    <h1 class="text-2xl">Κατηγορία εξέτασης: <span class="font-semibold" :class="fracResult < 0.8 ? 'text-red-500' : 'text-primary'">{{ typeString }}</span></h1>
    <h1 class="text-2xl">Ημερομηνία εξέτασης: {{ new Date(examResults.time).toLocaleString('en-GB') }}</h1>

    <UButton size="lg" variant="outline" @click="navigateTo('/')">Επιστροφή στην αρχική</UButton>

    <Flex column>
      <UContainer v-for="(i, index) in examResults.payload" class="mx-0">
        <div class="m-4 p-2 border border-1 rounded">
          <Flex column mdRow class="basis-1/2 pb-2" grow>
            <Flex column class="basis-1/2" mdItems="start" items="center">
              <h1 class="text-xl">Αναγνωριστικό ερώτησης:</h1>
              <h1 class="font-semibold text-2xl">{{ i.id }}</h1>
            </Flex>
            <Flex column class="basis-1/2" mdItems="end" items="center" grow>
              <h1 class="text-2xl text-center" :class="i.correct ? 'text-primary' : 'text-red-500'">Απαντήσατε {{ i.correct ? 'σωστά' : 'λάθος' }}.</h1>
            </Flex>
          </Flex>
          <Flex column mdRow class="basis-1/2 gap-2 md:gap-0 text-center md:text-start">
            <Flex column class="basis-1/2" mdItems="start" items="center">
              <h1 class="text-lg">{{ i.desc }}</h1>
            </Flex>
            <Flex column class="basis-1/2 md:text-end gap-2 md:gap-0" mdItems="end" items="center" grow>
              <h1 class="text-lg">Η απάντηση σας: <span class="text-semibold">{{ examResults.raw[index].answers[i.answer.own] }}</span></h1>
              <h1 class="text-lg">Σωστή απάντηση: <span class="text-semibold">{{ examResults.raw[index].answers[i.answer.correct] }}</span></h1>
            </Flex>
          </Flex>
        </div>
      </UContainer>
    </Flex>
  </Flex>
</template>