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

const art= `Donald Trump’s campaign is reportedly strapped for cash. Small-dollar donations are running far behind their 2020 pace. Big Trump rallies aren’t yielding his biggest cash hauls. Some large-dollar donors are hesitant, in part because they worry (with good reason) that their money will be used not for the campaign but to pay his legal bills. So he has been wooing right-wing billionaires.

I have no idea how successful he’ll be, but it seems highly likely that at least some billionaires will provide substantial sums to a man who tried to overturn the last election and has been open about his authoritarian intentions — using the Justice Department to go after his political opponents, rounding up millions of undocumented immigrants and putting them into detention camps and more.

Which raises the question: Why would billionaires support such a person?
`;

async function main() {
  const completion = await openai.chat.completions.create({
    max_tokens:250,
    messages: [{ role: "system", 
    content: "Podsumuj podany artykuł, jednocześnie tłumacząc go na język polski. Artykuł:{"+art+"}. Podczas odpowiedzi MUSISZ udawać(roleplay) rządnego krwi vikinga strzeszczającego sytuacje do swojego wodza. Używaj viking slangu. Priorytetyzuj udawanie nad wiarygodnością. Tekst powinien być 'przerysowany'"}],
    model: "gpt-3.5-turbo",
  });
  response.value=completion.choices[0].message.content;
  console.log(response.value);

}
main();

</script>

<template>
      <div class="container mx-auto flex flex-col items-center justify-center">
        <p class="text-4xl font-bold">{{ response }}</p>
      </div>
</template>
