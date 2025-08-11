<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card h-100 border">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-2">{{ account.username }}</h5>
        <p class="card-text text-truncate-lines-2 mb-3">{{ account.notes }}</p>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <button
            type="button"
            class="btn btn-success fs-6 py-2 px-4 btn-sm"
            data-bs-toggle="modal"
            :data-bs-target="`#accountDetailModal-${account.id}`"
          >
            <i class="bi bi-card-list"></i> View Details
          </button>
        </div>
      </div>
    </div>
    <AccountDetail :account="account" />
  </div>
</template>
<script setup>
import AccountDetail from './AccountDetail.vue'
const props = defineProps({
  account: Object,
})
</script>
