<template>
  <div class="container py-4">
    <div v-if="loading" class="d-flex justify-content-center align-items-center vh-100">
      <div class="spinner-grow text-secondary">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="border rounded pb-3 px-2" v-else>
      <div
        class="card-header d-flex flex-column flex-md-row justify-content-between align-items-md-center p-4"
      >
        <div>
          <h1 class="text-secondary">Accounts</h1>
          <p class="mb-0 text-muted small">Manage your account listings</p>
        </div>
        <router-link
          :to="{ name: APP_ROUTE_NAMES.ACCOUNT_CREATE }"
          class="btn btn-success btn-sm gap-2 rounded-1 px-4 py-2"
        >
          <i class="bi bi-plus-square"></i> &nbsp;
          <span>Add Account</span>
        </router-link>
      </div>

      <div class="card-body p-3">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 table-striped">
            <thead>
              <tr>
                <th class="ps-3 small text-muted">Account</th>
                <th class="small text-muted">Notes</th>
                <th class="small text-muted">Established</th>
                <th class="pe-3 text-end small text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="account in accounts" :key="account.id">
                <td class="ps-3">
                  <div>
                    <div class="fw-semibold small">{{ account.username }}</div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <small class="text-muted text-truncate d-inline-block" style="max-width: 200px">
                      {{ account.notes }}
                    </small>
                  </div>
                </td>
                <td>
                  <span class="badge bg-secondary bg-opacity-10 text-secondary small">
                    {{ account.established }}
                  </span>
                </td>
                <td class="pe-3 text-end">
                  <button
                    @click="
                      router.push({
                        name: APP_ROUTE_NAMES.ACCOUNT_UPDATE,
                        params: { id: account.id },
                      })
                    "
                    class="btn btn-sm btn-outline-secondary m-2"
                  >
                    <i class="bi bi-pencil-fill"></i> Edit
                  </button>

                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="handleAccountDelete(account.id)"
                  >
                    <i class="bi bi-trash3-fill"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import accountService from '@/services/accountService'
import { useSwal } from '@/composibles/useSwal'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useRouter } from 'vue-router'
const router = useRouter()
const { showSuccess, showError, showConfirm } = useSwal()

const accounts = ref([])
const loading = ref(false)

onMounted(() => {
  fetchAccounts()
})

const fetchAccounts = async () => {
  try {
    loading.value = true
    accounts.value = await accountService.getAccounts()
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}

const handleAccountDelete = async (accountId) => {
  try {
    loading.value = true
    const confirmResult = await showConfirm('Are you sure you want to delete this account?')
    if (confirmResult.isConfirmed) {
      await accountService.deleteAccount(accountId)
      await showSuccess('Account deleted successfully')
      fetchAccounts()
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>
