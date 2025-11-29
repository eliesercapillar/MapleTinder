<template>
  <div class="relative bg-background min-h-screen flex flex-row text-white">
    <motion.div :style="{ x: x }">
      <BaseSidebar>
        <template #content>
          <RateHistory v-if="navigationStore.currentPage === 'Rate'" />
          <PlaySettings v-else-if="navigationStore.currentPage === 'Play'" />
          <SearchForm v-else-if="navigationStore.currentPage === 'Leaderboard'" />
        </template>
      </BaseSidebar>
    </motion.div>
    <motion.div class="relative w-full h-full bg-black-grey-radial" :style="{ x: x }">
      <router-view/>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { motion, useMotionValue, animate } from 'motion-v'
import BaseSidebar from "@/components/Sidebar/BaseSidebar.vue";
import RateHistory from "@/components/Sidebar/RateHistorySidebar.vue";
import PlaySettings from "@/components/Sidebar/PlaySettingsSidebar.vue";
import SearchForm from "@/components/Sidebar/SearchFormSidebar.vue";
import { useNavigationStore } from "@/stores/navigationStore";
import { usePlayStore } from "@/stores/playStore";

const SHIFT_ANIMATION_DURATION = 0.35;

const navigationStore = useNavigationStore();
const playStore = usePlayStore();

watch(() => playStore.isCurrentlyPlaying, async (trigger) =>
{
  if (trigger) await moveSidebar('hide');
  else         await moveSidebar('show');
})

const x = useMotionValue('0%');

async function moveSidebar(action : 'show' | 'hide')
{
  const target = action == 'show' ? '-0' : '-100%'

  await animate(x, target, {
    duration: SHIFT_ANIMATION_DURATION,
    ease: 'easeInOut',
    onComplete: () =>
    {
      // do something?
    }
  })
}

</script>
