<script lang="ts">
	import * as InputGroup from '$lib/components/ui/input-group/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { handleError } from '$lib/consts.js';
	import { analyzeMovieScript, findMovieScripts } from '$lib/data.remote.js';
	import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	let btnDisabled = $state(false);
	let query = $state('titanic');
	let options = $state<string[]>([]);

	async function localFindMovieScripts() {
		btnDisabled = true;
		try {
			options = await findMovieScripts({ query });
			console.log(options);
		} catch (err) {
			handleError(err);
		}
		btnDisabled = false;
	}

	async function localAnalyzeMovieScripts(scriptUrl: string) {
		btnDisabled = true;
		try {
			const script = await analyzeMovieScript({ scriptUrl });
			console.log(script);
			toast.success('Success');
		} catch (err) {
			handleError(err);
		}
		btnDisabled = false;
	}
</script>

<div class="absolute top-4 right-7">
	<img src="/logo.jpg" alt="FIA Logo" class="h-20 w-auto" />
</div>
<div class="pointer-events-none absolute inset-0 -z-50 flex items-center justify-center">
	<img src="/grad_lines.png" alt="Background lines" class="max-w-10xl ml-18 w-full opacity-100" />
</div>
<div class="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center">
	<h1
		class="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text pb-2 text-4xl leading-[1.2] font-bold text-transparent"
	>
		Welcome to Digital Think Tank!
	</h1>
	<InputGroup.Root
		class="mt-8 rounded-xl focus-within:[box-shadow:0_0_4px_rgb(255,_124,_229),0_0_8px_rgb(124,_200,_255)]"
	>
		<textarea
			bind:value={query}
			placeholder="Ask, Search or Chat..."
			class="w-full resize-none border-none bg-transparent px-4 py-4 !text-lg text-lg placeholder:text-lg focus:outline-none"
		></textarea>

		<InputGroup.Addon align="block-end">
			<InputGroup.Button
				variant="default"
				class="ml-auto cursor-pointer rounded-full bg-[#ff7ce5]
            p-2 text-white 
            shadow-md transition hover:bg-[#ff5ed9]"
				size="icon-xs"
				onclick={localFindMovieScripts}
				disabled={btnDisabled}
			>
				<ArrowUpIcon />
				<span class="sr-only">Send</span>
			</InputGroup.Button>
		</InputGroup.Addon>
	</InputGroup.Root>
	<div class="mt-5 flex flex-col">
		{#each options as script}
			<button
				disabled={btnDisabled}
				onclick={async () => await localAnalyzeMovieScripts(script)}
				class="cursor-pointer">{script}</button
			>
		{/each}
	</div>
</div>
