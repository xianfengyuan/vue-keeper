<template>
  <div class="modal fade" tabindex="-1" :id="`accountDetailModal-${account.id}`">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-muted fs-5">Account Details</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="col-md-6">
            <h2 class="text-success">{{ account.username }}</h2>
            <span class="badge text-bg-warning p-2 mx-2">
              <i class="bi bi-tag-fill px-1"></i>
              <span> {{ account.password }}</span>
            </span>
            <p class="text-muted">{{ account.notes }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <a href="mailto:hello@sheermountain.com" class="btn btn-success">Contact Us</a>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  account: Object,
})
</script>
