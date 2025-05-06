export function getInitials(name: string | null | undefined) {
  if (!name) return 'UK';

  const split = name.split('');
  if (split.length >= 2) {
    return split[0].toUpperCase() + split[1].toUpperCase();
  }
  if (name.length >= 2) {
    return name[0].toUpperCase() + name[1].toUpperCase();
  }
  if (name.length >= 1) {
    return name.toUpperCase();
  }

  return 'UK';
}

export async function fetchImage(imageUrl: string, filename: string) {
  const response = await fetch(imageUrl, {
    referrerPolicy: 'no-referrer'
  });

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const imageBlob = await response.blob();

  // Determine the MIME type from the response headers or the blob type
  const mimeType = response.headers.get('Content-Type') || imageBlob.type;

  const imageFile = new File([imageBlob], filename, {
    type: mimeType,
    lastModified: new Date().getTime(), // Optional: set last modified date
  });

  console.log('Image downloaded and saved as File object:', imageFile);
  return imageFile;
}
