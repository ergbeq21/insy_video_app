<script>
    let { data } = $props();

    function toEmbedUrl(url) {
        try {
            const parsed = new URL(url);
            const videoId = parsed.searchParams.get("v");
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
            return url;
        } catch {
            return "";
        }
    }
</script>



<div class="min-h-screen bg-zinc-950 text-zinc-300">


    <header class="px-6 py-6 border-b border-zinc-800 flex items-end gap-3">
        <h1 class="text-5xl leading-none tracking-widest text-white" style="font-family: 'Bebas Neue'">
            Screen<span class="text-red-600">vault</span>
        </h1>
        <span class="text-xs tracking-widest uppercase text-zinc-600 pb-1">
            {data.videos.length} videos
        </span>
    </header>


    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-5">
        {#each data.videos as video, i (video._id)}
            <div class="group bg-zinc-900 rounded overflow-hidden hover:ring-1 hover:ring-red-600 transition-all duration-300">


                <div class="aspect-video">
                    <iframe
                        class="w-full h-full"
                        src={toEmbedUrl(video.url)}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>


                <div class="px-3 py-2 flex items-center gap-2">
                    <span class="text-[10px] font-bold text-red-600 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    <p class="text-xs text-zinc-400 truncate group-hover:text-white transition-colors">
                        {video.title}
                    </p>
                </div>

            </div>
        {/each}
    </div>

</div>


<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
</svelte:head>