<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let apiKey = $state('');
	let showKey = $state(false);
	let loading = $state(false);
	let errorMsg = $state('');

	const VERIFY_ENDPOINT = '/api/auth/verify-key';

	async function handleLogin() {
		errorMsg = '';
		const key = apiKey.trim();
		if (!key) {
			errorMsg = 'Please enter your API key.';
			return;
		}

		loading = true;
		try {
			const res = await fetch(VERIFY_ENDPOINT, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ apiKey: key })
			});

			if (!res.ok) {
				const text = await res.text().catch(() => '');
				throw new Error(text || 'Invalid API key.');
			}

			localStorage.setItem('apiKey', key);
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Login failed.';
		} finally {
			loading = false;
		}
	}

	function clearKey() {
		apiKey = '';
		errorMsg = '';
	}
</script>

<div class="flex h-full w-full items-center justify-center bg-gradient-to-b from-white to-slate-50 px-4">
	<div class="relative w-full max-w-sm">
		<div class="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-80 blur-[2px]"></div>

		<Card.Root class="relative rounded-3xl border border-slate-200/60 bg-white/80 shadow-xl backdrop-blur">
			<Card.Header>
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<img src="/logo.jpg" alt="Logo" class="h-10 w-10 rounded-xl object-cover" />
						<div>
							<Card.Title class="text-slate-900">Login with API Key</Card.Title>
							<Card.Description class="text-slate-500">Use your OpenAI API key</Card.Description>
						</div>
					</div>

					<Button asChild variant="link" class="text-pink-500 hover:text-pink-600">
						<a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
							Need a key?
						</a>
					</Button>
				</div>
			</Card.Header>

			<Card.Content>
				<form onsubmit={(e) => { e.preventDefault(); handleLogin(); }}>
					<div class="grid gap-2">
						<div class="flex items-center justify-between">
							<Label for="apiKey">API Key</Label>
							<button
								type="button"
								class="text-sm text-slate-600 underline-offset-4 hover:underline"
								onclick={() => (showKey = !showKey)}
							>
								{showKey ? 'Hide' : 'Show'}
							</button>
						</div>

						<Input
							id="apiKey"
							type={showKey ? 'text' : 'password'}
							placeholder="sk-..."
							bind:value={apiKey}
							required
							autocomplete="off"
						/>

						{#if errorMsg}
							<p class="text-sm text-red-500">{errorMsg}</p>
						{/if}
					</div>
				</form>
			</Card.Content>

			<Card.Footer class="flex-col gap-2">
				<Button
					type="submit"
					disabled={loading}
					onclick={handleLogin}
					class="w-full text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-95"
				>
					{loading ? 'Logging in...' : 'Login'}
				</Button>

				<Button variant="outline" class="w-full" type="button" onclick={clearKey}>
					Clear
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>

