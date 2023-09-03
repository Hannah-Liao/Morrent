export const filterImage = async (files: FileList | null) => {
  try {
    const data = new FormData();
    if (!files) return;

    Array.from(files).map((f) => {
      data.append('image', f, f.name);
    });

    const options = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': import.meta.env.X_RAPID_API_KEY,
        'X-RapidAPI-Host': import.meta.env.X_RAPID_API_HOST,
      },
      body: data,
    };

    const results = await fetch(
      'https://nsfw-images-detection-and-classification.p.rapidapi.com/adult-content-file',
      options,
    );

    const json = await results.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
