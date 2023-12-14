<script setup>
  const selectedType = useState("selectedType");
  const typeString = ref();
  const totalQuestions = ref();
  const Aquestions = ref();

  const refLoading = ref(false);

  switch (selectedType.value) {
    case ('SV'):
      typeString.value = 'Επιπέδου 1 (SV)';
      totalQuestions.value = 100;
      Aquestions.value = 50;
      break;
    case ('SY'):
      typeString.value = 'Εισαγωγικού Επιπέδου (SY)';
      totalQuestions.value = 100;
      Aquestions.value = 20;
      break;
    case ('SVcatA'):
      typeString.value = 'Επιπέδου 1 με απαλλαγή κατ. Α (SV)';
      totalQuestions.value = 50;
      Aquestions.value = 50;
      break;
    case ('SYcatA'):
      typeString.value = 'Εισαγωγικού Επιπέδου με απαλλαγή κατ. Α (SY)';
      totalQuestions.value = 80;
      Aquestions.vaue = 20;
      break;
  }
</script>

<template>
  <Flex column items="center" justify="center" gap="2" class="md:p-6 p-2">
    <h1 class="text-3xl font-semibold text-center">Δοκιμαστικές εξετάσεις για πτυχίο ραδιοερασιτέχνη</h1>
    <h1 class="text-2xl text-center">Όροι εξέτασης <span class="font-semibold text-primary">{{ typeString }}</span></h1>

    <Flex column class="md:w-2/3 rounded p-4 border border-1" gap="12">
      <ul class="list-disc list-inside space-y-4">
        <li>Από την έναρξη της εξέτασης έχετε στη διάθεσή σας <b class="text-primary">ακριβώς 2 ώρες</b> για την ολοκλήρωση της. Καλείστε να απαντήσετε σε
          {{ totalQuestions }} ερωτήματα πολλαπλής επιλογής. Σε περίπτωση που δεν έχει ολοκληρωθεί η εξέταση μέσα σε αυτό το διάστημα, η συγκεκριμένη εξέταση <b class="text-primary">θεωρείται πως έχει λήξει και ακυρώνεται.</b></li>
        <li>Θεωρούνται πως επέτυχαν στις γραπτές εξετάσεις οι υποψήφιοι <b class="text-primary">που απαντούν σε τουλάχιστον {{ totalQuestions*0.8 }} από τις {{ totalQuestions }} ερωτήσεις σωστά</b>. Οι ερωτήσεις για κάθε εξέταση επιλέγονται τυχαία, από τα ερωτηματολόγια του υπουργείου, σε συμμόρφωση με τις οδηγίες του ως προς το πλήθος ερωτήσεων ανά κατηγορία.</li>
        <li>Όσοι κατέχουν πτυχίο τριτοβάθμιας εκπαίδευσης κατεύθυνσης ηλεκτρονικής, ηλεκτρολογίας ή τηλεπικοινωνιών, απαλλάσσονται από την γραπτή εξέταση στο κεφάλαιο Α. Στην περίπτωση αυτή, το ερωτηματολόγιο δεν περιέχει τις αντίστοιχες
          {{ Aquestions }} ερωτήσεις από το κεφάλαιο Α, και θεωρούνται ότι επέτυχαν στις εξετάσεις όσοι υποψήφιοι απάντησαν σωστά τουλάχιστον σε
          {{ !selectedType.includes('cat') ? (totalQuestions-Aquestions)*0.8 : totalQuestions*0.8 }} από τις
          {{ !selectedType.includes('cat') ? totalQuestions-Aquestions : totalQuestions }} υπόλοιπες ερωτήσεις.</li>
      </ul>

      <ul class="list-disc list-inside space-y-4">
        <li><b class="text-primary">Σε περίπτωση που κλείσετε την καρτέλα ή/και επανεκκινήσετε το browser, η συγκεκριμένη εξέταση αυτόματα θεωρείται άκυρη. </b>Δεν υπάρχει η δυνατότητα μεταφοράς μιας σε εξέλιξη εξέτασης μεταξύ browser/συσκευών.</li>
        <li><b class="text-primary">Προτείνεται να κρατήσετε το αναγνωριστικό της εξέτασης σας</b> για να μπορέσετε σε μεταγενέστερη στιγμή να ανατρέξετε στα αποτελέσματα της. Οι έγκυρες ολοκληρωμένες εξετάσεις διατηρούνται για μελλοντική αναφορά επ' αόριστον.</li>
      </ul>
    </Flex>

    <h1 class="text-2xl font-bold pt-6 text-center">Επιλέγοντας να προχωρήσετε στην εξέταση, επιβεβαιώνετε πως έχετε διαβάσει και κατανοήσει τις παραπάνω σημειώσεις.</h1>
    <UFormGroup>
      <Flex column md-row justify="center" class="md:gap-12 gap-2">
        <UButton size="lg" variant="outline" @click="navigateTo('/')">Επιστροφή στην αρχική</UButton>
        <UButton size="lg" variant="outline" :loading="refLoading" @click="refLoading = true; initializeTest(selectedType);">Συνέχεια στην εξέταση</UButton>
      </Flex>
    </UFormGroup>
  </Flex>
</template>