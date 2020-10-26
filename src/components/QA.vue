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
            <p :class="answerValidator">
                {{ data['person'].text }}
            </p>
        </div>
        <div class="choices" ref="choices">
            <button
                class="choice"
                v-for="name in choices"
                :key="name.id"
                @click="choice(name)"
                :class="isChosen(name)"
                :title="name"
                :disabled="answerShown"
            >
                <img :src="name + '.png'" />
            </button>
            <br /><br />
            <p v-if="!answerShown">{{ picks }} guesses remaining</p>
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
            answer: null,
            ready: false,
            picks: 2,
            chosen: [],
            choices: [
                'Mike',
                'Rob',
                'Carlos',
                'Kolby',
                'Meghan',
                'Shawna',
                'Grace'
            ]
        }
    },
    computed: {
        answerValidator() {
            if (this.chosen.includes(this.answer)) {
                return `answer-correct`
            } else {
                return `answer-incorrect`
            }
        }
    },
    methods: {
        showAnswer() {
            this.answerShown = true
            this.$refs.choices.classList.add('choices-reveal')
            this.$emit('stage', this.answerShown)
        },
        choice(name) {
            //if (this.picks)
            if (name == this.data['person'].text) {
                console.log('Correct!')
                this.showAnswer()
            } else {
                console.log('Incorrect')
            }

            this.chosen.push(name)
            this.picks = this.picks - 1
        },
        isChosen(name) {
            let chosen = '',
                answer = ''
            if (this.chosen.includes(name)) {
                chosen = 'choice-chosen'
            }
            if (name == this.answer) {
                answer = 'choice-answer'
            }
            return chosen + ' ' + answer
        }
    },
    mounted() {
        this.answerShown = false
        this.answer = this.data['person'].text
        this.ready = true
        this.picks = 2
        this.chosen = []
    },
    watch: {
        data() {
            this.answerShown = false
            this.answer = this.data['person'].text
            this.picks = 2
            this.ready = true
            this.chosen = []
            this.$refs.choices.classList.remove('choices-reveal')
        },
        picks() {
            if (this.picks == 0) {
                this.showAnswer()
                this.$refs.choices.classList.add('choices-reveal')
            }
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

    .answer-correct {
        color: #2dd881;
    }

    &-hidden {
        opacity: 0;
        transform: scale(0);
        color: #000;
        transition: 0s ease;
    }
}

.choices {
    .choice {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: none;
        border: none;
        border: 3px solid transparent;
        outline: none;
        font-family: inherit;
        font-size: 1.25rem;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        padding: 0;
        margin: 0 0.25em;
        overflow: hidden;
        cursor: pointer;
        user-select: none;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }

        &-chosen {
            opacity: 0.2;
            border: 3px solid #222;
        }
    }

    &-reveal {
        .choice-answer {
            border: 3px solid #ef4538;
            background: #ef4538;
            opacity: 1;

            img {
                opacity: 0.5;
            }

            &.choice-chosen {
                border: 3px solid #2dd881;
                background: #2dd881;
            }
        }
    }
}
</style>
