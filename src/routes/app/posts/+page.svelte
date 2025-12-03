<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import ScrollText from '@lucide/svelte/icons/scroll-text';
	import Clock from '@lucide/svelte/icons/clock';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import Sparkles from '@lucide/svelte/icons/sparkles';

	// Mock data for testing - remove this and uncomment the line below when database is ready
	const data = {
		posts: [
			{
				id: 1,
				title: "Emotional Manipulation in Romantic Context",
				body: "The scene demonstrates classic gaslighting behavior where the male character repeatedly denies the female character's perception of events, causing her to question her own memory and judgment. This pattern is consistent with psychological abuse tactics.",
				when_created: new Date('2024-01-15T10:30:00')
			},
			{
				id: 2,
				title: "Coercive Control Through Isolation",
				body: "Analysis reveals systematic attempts to isolate the victim from friends and family. The abuser uses guilt and manufactured crises to prevent social connections, a hallmark of coercive control patterns.",
				when_created: new Date('2024-01-14T14:20:00')
			},
			{
				id: 3,
				title: "Financial Abuse and Dependency",
				body: "The dialogue exposes financial control tactics where one partner restricts access to money and employment opportunities, creating economic dependency that makes leaving the relationship difficult.",
				when_created: new Date('2024-01-13T09:15:00')
			}
		]
	};
	
	// Uncomment this line when database is working:
	// let { data } = $props();

	function formatDate(date: Date | null) {
		if (!date) return 'Unknown';
		return new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(new Date(date));
	}

	function truncateBody(body: string, maxLength: number = 180) {
		if (body.length <= maxLength) return body;
		return body.substring(0, maxLength).trim() + '...';
	}
</script>

<!-- Background decoration -->
<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-30">
	<div class="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-pink-400/40 to-purple-500/40 blur-3xl"></div>
	<div class="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-400/40 to-cyan-500/40 blur-3xl"></div>
</div>

<div class="relative mx-auto w-full max-w-7xl px-4 py-6">
	<!-- Header Section -->
	<div class="mb-8 flex items-center justify-between">
		<div class="flex items-center gap-4">
			<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/25">
				<ScrollText class="h-6 w-6 text-white" />
			</div>
			<div>
				<h1 class="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
					Analysis Summary
				</h1>
				<p class="text-sm text-muted-foreground">
					AI-detected patterns from analyzed scripts
				</p>
			</div>
		</div>
		<Badge variant="secondary" class="gap-1.5 px-3 py-1.5">
			<Sparkles class="h-3.5 w-3.5 text-pink-500" />
			<span class="font-medium">{data.posts.length} findings</span>
		</Badge>
	</div>

	<!-- Empty State -->
	{#if data.posts.length === 0}
		<div class="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/25 bg-muted/30 p-12">
			<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20">
				<ScrollText class="h-8 w-8 text-pink-400" />
			</div>
			<h3 class="mb-2 text-xl font-semibold text-foreground">No analyses yet</h3>
			<p class="max-w-sm text-center text-muted-foreground">
				Start by searching for a movie script on the main page. The AI will analyze scenes and findings will appear here.
			</p>
			<Button 
				href="/app" 
				class="mt-6 bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600"
			>
				Search Scripts
				<ChevronRight class="ml-1 h-4 w-4" />
			</Button>
		</div>
	{:else}
		<!-- Posts Grid -->
		<div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
			{#each data.posts as post, i}
				<Card.Root 
					class="group relative overflow-hidden border-muted/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-pink-500/30 hover:shadow-xl hover:shadow-pink-500/10"
					style="animation: fadeInUp 0.4s ease-out {i * 0.05}s both;"
				>
					<!-- Gradient accent line -->
					<div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
					
					<Card.Header class="pb-3">
						<div class="flex items-start justify-between gap-3">
							<Card.Title class="line-clamp-2 text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-pink-500">
								{post.title}
							</Card.Title>
							<Badge variant="outline" class="shrink-0 border-pink-500/30 text-pink-500">
								#{data.posts.length - i}
							</Badge>
						</div>
						<div class="flex items-center gap-1.5 text-xs text-muted-foreground">
							<Clock class="h-3 w-3" />
							<span>{formatDate(post.when_created)}</span>
						</div>
					</Card.Header>
					
					<Card.Content>
						<p class="text-sm leading-relaxed text-muted-foreground">
							{truncateBody(post.body)}
						</p>
					</Card.Content>
					
					<Card.Footer class="pt-3">
						<Button 
							variant="ghost" 
							size="sm" 
							class="ml-auto gap-1 text-pink-500 hover:bg-pink-500/10 hover:text-pink-600"
						>
							Read full analysis
							<ChevronRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
						</Button>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>