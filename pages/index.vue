<script setup>
  const toast = useToast();
  const selectedType = useState("selectedType");
  const examId = useState('examId');
  const searchInput = ref();
  const srcLoading = ref([false, false, false, false, false]);
</script>

<template>
  <Flex column items="center" justify="center" gap="2" class="p-6">
    <h1 class="text-3xl font-semibold">Δοκιμαστικές εξετάσεις για πτυχίο ραδιοερασιτέχνη</h1>
    <h1 class="text-2xl pt-8">Επιλέξτε τον τύπο εξετάσεων για να ξεκινήσετε.</h1>

    <Flex column gap="2">
      <UButton size="lg" class="text-center" variant="outline" :loading="srcLoading[0]" @click="selectedType = 'SV'; srcLoading[0] = true; navigateTo('/intermediary')">Επιπέδου 1 (SV)</UButton>
      <UButton size="lg" class="text-center" variant="outline" :loading="srcLoading[1]" @click="selectedType = 'SY'; srcLoading[1] = true; navigateTo('/intermediary')">Εισαγωγικού Επιπέδου (SY)</UButton>
      <UButton size="lg" class="text-center" variant="outline" :loading="srcLoading[2]" @click="selectedType = 'SVcatA'; srcLoading[2] = true; navigateTo('/intermediary')">Επιπέδου 1 με απαλλαγή κατηγορίας Α (SV)</UButton>
      <UButton size="lg" class="text-center" variant="outline" :loading="srcLoading[3]" @click="selectedType = 'SYcatA'; srcLoading[3] = true; navigateTo('/intermediary')">Εισαγωγικού Επιπέδου με απαλλαγή κατηγορίας Α (SY)</UButton>
    </Flex>

    <h1 class="font-semibold text-xl pt-8">Προβολή προηγούμενου αποτελέσματος</h1>
    <UFormGroup>
      <Flex row gap="2">
        <UInput v-model="searchInput" placeholder="Αναγνωριστικό εξέτασης"></UInput>
        <UButton type="submit" :loading="srcLoading[4]" @click=" srcLoading[4] = true; examId = searchInput; getResults(examId).then((res) => {if (res.status === 425) toast.add({title: 'Η εξέταση αυτή είναι ακόμη σε εξέλιξη.'}); else if (res.status === 400) toast.add({title: 'Η εξέταση αυτή δε βρέθηκε.'}); else navigateTo('/result'); srcLoading[4] = false})">Αναζήτηση</UButton>
      </Flex>
    </UFormGroup>

  </Flex>
</template>