<template>
	<v-layout>
		<v-app-bar
			color="#6A0DAD"
			prominent
		>
			<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>Service Record</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
			class="side-bar"
		>
			<v-avatar
				class="fa-fa-user mb-4 ml-4 mt-4"
				color="grey-darken-1"
				size="64"
				>
				<v-img
					:width="74"
					:height="100"
					aspect-ratio="16/9"
					cover
					src="../assets/images/CDUH_logo.jpg"
				>
				</v-img>
			</v-avatar>
			<div v-if="user">
				<div class="pa-4"><span class="text-capitalize">{{ user }}</span></div>
			</div>
			<div v-else>
				<div class="pa-4">User's Name</div>
			</div>

			<v-divider></v-divider>

			<v-list>
				<template v-for="(item, index) in links">
					<v-list-item
						v-if="item.name === 'Dashboard'"
						:key="index"
						:prepend-icon="item.icon"
						:title="item.name"
						link
						:to="item.path"
					></v-list-item>
				</template>
				<v-list-group>
					<template v-slot:activator="{ props }">
						<v-list-item v-bind="props" class="parent-nav">
							Service Record
						</v-list-item>
					</template>
					<template v-for="(item, index) in links" :key="index">
						<div class="custom-link-style">
							<v-list-item
							v-if="item.name !== 'Dashboard' && !item.logout"
							:prepend-icon="item.icon"
							:title="item.name"
							link
							:to="item.path"
							></v-list-item>
						</div>
					</template>
				</v-list-group>
				<template v-for="(item, index) in links" :key="index">
					<v-list-item
						block
						v-if="item.logout"
						:prepend-icon="item.icon"
						:title="item.name"
						link
						@click="logout()"
					></v-list-item>
				</template>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<v-container :fluid="true">
				<v-row justify="center" align="center" class="mb-4">
					<v-col class="text-center">
						<div class="page-header-text">
							<h1 class="text-uppercase">Employee Service Record</h1>
						</div>
					</v-col>
				</v-row>
				<NuxtPage />
			</v-container>
		</v-main>
	</v-layout>
</template>

<script setup>
// import Swal from 'sweetalert2';
import { ref } from 'vue';
import '../assets/css/sidebar.css';

const links = [
	{
		name:'Dashboard',
		path:'/',
		icon:'mdi-view-dashboard',
		logout: false,
	},
	{
		name:'By Employee',
		path:'/dashboard',
		icon:'mdi-account-circle',
		logout:false,
	},
	{
		name:'By Department',
		path:'department',
		icon:'mdi-office-building',
		logout:false
	},
	{
		name:'Logout',
		path:'dashboard',
		icon:'mdi-logout',
		logout:true
	}
];

const drawer = ref(null);
const router = useRouter();
</script>