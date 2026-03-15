<script>
	import { Eye, Heart, ArrowUp, ArrowDown, ChevronLeft, Search } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { SvelteURLSearchParams } from 'svelte/reactivity';

	let { data } = $props();

    let search  = $derived(page.url.searchParams.get('q') ?? '');

	let sortBy = $derived(page.url.searchParams.get('sortBy') ?? 'default');
	let asc = $derived(page.url.searchParams.get('asc') === 'true');

	function onSearch(e) {
		const params = new SvelteURLSearchParams(page.url.searchParams);
		const val = e.target.value.trim();

        if (val) {
            params.set('q', val);
        } else {
            params.delete('q');
        }
        goto(resolve(`${page.url.pathname}?${params.toString()}`), { keepFocus: true, replaceState: true });
    }

	function setSort(key) {
		const params = new SvelteURLSearchParams(page.url.searchParams);

		if (sortBy === key) {
			params.set('asc', String(!asc));
		} else {
			params.set('sortBy', key);
			params.set('asc', 'false');
		}

		goto(resolve(`${page.url.pathname}?${params.toString()}`), { keepFocus: true });
	}

	function toEmbedUrl(url) {
		try {
			const u = new URL(url);
			const id = u.searchParams.get('v') || u.pathname.slice(1);
			return `https://www.youtube.com/embed/${id}`;
		} catch {
			return url;
		}
	}

	function fmt(n) {
		if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
		if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
		return String(n);
	}
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-zinc-300">
	<header class="flex flex-col border-b border-zinc-800 px-6 pt-4 pb-5">
		<!-- Back link -->
		<a
			href={resolve('/home')}
			class="mb-4 flex w-fit items-center gap-1.5 text-[11px] uppercase tracking-widest text-zinc-600 transition-colors duration-150 hover:text-red-500"
		>
			<ChevronLeft size={13} />
			All Playlists
		</a>

		<!-- Title row -->
		<div class="flex items-end justify-between">
			<div class="flex items-end gap-3">
				<h1
					class="text-5xl leading-none tracking-widest text-white"
					style="font-family: 'Bebas Neue'"
				>
					Screen<span class="text-red-600">vault</span>
				</h1>
				<span class="pb-1 text-xs tracking-widest text-zinc-600 uppercase">
					{data.videos.length} videos
				</span>
			</div>

			<!-- Search + Sort -->
			<div class="flex items-center gap-3 pb-1">
				<div class="relative flex items-center">
					<Search size={12} class="absolute left-3 text-zinc-500 pointer-events-none" />
					<input
						type="text"
						value={search}
						oninput={onSearch}
						placeholder="Search videos…"
						class="w-48 rounded bg-zinc-800 py-1.5 pl-8 pr-3 text-xs text-zinc-300 placeholder-zinc-600
						       outline-none ring-1 ring-zinc-700 transition-all duration-200
						       focus:ring-red-600 focus:text-white"
					/>
				</div>
				{#each [{ key: 'views', icon: Eye }, { key: 'likes', icon: Heart }] as s (s.key)}
					<button
						onclick={() => setSort(s.key)}
						class="flex items-center gap-1.5 rounded px-3 py-1.5 text-xs transition-all duration-200
                        {sortBy === s.key
							? 'bg-red-600 text-white'
							: 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}"
					>
						<s.icon size={11} />
						{s.key.charAt(0).toUpperCase() + s.key.slice(1)}
						{#if sortBy === s.key}
							{#if asc}
								<ArrowUp size={11} />
							{:else}
								<ArrowDown size={11} />
							{/if}
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</header>

	<div class="grid grid-cols-2 gap-3 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each data.videos as video, i (video._id)}
			<div
				class="group overflow-hidden rounded bg-zinc-900 transition-all duration-300 hover:ring-1 hover:ring-red-600"
			>
				<div class="aspect-video">
					<iframe
						class="h-full w-full"
						src={toEmbedUrl(video.url)}
						title={video.title}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					></iframe>
				</div>

				<div class="flex flex-col gap-1 px-3 py-2">
					<div class="flex items-center gap-2">
						<span class="shrink-0 text-[10px] font-bold text-red-600">
							{String(i + 1).padStart(2, '0')}
						</span>
						<p class="truncate text-xs text-zinc-400 transition-colors group-hover:text-white">
							{video.title}
						</p>
					</div>
					<div class="flex items-center gap-3 text-[10px] text-zinc-600">
						<span class="flex items-center gap-1">
							<Eye size={11} />
							{fmt(video.views)}
						</span>
						<span class="flex items-center gap-1">
							<Heart size={11} />
							{fmt(video.likes)}
						</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
