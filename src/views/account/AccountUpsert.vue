<template>
  <div class="container">
    <div class="row border p-4 my-5 rounded">
      <div class="col-9">
        <form v-on:submit.prevent="handleSubmit">
          <div class="h2 text-center text-success">
            {{ accountIdForUpdate ? 'Update' : 'Create' }} Account
          </div>
          <hr />
          <div v-if="errorList.length > 0" class="alert alert-danger pb-0">
            Please fix the following errors:
            <ul>
              <li v-for="error in errorList" :key="error">{{ error }}</li>
            </ul>
          </div>

          <div class="mt-3">
            <span class="text-muted">Username</span>
            <input type="text" v-model.trim="accountObj.username" class="form-control" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Password</span>
            <input type="text" v-model.trim="accountObj.password" class="form-control" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Notes</span>
            <textarea type="text" v-model="accountObj.notes" class="form-control"></textarea>
          </div>
          <div class="mt-3">
            <span class="text-muted">Established</span>
            <Datepicker v-model="accountObj.established" />
          </div>
          <div class="pt-3">
            <button class="btn btn-success m-2 w-25" :disabled="loading">
              <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>Submit
            </button>
            <router-link
              :to="{ name: APP_ROUTE_NAMES.ACCOUNT_LIST }"
              class="btn btn-secondary m-2 w-25"
            >
              Cancel
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSwal } from '@/composibles/useSwal'
import accountService from '@/services/accountService'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
const { showSuccess, showError, showConfirm } = useSwal()
const router = useRouter()
const route = useRoute()
const loading = ref(false)
const errorList = reactive([])
const accountObj = reactive({
  username: '',
  password: '',
  notes: '',
  established: '',
})
const accountIdForUpdate = route.params.id

onMounted(async () => {
  if (!accountIdForUpdate) return
  loading.value = true
  try {
    const account = await accountService.getAccountById(accountIdForUpdate)
    Object.assign(accountObj, { ...account })
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
})

async function handleSubmit() {
  try {
    loading.value = true
    errorList.length = 0

    // validations
    if (accountObj.username.length < 3) {
      errorList.push('Username should be at least 3 char long.')
    }
    if (accountObj.password.length < 6) {
      errorList.push('Password should be at least 6 char long.')
    }

    if (!errorList.length) {
      const accountData = {
        ...accountObj,
      }
      if (accountIdForUpdate) {
        await accountService.updateAccount(accountIdForUpdate, accountData)
        showSuccess('Account updated successfully')
      } else {
        await accountService.createAccount(accountData)
        showSuccess('Account created successfully')
      }
      router.push({ name: APP_ROUTE_NAMES.ACCOUNT_LIST })
      console.log(accountData)
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }

  console.log(accountObj)
}
</script>
