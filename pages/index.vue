<script setup>

</script>

<template>
  <Flex column items="center" justify="center" gap="2" class="p-6">
    <h1 class="text-3xl font-semibold">Δοκιμαστικές εξετάσεις για πτυχίο ραδιοερασιτέχνη</h1>
    <h1 class="text-2xl pt-8">Επιλέξτε τον τύπο εξετάσεων για να ξεκινήσετε.</h1>

    <Flex column gap="2">
      <Flex row justify="evenly" gap="2" class="w-auto">
        <UButton size="lg" block variant="outline">Επιπέδου 1 (SV)</UButton>
        <UButton size="lg" block variant="outline">Εισαγωγικού Επιπέδου (SY)</UButton>
      </Flex>

      <Flex row justify="evenly" gap="2">
        <UButton size="lg" block variant="outline">Επιπέδου 1 με απαλλαγή κατηγορίας Α (SV)</UButton>
        <UButton size="lg" block variant="outline">Εισαγωγικού Επιπέδου με απαλλαγή κατηγορίας Α (SY)</UButton>
      </Flex>
    </Flex>

    <h1 class="font-semibold text-xl pt-8">Προβολή προηγούμενου αποτελέσματος</h1>
    <UFormGroup>
      <Flex row gap="2">
        <UInput placeholder="gama8?"></UInput>
        <UButton type="submit">Αναζήτηση</UButton>
      </Flex>
    </UFormGroup>

  </Flex>
</template>