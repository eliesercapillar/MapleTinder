<template>
    <div class="relative bg-white flex flex-col justify-center rounded-lg aspect-[3/4] h-[240px] w-[170px] m-2"
        :style="{
            background: favouriteGradient,
            border: favouriteBorder
        }"
    >
        <img :src="imageUrl" draggable="false">
        <div id="black_gradient" class="absolute bottom-0 h-[30%] w-full rounded-lg bg-black-shadow-fade"/>
        <div id="character_info" class="absolute w-full bottom-[5%] px-2 text-white overflow-hidden">
            <span class="font-extrabold text-sm">{{ name }}</span>
            <div class="flex items-center text-xs">
                <span class="font-normal">{{ level }}</span>
                &nbsp;
                <span class="font-normal">{{ job }}</span>
            </div>
            <div>
                <span class="font-bold text-like" :class="`text-${textColour}`">{{ likeCount }} Likes</span>
            </div>
        </div>
        <div v-if="type === 'animatedCursor'" id="animated_cursor">
            <motion.div id="vignette" 
                class="absolute top-0 bottom-1/2 left-0 right-0 bg-like-top-down-vignette-fade rounded-lg flex items-start justify-center"
                :animate="{
                    opacity: [1, 0, 0, 0, 1],
                }"
                :transition="{ 
                    duration: 6, 
                    ease: 'linear', 
                    repeat: Infinity,
                    times: [0, 0.25, 0.50, 0.75, 1]
                }"
            >
                <Icon class="text-[#e4f10a]" icon="gravity-ui:chevron-up" width="64" height="64" />
            </motion.div>
            <motion.div id="vignette" 
                class="absolute top-1/2 bottom-0 left-0 right-0 bg-nope-bottom-up-vignette-fade rounded-lg flex items-end justify-center"
                :animate="{
                    opacity: [0, 0, 1, 0, 0],
                }"
                :transition="{ 
                    duration: 6, 
                    ease: 'linear', 
                    repeat: Infinity,
                    times: [0, 0.25, 0.50, 0.75, 1]
                }"
            >
                <Icon class="text-nope" icon="gravity-ui:chevron-down" width="64" height="64" />
            </motion.div>
            <motion.div id="cursor" 
                class="absolute top-[60px] left-1/2  flex items-center justify-center"
                :animate="{ y: [0, 96, 0] }"
                :transition="{ duration: 6, ease: 'easeInOut', repeat: Infinity }"
            >
                <div id="icon" class="w-6 h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="#fff" 
                        d="M7.407 2.486c-.917-.612-2.251.046-2.152 1.238l.029.347a86 86 0 0 0 2.79 15.693c.337 1.224 2.03 1.33 2.544.195l2.129-4.697c.203-.449.697-.737 1.234-.68l5.266.564c1.209.13 2.063-1.346 1.094-2.281A91 91 0 0 0 7.703 2.684z" 
                        stroke-width="2" 
                        stroke="#000" />
                    </svg>
                </div>
                <div id="selection_text" class="grid font-bold text-md">
                    <motion.span class="row-[1] col-[1] text-like"
                        :animate="{
                            opacity: [1, 0, 0, 0, 1],
                        }"
                        :transition="{ 
                            duration: 6, 
                            ease: 'linear', 
                            repeat: Infinity,
                            times: [0, 0.25, 0.50, 0.75, 1]
                        }"
                    >
                        Higher?
                    </motion.span>
                    <motion.span class="row-[1] col-[1] text-nope"
                        :animate="{
                            opacity: [0, 0, 1, 0, 0],
                        }"
                        :transition="{ 
                            duration: 6, 
                            ease: 'linear', 
                            repeat: Infinity,
                            times: [0, 0.25, 0.50, 0.75, 1]
                        }"
                    >
                        Lower?
                    </motion.span>
                </div>
            </motion.div>
        </div>
        <div v-if="type === 'static'" id="static">
            <div id="vignette" class="absolute top-0 bottom-1/2 left-0 right-0 bg-like-top-down-vignette-fade rounded-lg flex items-start justify-center">
                <Icon class="text-[#e4f10a]" icon="gravity-ui:chevron-up" width="64" height="64" />
            </div>
            <div id="vignette" class="absolute top-1/2 bottom-0 left-0 right-0 bg-nope-bottom-up-vignette-fade rounded-lg flex items-end justify-center">
                <Icon class="text-nope" icon="gravity-ui:chevron-down" width="64" height="64" />
            </div>
        </div>
        <div v-if="type === 'animatedSwipeOut'" id="animated_swipe">
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { motion, useMotionValue, animate } from 'motion-v'
import { Icon } from "@iconify/vue/dist/iconify.js";
import ButtonSVGs from "@/data/ButtonSVGs.json";

const props = defineProps<{
    type: 'default' | 'animatedCursor' | 'static' | 'animatedSwipeOut' | 'animatedSwipeTo' | 'animatedSwipeIn'
    name: string
    level: number
    job: string
    imageUrl: string
    likeCount: string
    textColour: string
}>()

const likedGradient = ButtonSVGs['liked'].pressedGradient;
const nopedGradient = ButtonSVGs['noped'].pressedGradient;
const favouriteGradient = ButtonSVGs['favourited'].pressedGradient;

const likedBorder = ButtonSVGs['liked'].pressedGradient;
const nopedBorder = ButtonSVGs['noped'].borderColour;
const favouriteBorder = ButtonSVGs['favourited'].borderColour;

</script>