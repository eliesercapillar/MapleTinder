import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiFetch } from '@/utils/api'
import { useSwipeStore } from './swipeStore'

interface ApiCharacter {
  id: number
  name: string
  level: number
  job: string
  world: string
  imageUrl: string
}

interface BackgroundPaths {
  optimized: string;
  fallback: string;
}

interface CharacterCard 
{
  character : ApiCharacter
  bgURL: BackgroundPaths;
}

type Rating = 'Likes' | 'Nopes' | 'Favourites';

export const usePlayStore = defineStore('play', () => 
{
    const currentScore = ref(0);
    const highScore = ref(0);
    const isCurrentlyPlaying = ref(false);

    const cards = ref([] as CharacterCard[]);
    const currentRating = ref<Rating>('Likes')

    const correctSelection = ref(false);
    const userHasSelected = ref(false);

    let animResolve: (() => void) | null = null;

    function playAllAnimations(): Promise<void> {
        // If an animation is already pending, return the same promise
        if (userHasSelected.value && animResolve) {
            return new Promise(res =>
            {
                const prevResolve = animResolve!;
                // chain: resolve once previous finished
                const chain = () => { prevResolve(); res(); };
                animResolve = chain;
            });
        }

        userHasSelected.value = true;

        return new Promise<void>((resolve) => { animResolve = resolve; });
    }

    function allAnimationsFinished() {
        if (animResolve) 
        {
            animResolve();
            animResolve = null;
        }
        userHasSelected.value = false;
    }

    async function initializeCards()
    {
        resetCards();
        addRandomCardFromSwipeStore();
    }

    async function startClassic() 
    {
        isCurrentlyPlaying.value = true;
        await getNewCard(2); // Add two cards to start
    }
    
    async function startTimed() 
    { 
        isCurrentlyPlaying.value = true;
        await getNewCard(2); // Add two cards to start
    }

    async function makeSelection(selection : 'higher' | 'lower')
    {
        correctSelection.value = await verify(selection);
        if (!correctSelection.value)
        {
            gameOver();
            return;
        }
        await startNextRound();
    }
    
    async function startNextRound() 
    {
        currentScore.value++;
        await playAllAnimations();

        correctSelection.value = false;
        cards.value.shift();
        getNewRandomRating();
        await getNewCard();
    }   

    async function getNewCard(quantity : number = 1)
    {
        // const excludeIds = cards.value.map(c => c.character.id).join(',');
        // const excludeParam = excludeIds ? `&exclude=${excludeIds}` : '';

        // const url = `https://localhost:7235/api/Game/randomCard?quantity=${quantity}`;
        // const response = await apiFetch(url);

        for (let i = 0; i < quantity; i++) addRandomCardFromSwipeStore();
    }

    async function verify(choice : 'higher' | 'lower') : Promise<boolean>
    {
        // const url = `https://localhost:7235/api/Game/verify?previousId={cards[0].character.id}&nextId={cards[1].character.id}&choice={choice}`;
        // const response = await apiFetch(url);

        return true;
    }

    function gameOver()
    {
        isCurrentlyPlaying.value = false;
        resetCards();
        highScore.value = Math.max(highScore.value, currentScore.value);
        currentScore.value = 0;
    }

    function addRandomCardFromSwipeStore()
    {
        const swipeStore = useSwipeStore();
        var startingCard = swipeStore.cards[Math.floor(Math.random() * swipeStore.cards.length)];
        cards.value.push(startingCard);
    }

    function getNewRandomRating()
    {
        var value : Rating = 'Likes'
        switch (Math.floor(Math.random() * 3))
        {
            case 0:
                value = 'Likes'
                break;
            case 1:
                value = 'Nopes'
                break;
            case 2:
                value = 'Favourites'
                break;
            default:
                value = 'Likes'
                break;
        }

        currentRating.value = value;
    }
    
    function resetCards()
    {
        cards.value = [] as CharacterCard[];
    }


    return {
        userHasSelected, allAnimationsFinished,

        currentScore, highScore, isCurrentlyPlaying,

        cards, correctSelection,


        initializeCards,

        startClassic, startTimed,
        makeSelection, getNewCard, startNextRound,

    }

});