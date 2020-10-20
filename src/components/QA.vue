<template>
    <div class="question-answer" v-if="ready">
        <div class="prompt">
            <p>
                {{ data['question'].text }}
            </p>
        </div>
        <div class="question">
            <p>
                {{ data['answer'].text }}
            </p>
        </div>
        <div class="answer" :class="{ 'answer-hidden': !answerShown }">
            <p>
                {{ data['person'].text }}
            </p>
        </div>
        <div class="buttons" v-if="!answerShown">
            <button class="button" @click="showAnswer">Show Answer</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QA',
    props: {
        data: Object,
        stage: Boolean
    },
    data() {
        return {
            answerShown: false,
            ready: false
        }
    },
    methods: {
        showAnswer() {
            this.answerShown = !this.answerShown
            this.$emit('stage', this.answerShown)
        }
    },
    mounted() {
        this.answerShown = false
        this.ready = true
    },
    watch: {
        data() {
            this.answerShown = false
        }
    }
}
</script>

<style lang="scss">
p {
    margin: 0;
}

.prompt {
    position: relative;
    font-size: clamp(1.25rem, calc(1rem + 3vw), 1.5rem);
    margin-bottom: 6rem;
    opacity: 0.45;
}

h2,
.question {
    font-size: clamp(3rem, calc(1rem + 4vw), 5rem);
}

.answer {
    margin-top: 6rem;
    margin-bottom: 6rem;
    color: #ef4538;
    font-size: clamp(2rem, calc(1rem + 3vw), 3rem);
    transition: 350ms cubic-bezier(0.34, 2, 0.64, 1);
    transform: scale(1);
    opacity: 1;

    &-hidden {
        opacity: 0;
        transform: scale(0);
        color: #000;
        transition: 0s ease;
    }
}
</style>
