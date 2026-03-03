<script>
	import { ListVideo, ChevronRight } from 'lucide-svelte';

	let { data } = $props();
	let playlists = $derived(data.playlists);
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-zinc-300">

	<!-- Header -->
	<header class="flex items-end justify-between border-b border-zinc-800 px-6 py-6">
		<div class="flex items-end gap-3">
			<h1
				class="text-5xl leading-none tracking-widest text-white"
				style="font-family: 'Bebas Neue'"
			>
				Screen<span class="text-red-600">vault</span>
			</h1>
			<span class="pb-1 text-xs tracking-widest uppercase text-zinc-600">
				{playlists.length} playlists
			</span>
		</div>
	</header>

	<!-- Playlist Grid -->
	<main class="p-6">
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each playlists as playlist, i (playlist._id)}
				<a
					href={`/home/${playlist._id}`}
					class="group relative flex items-center gap-4 rounded bg-zinc-900 px-5 py-4
					       border border-zinc-800 hover:border-red-600 hover:bg-zinc-800
					       transition-all duration-200"
				>
					<!-- Number -->
					<span
						class="shrink-0 font-bold text-2xl leading-none text-zinc-700 group-hover:text-red-600 transition-colors duration-200"
						style="font-family: 'Bebas Neue'"
					>
						{String(i + 1).padStart(2, '0')}
					</span>

					<!-- Divider -->
					<span class="h-8 w-px shrink-0 bg-zinc-700 group-hover:bg-red-900 transition-colors duration-200"></span>

					<!-- Icon + Name -->
					<div class="flex min-w-0 flex-1 flex-col gap-0.5">
						<div class="flex items-center gap-2">
							<ListVideo size={13} class="shrink-0 text-zinc-600 group-hover:text-red-500 transition-colors duration-200" />
							<span class="text-[10px] uppercase tracking-widest text-zinc-600">Playlist</span>
						</div>
						<p class="truncate text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-200">
							{playlist.name}
						</p>
					</div>

					<!-- Arrow -->
					<ChevronRight
						size={16}
						class="shrink-0 text-zinc-700 group-hover:text-red-600 transition-all duration-200 group-hover:translate-x-0.5"
					/>
				</a>
			{/each}
		</div>
	</main>

</div>
