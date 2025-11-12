<script lang="ts">
	let { data } = $props();
	import * as InputGroup from '$lib/components/ui/input-group/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import ArrowUpIcon from '@lucide/svelte/icons/arrow-up';
	import PlusIcon from '@lucide/svelte/icons/plus';
</script>

<div class="mx-auto flex h-full w-full max-w-3xl flex-col items-center justify-center">
	<h1 class="text-4xl font-semibold">SOME NICE TEXT</h1>
	<InputGroup.Root class="mt-8">
		<InputGroup.Textarea placeholder="Ask, Search or Chat..." />
		<InputGroup.Addon align="block-end">
			<InputGroup.Button variant="outline" class="rounded-full" size="icon-xs">
				<PlusIcon />
			</InputGroup.Button>
			<InputGroup.Text class="ml-auto">52% used</InputGroup.Text>
			<Separator orientation="vertical" class="!h-4" />
			<InputGroup.Button variant="default" class="rounded-full" size="icon-xs" disabled>
				<ArrowUpIcon />
				<span class="sr-only">Send</span>
			</InputGroup.Button>
		</InputGroup.Addon>
	</InputGroup.Root>
</div>
