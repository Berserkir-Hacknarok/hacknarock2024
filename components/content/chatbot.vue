<script setup lang="ts">

import OpenAI from "openai";
const key=ref('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')
const openai = new OpenAI({ 
  apiKey: key.value,
  dangerouslyAllowBrowser:true
});

const response=ref();

const Chat = [
  { name:'user', first_name: 'Cyndi' },
  { name:'chat', first_name: 'Havij' },
  { age: 42, first_name: 'Robert' }
]

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", 
    content: "say something in viking(translated to english), be bloodthirsty" }],
    model: "gpt-3.5-turbo",
  });
  response.value=completion.choices[0].message.content;
  console.log(response.value);

}
main();

</script>

<template>
  <div>
    <NuxtLayout>
      <div class="container mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold">{{ response }}</h1>

        <button onclick="main()">click</button>
      </div>
    </NuxtLayout>
  </div>
</template>
