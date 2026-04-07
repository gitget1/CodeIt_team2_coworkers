import { uploadImage } from "@/features/user";


type ImageInput = { type: 'file'; file: File } | { type: 'url'; url: string };

export async function handleImages(images: ImageInput[]): Promise<string[]> {
  try {
    const files = images.filter((img) => img.type === 'file').map((img) => img.file);

    const urls = images.filter((img) => img.type === 'url').map((img) => img.url);

    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const res = await uploadImage(file);
        return res.url;
      }),
    );

    return [...urls, ...uploadedUrls];
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
}
