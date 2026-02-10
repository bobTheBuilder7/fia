<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import Users from '@lucide/svelte/icons/users';
	import ScrollText from '@lucide/svelte/icons/scroll-text';
	import Home from '@lucide/svelte/icons/house';

	let { data, children } = $props();
</script>

<div class="flex h-full w-full">
	<div class="flex h-full w-24 flex-col items-center border-r border-slate-200/70 bg-white/70 p-4 backdrop-blur-xl space-y-4">
		<!-- FIA Logo -->
		<img src="/logo.jpg" alt="FIA Logo" class="h-12 w-12 rounded-2xl object-cover shadow-sm" />

		<div class="h-px w-10 bg-slate-200/80" />

		<!-- Home -->
		<Button
			size="icon-lg"
			variant="ghost"
			href="/app"
			class="rounded-2xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
		>
			<Home class="size-7 text-pink-300" />
		</Button>

		<!-- Posts -->
		<Button
			size="icon-lg"
			variant="ghost"
			href="/app/posts"
			class="rounded-2xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
		>
			<ScrollText class="size-7 text-pink-300" />
		</Button>

		<!-- Users -->
		<Button
			size="icon-lg"
			variant="ghost"
			href="/app/users"
			class="rounded-2xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
		>
			<Users class="size-7 text-pink-300" />
		</Button>
	</div>

	<div class="flex h-full w-full flex-col overflow-x-hidden overflow-y-scroll p-4">
		{@render children()}
	</div>
</div>
