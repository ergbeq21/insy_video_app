<script>
    let { data } = $props();

    let playlists = $derived(data.playlists);


</script>

<h1>Playlists</h1>
<ul>
    {#each playlists as playlist}
        <li>
            <a href={`/playlist/${playlist.id}`} class="text-blue-500 hover:underline">
                {playlist.name} 
            </a>
        </li>
    {/each}
</ul>