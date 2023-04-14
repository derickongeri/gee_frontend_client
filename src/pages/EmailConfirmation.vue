<template>
  <q-page padding>
		<div class="message absolute-center" style="top:20vh">
			<h6><strong>Thank you for registering with us!</strong></h6>
			<p>We're excited to have you on board.</p>
			<p>To complete your registration, Please check your eamil <strong>{{$route.query.email}}</strong> and confirm your registration.</p>
      <p>Thank you!</p>
		</div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfrimationPage'
})
</script>
