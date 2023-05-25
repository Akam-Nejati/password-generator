<script setup lang="ts">
import { ref } from 'vue';
import Options from '../types/Options.interface';
import Characters from '../types/Characters.interface';

// const lowercaseCharacters: string[] = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
// const uppercaseCharacters: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"]
// const symbols: string[] = ["!", "@", "#", "$", "%", "^", "&", "*"]
// const numbers: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
// const ambiguousCharacters: string[] = ["~", "`", "(", ")", "{", "}", "[", "]", ".", ",", ":", ";"]
const characters: Characters = {
    lowercaseCharacters: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"],
    uppercaseCharacters: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"],
    symbols: ["!", "@", "#", "$", "%", "^", "&", "*"],
    numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ambiguousCharacters: ["~", "`", "(", ")", "{", "}", "[", "]", ".", ",", ":", ";"],
}

const selectedCharacters = ref<string[]>([])
const password = ref<string>()
const passwordLength = ref<number>(7)
const options = ref<Options>({
    symbols: {
        label: "symbols",
        value: false
    },
    numbers: {
        label: "numbers",
        value: false
    },
    lowercaseCharacters: {
        label: "lowercaseCharacters",
        value: true
    },
    uppercaseCharacters: {
        label: "uppercaseCharacters",
        value: false
    },
    ambiguousCharacters: {
        label: "ambiguousCharacters",
        value: false
    }
})

// function generate() {
//     for (const [optionKey, optionValue] of Object.entries(options.value)) {
//         if (optionValue.value) {
//             selectedCharacters.value.push(characters[optionKey])
//         }
//     }
// }

function generate() {
    selectedCharacters.value = []

    for (const [optionKey, optionValue] of Object.entries(options.value)) {
        if (optionValue.value) {
            selectedCharacters.value.push(...characters[optionKey as keyof Options])
        }
    }

    console.log(selectedCharacters.value);
    
}
</script>

<template>
    <div class="w-[20rem] bg-zinc-950 p-4 rounded-xl shadow-xl ">
        <div class="grid grid-cols-12 gap-2">
            <input type="text" class="h-10 col-span-10 bg-white rounded-xl px-2" :disabled="!password">
            <div class="h-10 col-span-2 bg-white rounded-xl p-2 cursor-pointer select-none">
                <img src="./../assets/copy-svgrepo-com.svg" alt="">
            </div>
        </div>
        <div class="mt-4 w-full">
            <input v-model="passwordLength" type="range" class="w-full accent-blue-600 cursor-pointer" min="7" max="20">
        </div>
        <div class="mt-4 flex gap-5 flex-col">
            <div v-for="(option, index) in options" class="accent-blue-600 flex items-center">
                <input type="checkbox" v-model="options[index].value" class="w-5 h-5 rounded-xl cursor-pointer"
                    :id="option.label">
                <label :for="option.label" class="select-none ml-2 text-white cursor-pointer">{{ option.label }}</label>
            </div>
        </div>
        <div class="grid grid-cols-12 mt-6 gap-2">
            <div class="col-span-2">
                <div class="w-full py-2 bg-white rounded-xl flex justify-center items-center">
                    {{ passwordLength }}
                </div>
            </div>
            <div class="col-span-10">
                <button @click="generate" class="py-2 bg-blue-600 w-full rounded-xl text-white">
                    Generate
                </button>
            </div>
        </div>
    </div>
</template>