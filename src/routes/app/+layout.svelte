<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Users from '@lucide/svelte/icons/users';
	import ScrollText from '@lucide/svelte/icons/scroll-text';
	import CircleQuestionMark from '@lucide/svelte/icons/circle-question-mark';

	let { data, children } = $props();
</script>

<div class="flex h-full w-full">
	<div class="flex h-full w-24 flex-col border-r p-6 space-y-6">
		<Button size="icon-lg" variant="ghost" href="/app">
			<CircleQuestionMark class="size-7" />
		</Button>
		<Button size="icon-lg" variant="ghost" href="/app/posts">
			<ScrollText class="size-7" />
		</Button>
		<Button size="icon-lg" variant="ghost" href="/app/users">
			<Users class="size-7" />
		</Button>
	</div>
	<div class="flex h-full w-full flex-col overflow-x-hidden overflow-y-scroll p-4">
		<!-- <div class="w-full px-4 py-1 text-2xl">
			FIA {'<logo>'}
		</div> -->
		{@render children()}
	</div>
</div>
