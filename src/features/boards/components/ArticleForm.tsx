import { Button } from '@/shared/ui/Button';
import { FormField } from '@/shared/ui/formfield/index';
import { ImagePreviewList } from '@/shared/ui/imagePicker/ImagePreviewList';
import { ImageUploadSlot } from '@/shared/ui/imagePicker/ImageUploadSlot';
import Link from 'next/link';
import { useState } from 'react';
type ImageItem = { type: 'file'; file: File } | { type: 'url'; url: string };
type Props = {
  initialTitle?: string;
  initialContent?: string;
  initialImages?: ImageItem[];
  onSubmit: (data: { title: string; content: string; images: ImageItem[] }) => void;
  mode?: 'create' | 'edit';
};

export function ArticleForm({
  initialTitle = '',
  initialContent = '',
  initialImages = [],
  onSubmit,
  mode = 'create',
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const MAX_COUNT = 1;
  const isTitleInvalid = !title.trim();
  const isContentInvalid = !content.trim();

  const handleUpload = (files: FileList) => {
    const fileArray = Array.from(files);

    const newImages: ImageItem[] = fileArray.map((file) => ({
      type: 'file',
      file,
    }));

    setImages((prev) => [...prev, ...newImages].slice(0, MAX_COUNT));
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({ title, content, images });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-screen items-start justify-center bg-gray-100 p-6"
    >
      <div className="relative w-full max-w-225 rounded-2xl bg-white p-5 px-18 pt-9 pb-18 shadow-xl">
        <Link href="/boards" className="text-slate-400">
          뒤로가기
        </Link>

        <h2 className="mb-4 pt-5 text-xl font-bold">
          {mode === 'edit' ? '게시글 수정' : '게시글 쓰기'}
        </h2>
        <div className="mt-10 mb-4">
          <FormField isInvalid={isTitleInvalid}>
            <FormField.Label>
              제목 <span className="text-red-500">*</span>
            </FormField.Label>

            <FormField.Control>
              <input
                type="text"
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-txt-default mt-3 h-12 w-full rounded-lg border border-slate-200 px-3 py-2 text-lg"
              />
            </FormField.Control>

            <FormField.Message>{isTitleInvalid && '제목을 입력해주세요.'}</FormField.Message>
          </FormField>
        </div>
        <div className="mt-9 mb-4">
          <FormField isInvalid={isContentInvalid}>
            <FormField.Label>
              내용 <span className="text-red-500">*</span>
            </FormField.Label>

            <FormField.Control>
              <textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="text-txt-default mt-3 h-60 w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-lg"
              />
            </FormField.Control>

            <FormField.Message>{isContentInvalid && '내용을 입력해주세요.'}</FormField.Message>
          </FormField>
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-lg font-bold">이미지</label>

          <div className="mt-3 flex flex-wrap gap-2">
            <ImageUploadSlot
              disabled={images.length >= MAX_COUNT}
              onUpload={handleUpload}
              count={images.length}
              maxCount={MAX_COUNT}
            />

            <ImagePreviewList images={images} onRemove={handleRemove} />
          </div>
        </div>
        <Button type="submit" className="mt-14 h-12 w-full rounded-[12px]">
          {mode === 'edit' ? '수정하기' : '등록하기'}
        </Button>
      </div>
    </form>
  );
}
