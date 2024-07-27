<template>
    <div>
        <h1>Page</h1>
        <form @submit.prevent="submitImage">
            <v-text-field v-model="filename" class="mt-2" label="Filename" density="compact" variant="solo"></v-text-field>
            <v-file-input
                label="File input"
                prepend-icon="mdi-camera"
                variant="solo"
                type="file"
                @change="handleTargetSelected"
            ></v-file-input>
            <v-btn color="primary" type="submit">Submit</v-btn>
        </form>
        <div v-if="files.length">
            <div v-for="file in files" :key="file.id" class="image-item">
                <v-card
                    class="mx-auto"
                    max-width="344"
                >
                    <v-img :src="`${base_url}storage/${file.path}`" :alt="file.name" cover></v-img>
                    <v-card-title>
                        <p>{{ file.filename }}</p>
                    </v-card-title>
                    <v-card-actions>
                    <v-btn
                        color="orange-lighten-2"
                        text="Explore"
                    ></v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                        @click="show = !show"
                    ></v-btn>
                    </v-card-actions>
                    <v-expand-transition>
                        <div v-show="show">
                        <v-divider></v-divider>

                        <v-card-text>
                            sample
                        </v-card-text>
                        </div>
                    </v-expand-transition> 
                </v-card>
            </div>
        </div>
        <div v-else>
            <p>No images found.</p>
        </div>
    </div>
</template>
    
    <script setup>
        import { ref } from 'vue';
        import axios from 'axios';
        import { logEvent } from '~/assets/js/loggingService';
    
        definePageMeta({
            layout: 'default-layout',
        });
    
        const imageFile = ref(null);
        const filename = ref('');
        const files = ref([]);
        const base_url =  useApiUrl();

        const handleTargetSelected = (event) => {
            if (event.target.files.length === 0) {
            return;
            }
            imageFile.value = event.target.files[0];
        };
    
        // const submitImage = async () => {
        //     if (!imageFile.value) return;
        
        //     const formData = new FormData();
        //     formData.append('filename', filename.value);
        //     formData.append('image', imageFile.value);
        
        //     try {
        //     const response = await axios.post('http://127.0.0.1:8000/api/upload-image', formData, {
        //         headers: {
        //         'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     console.log(response.data);
        //     } catch (error) {
        //     console.error('Error uploading image:', error);
        //     }
        // };

        const submitImage = async () => {
            const data = {
                filename: filename.value,
                image: imageFile.value,
            };
            await handleAPIRequest(data, 'upload-image');
        };

        const fetchImages = async () => {
            const response = await handleAPIRequest({}, 'fetch-images');
            files.value = response;
        };

        // const fetchImages = async () => {
        //     try {
        //         const response = await axios.get('http://127.0.0.1:8000/api/images');
        //         files.value = response.data;
        //     } catch (error) {
        //         console.error('Error fetching images:', error);
        //     }
        // };

        const handleAPIRequest = async (data = {}, apiRequest = '') => {
            const formData = new FormData();
            // Add data to formData
            for (const key in data) {
                formData.append(key, data[key]);
            }
            try {
                let response;
                switch(apiRequest) {
                    case 'upload-image':
                        response = await axios.post(`${base_url}api/upload-image`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                        formData.append('timestamp', new Date().toISOString())
                        logEvent(data.filename, {
                            upload: {
                                filename: data.filename,
                                image: data.image.name
                            }
                        });
                        break;
                    
                    case 'fetch-images':
                        response = await axios.get(`${base_url}api/images`);
                        break;

                    default:
                        throw new Error('Invalid API request');
                }
                return response.data;
            } catch (error) {
                console.error(`Error ${apiRequest}:`, error);
                throw error;
            }
        };
        onMounted(() => {
            fetchImages();
        });
    </script>
<style scoped>
    .image-item {
        margin-bottom: 16px;
    }
</style>
    