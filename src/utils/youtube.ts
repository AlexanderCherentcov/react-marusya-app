export function getYoutubeEmbedUrl(
  trailerYoutubeId?: string,
  trailerUrl?: string,
): string | null {
  if (trailerYoutubeId) {
    return `https://www.youtube.com/embed/${trailerYoutubeId}`;
  }

  if (!trailerUrl) return null;

  try {
    const url = new URL(trailerUrl);

    if (url.hostname.includes('youtube.com')) {
      const id = url.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    if (url.hostname === 'youtu.be') {
      const id = url.pathname.replace('/', '');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch (e) {
    console.error('Некорректный trailerUrl:', trailerUrl, e);
  }

  return null;
}
