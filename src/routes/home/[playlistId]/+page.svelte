<script>
    import { Eye, Heart } from 'lucide-svelte';

    let { data } = $props();

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


<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-4">
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

                <div class="px-3 py-2 flex flex-col gap-1">
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-bold text-red-600 shrink-0">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        <p class="text-xs text-zinc-400 truncate group-hover:text-white transition-colors">
                            {video.title}
                        </p>
                    </div>
                    <div class="flex items-center gap-3 text-[10px] text-zinc-600">
                        <span class="flex items-center gap-1 ">
                            <Eye size={11} /> {fmt(video.views)}
                        </span>
                        <span class="flex items-center gap-1 ">
                            <Heart size={11} /> {fmt(video.likes)}
                        </span>
                    </div>
                </div>

            </div>
        {/each}
    </div>