<template>
  <div>
    <div
      class="bg-success w-100 position-relative overflow-hidden mb-4 py-5 d-flex align-items-center hero-section"
    >
      <div class="position-absolute top-0 start-0 w-100 h-100"></div>

      <div class="container-fluid position-relative z-1">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8 col-xl-7">
            <h1 class="display-4 fw-bold text-white mb-4">
              Your One-Stop Account Store
              <br class="d-none d-lg-block" />
              Different Account & Item for Every Occasion!
            </h1>
            <div class="input-group mt-3 mx-auto shadow-lg rounded-4" style="max-width: 700px">
              <input
                type="text"
                v-model="searchValue"
                class="form-control border-0 py-3 px-4 fs-5"
                placeholder="Search your account..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="account-list" class="container">
      <h2 class="mb-5 text-center display-6">Discover Account</h2>
      <div>
        <div v-if="filteredAccountList.length > 0" class="row g-4 pb-4">
          <AccountCard
            v-for="account in filteredAccountList"
            :key="account.id"
            :account="account"
          ></AccountCard>
        </div>
        <div v-else>
          <h3 class="text-center">No Account Found</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import accountService from '@/services/accountService'
import AccountCard from '@/components/Account/AccountCard.vue'
const accounts = ref([])
const loading = ref(false)
const searchValue = ref('')
onMounted(() => {
  fetchAccounts()
})

const fetchAccounts = async () => {
  try {
    loading.value = true
    accounts.value = await accountService.getAccounts()
    console.log(accounts.value)
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

const filteredAccountList = computed(() => {
  let tempArray = [...accounts.value]
  if (searchValue.value) {
    tempArray = tempArray.filter((item) => {
      return item.notes.toUpperCase().includes(searchValue.value.toUpperCase())
    })
  }
  return tempArray
})
</script>
