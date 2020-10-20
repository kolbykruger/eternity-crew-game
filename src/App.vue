<template>
    <div id="app">
        <p class="game-name">Eternity Crew Game</p>

        <div v-if="gameData">
            <div v-if="stage < gameData.length">
                <div class="game">
                    <QA
                        :data="gameData[stage]"
                        :stage="gameStage"
                        @stage="showControls"
                    />
                </div>

                <div class="buttons" v-if="showNextButton">
                    <button class="button dark" @click="nextQA">
                        Next question
                    </button>
                </div>
            </div>
            <div v-else>
                <h2>Game Over</h2>
                <p>There are no more questions left.</p>
            </div>
        </div>
        <div v-else>
            Loading game...
        </div>
    </div>
</template>

<script>
import QA from '@/components/QA.vue'

export default {
    name: 'App',
    components: {
        QA
    },
    data() {
        return {
            gameData: null,
            gameStage: false,
            stage: 0,
            docid: '1Je5sf-knWA2OY2fQ1ETaLd7MvQG5S7AUG4VOkmG86tk',
            showNextButton: false
        }
    },
    mounted() {
        const $el = this

        fetch(
            `https://spreadsheets.google.com/feeds/cells/${this.docid}/od6/public/basic?alt=json`
        )
            .then(response => response.json())
            .then(data => {
                let arr = data.feed.entry

                //create a keyed array based on cell value for future matching
                const keyedArray = []
                let count = []
                arr.forEach(item => {
                    const row = item.title.$t.replace(/\D+/g, '')
                    const col = item.title.$t.split('')[0]
                    keyedArray.push({
                        row: row,
                        col: col,
                        text: item.content.$t
                    })
                    count.push(row)
                })

                //created header object just in case we need to reference the headers
                let headerObject = []
                keyedArray.forEach(item => {
                    if (item.row == 1) {
                        headerObject.push(item)
                    }
                })

                //create array of matched rows based on cell value
                let matchedArray = []
                for (let i = 1; i < Math.max.apply(Math, count); i++) {
                    // find matches for the row
                    let matches = keyedArray.filter(item => item.row == i)

                    if (matches && i != 1) {
                        //create an object of keys that match the currently looped row
                        if (matches[0] && matches[1] && matches[2]) {
                            let obj = {
                                question: matches[0],
                                answer: matches[1],
                                person: matches[2]
                            }

                            // push this object to a data structure for the app
                            matchedArray.push(obj)
                        }
                    }
                }

                //shuffle funciton to keep the game interesting
                function shuffle(a) {
                    var j, x, i
                    for (i = a.length - 1; i > 0; i--) {
                        j = Math.floor(Math.random() * (i + 1))
                        x = a[i]
                        a[i] = a[j]
                        a[j] = x
                    }
                    return a
                }

                // randomize the array struct
                shuffle(matchedArray)

                $el.gameData = matchedArray
            })
    },
    methods: {
        nextQA() {
            this.stage = this.stage + 1
            this.showNextButton = false
        },
        showControls(value) {
            this.showNextButton = value
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

#app {
    font-family: 'Rubik', sans-serif;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #212121;
    padding: 10vh 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
}
.game-name {
    position: absolute;
    top: 1em;
    left: 1em;
    right: 1em;
    text-align: center;
    font-weight: 600;
    opacity: 0.15;
    display: none;
}

.buttons {
    margin-top: 3rem;
}

button {
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    position: relative;
    display: inline-flex;
    align-items: center;
    margin: 0;
    padding: 1.25em 1em;
    font-size: 1rem;
    background: #ef4538;
    color: #fff;
    border-radius: 0.125em;
    line-height: 1;
    transition: 150ms ease;
    text-decoration: none;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    font-family: inherit;

    &.dark {
        background: #212121;
    }
}
</style>
