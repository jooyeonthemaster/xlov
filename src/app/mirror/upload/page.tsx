'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  useExperienceStore,
  useMirrorMember,
  useMirrorSelfie,
} from '@/hooks/use-experience-store'
import { MEMBERS } from '@/lib/constants'
import { MIRROR_COLOR } from '@/lib/constants/mirror-styles'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  ArrowLeft,
  Camera,
  Upload,
  X,
  RotateCcw,
  ImageIcon,
} from 'lucide-react'

export default function MirrorUploadPage() {
  const router = useRouter()
  const memberId = useMirrorMember()
  const existingSelfie = useMirrorSelfie()
  const { setMirrorSelfie } = useExperienceStore()

  const [preview, setPreview] = useState<string | null>(existingSelfie)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const member = MEMBERS.find((m) => m.id === memberId)

  useEffect(() => {
    if (!member) {
      router.push('/mirror/select')
    }
  }, [member, router])

  const processFile = useCallback((file: File) => {
    setError(null)

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 업로드할 수 있습니다')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('파일 크기는 10MB 이하여야 합니다')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
    }
    reader.onerror = () => {
      setError('파일을 읽는 중 오류가 발생했습니다')
    }
    reader.readAsDataURL(file)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        processFile(file)
      }
    },
    [processFile]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleRemove = () => {
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleContinue = () => {
    if (!preview) return
    setMirrorSelfie(preview)
    router.push('/mirror/style')
  }

  const handleBack = () => {
    router.push('/mirror/select')
  }

  if (!member) {
    return null
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em]"
            style={{
              backgroundColor: `${MIRROR_COLOR}20`,
              color: MIRROR_COLOR,
            }}
          >
            STEP 1 OF 2
          </span>

          <h1 className="font-korean mb-4 text-3xl font-medium md:text-4xl">
            셀카를 업로드해주세요
          </h1>

          <p className="text-[var(--text-secondary)]">
            <span style={{ color: member.accentColor }}>{member.name}</span>의
            스타일로 변신할 사진을 선택해주세요
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
                  isDragging
                    ? 'scale-[1.02] border-white/50 bg-white/10'
                    : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                }`}
                style={{
                  borderColor: isDragging ? MIRROR_COLOR : undefined,
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-4">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${MIRROR_COLOR}20` }}
                  >
                    {isDragging ? (
                      <Upload className="h-10 w-10" style={{ color: MIRROR_COLOR }} />
                    ) : (
                      <Camera className="h-10 w-10" style={{ color: MIRROR_COLOR }} />
                    )}
                  </div>

                  <div>
                    <p className="mb-2 text-lg font-medium">
                      {isDragging ? '여기에 놓아주세요' : '사진을 선택하세요'}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      클릭하거나 드래그 앤 드롭
                    </p>
                    <p className="mt-2 text-xs text-[var(--text-muted)]">
                      JPG, PNG, WEBP • 최대 10MB
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative"
              >
                {/* Preview Image */}
                <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-3xl border-2 border-white/20">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />

                  {/* Member style overlay hint */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${member.accentColor}60 100%)`,
                    }}
                  />

                  {/* Remove button */}
                  <button
                    onClick={handleRemove}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Change photo button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10"
                >
                  <RotateCcw className="h-4 w-4" />
                  다른 사진 선택
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${MIRROR_COLOR}20` }}
            >
              <ImageIcon className="h-3 w-3" style={{ color: MIRROR_COLOR }} />
            </div>
            <div>
              <p className="mb-1 text-sm font-medium">좋은 결과를 위한 팁</p>
              <ul className="space-y-1 text-xs text-white/60">
                <li>• 얼굴이 잘 보이는 정면 사진</li>
                <li>• 밝은 조명에서 촬영한 사진</li>
                <li>• 너무 작거나 흐릿하지 않은 사진</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4"
        >
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            뒤로
          </Button>

          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={!preview}
            className="gap-2"
            style={{
              backgroundColor: preview ? MIRROR_COLOR : undefined,
            }}
          >
            다음
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
