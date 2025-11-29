<template>
    <div class="flex items-center justify-center select-none">
        <InfoCharacterPlayCard 
            :type="'animatedSwipeOut'"
            :name="'Xæra'"
            :level="285"
            :job="'Xenon'"
            :image-url="'https://msavatar1.nexon.net/Character/MMANDIACIHJNNOPKMBKOPNEFFFBFCPKGDBLOKKLHDCEBDCBBNEPMIOEAGBOKIGAFAOMFEEPICGIJGGMFNCIOLLEBLGPCLCJHNFAIAOBEOICGMLDFDFOLCGCHCFPIGEEAJHPOHEBINNCPAGBOJMNGCAIBFKCIKKHFIFFGCIFAHMJPECIAHFJHIJGCMLKDMPGIPGOGHLMLDDBNIMCPJFACGFPPBHNAFFDMJAANFKIKEOCOEBPMOKBLNCEJLADFCGKC.png'"
            :like-count="'5,000'"
            :text-colour="'like'"
        />
        <motion.div v-if="showCorrectFeedback"id="feedback_correct" class="w-12 h-12 rounded-full bg-like-gradient flex items-center justify-center"
            :style="{ scale: feedbackBGScale }">
            <Icon class="text-white" icon="tabler:check" width="32" height="32" />
        </motion.div>

        <div class="grid grid-rows-1 grid-cols-1 items-center justify-center w-12 h-12">
          <div class="row-[1] col-[1] z-[0] w-full h-full flex items-center justify-center">
              <span class="text-white text-bold text-md text-center">VS</span>
          </div>
        </div>
        <InfoCharacterPlayCard 
            :type="'animatedSwipeTo'"
            :name="'ROCKOGUY'"
            :level="292"
            :job="'Adele'"
            :image-url="'https://msavatar1.nexon.net/Character/LCAPKANJACELHFCMBJHENCNGLDDHEMHEGKEGEGACAGFEBIHPJPLKHOJEFKEMDEJCCLJALHLFHIGGCJGMIOEKEFLCLEMLNDNJDJLPHBEFKOKPIGHEGCPCDFIEPPOGLMJMLEKFGDKPPJHCOGKODMHCBJAMGLDDGMLDILNEICKGBBMBGKBBHFOGAKKGEAIFDHNIBHAMJPKHHNDNLKEHPHHADKJLFNKCEIEEGBPKPEOJLFHFGMJADOFKHIBEPFOOJKEN.png'"
            :like-count="'10'"
            :text-colour="'nope'"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { motion, useMotionValue, animate, useTransform } from 'motion-v'
import { Icon } from "@iconify/vue/dist/iconify.js"
import InfoCharacterPlayCard from './InfoCharacterPlayCard.vue'

const VS_ICON_SCALE_ANIMATION_DURATION = 0.5

const showCorrectFeedback = ref(false);
const feedbackBGScale = useMotionValue(0);

const currentCycle = ref(0)
const checkmarkAnimation = ref({ scale: 0, opacity: 0 })
const cardsAnimation = ref({ x: 0 })

const cards = [
  {
    name: 'Xæra',
    level: 285,
    job: 'Xenon',
    imageUrl: 'https://msavatar1.nexon.net/Character/MMANDIACIHJNNOPKMBKOPNEFFFBFCPKGDBLOKKLHDCEBDCBBNEPMIOEAGBOKIGAFAOMFEEPICGIJGGMFNCIOLLEBLGPCLCJHNFAIAOBEOICGMLDFDFOLCGCHCFPIGEEAJHPOHEBINNCPAGBOJMNGCAIBFKCIKKHFIFFGCIFAHMJPECIAHFJHIJGCMLKDMPGIPGOGHLMLDDBNIMCPJFACGFPPBHNAFFDMJAANFKIKEOCOEBPMOKBLNCEJLADFCGKC.png',
    likeCount: '5,000'
  },
  {
    name: 'ROCKOGUY',
    level: 292,
    job: 'Adele',
    imageUrl: 'https://msavatar1.nexon.net/Character/LCAPKANJACELHFCMBJHENCNGLDDHEMHEGKEGEGACAGFEBIHPJPLKHOJEFKEMDEJCCLJALHLFHIGGCJGMIOEKEFLCLEMLNDNJDJLPHBEFKOKPIGHEGCPCDFIEPPOGLMJMLEKFGDKPPJHCOGKODMHCBJAMGLDDGMLDILNEICKGBBMBGKBBHFOGAKKGEAIFDHNIBHAMJPKHHNDNLKEHPHHADKJLFNKCEIEEGBPKPEOJLFHFGMJADOFKHIBEPFOOJKEN.png',
    likeCount: '10'
  },
  {
    name: 'MapleHero',
    level: 300,
    job: 'Hero',
    imageUrl: 'https://msavatar1.nexon.net/Character/LCAPKANJACELHFCMBJHENCNGLDDHEMHEGKEGEGACAGFEBIHPJPLKHOJEFKEMDEJCCLJALHLFHIGGCJGMIOEKEFLCLEMLNDNJDJLPHBEFKOKPIGHEGCPCDFIEPPOGLMJMLEKFGDKPPJHCOGKODMHCBJAMGLDDGMLDILNEICKGBBMBGKBBHFOGAKKGEAIFDHNIBHAMJPKHHNDNLKEHPHHADKJLFNKCEIEEGBPKPEOJLFHFGMJADOFKHIBEPFOOJKEN.png',
    likeCount: '12,500'
  }
]

const orderedCards = computed(() => {
  return [
    cards[currentCycle.value % 3],
    cards[(currentCycle.value + 1) % 3],
    cards[(currentCycle.value + 2) % 3]
  ]
})

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

async function startAnimations()
{
  await sleep(0);
  await animateScale('up');
  await sleep(500);
  await animateScale('down');
  // await any other animations;
  // await ...
  // await ...
}

async function animateScale(action : 'up' | 'down')
{
  console.log("Animating Icon Scale")
  
  const target = action === 'up' ? 1 : 0;
  // await animate(scale, target, {
  //   duration: VS_ICON_SCALE_ANIMATION_DURATION,
  //   ease: 'easeInOut',
  // })
}

async function animateAnswerFeedback(action : 'correct' | 'incorrect')
{
  console.log("Animating Answer Feedback")
  
  if (action === 'correct')
  {
    showCorrectFeedback.value = true;
    // Reveal background.


    // Show checkmark icon.

    // Hide entire component.

    const target = action === 'up' ? 1 : 0;
    await animate(scale, target, {
      duration: VS_ICON_SCALE_ANIMATION_DURATION,
      ease: 'easeInOut',
    })
  }
  else if (action === 'incorrect') 
  {
    // Reveal background.

    // Show X icon.

    // Hide entire component.
  }
  const target = action === 'up' ? 1 : 0;
  await animate(scale, target, {
    duration: VS_ICON_SCALE_ANIMATION_DURATION,
    ease: 'easeInOut',
  })
}

onMounted(() => {
  startAnimations()
})
</script>