import { PortableText as BasePortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

// Custom components for portable text rendering
const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      
      return (
        <div className="my-8">
          <Image
            src={urlFor(value)}
            alt={value.alt || 'Blog image'}
            width={800}
            height={600}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const target = value?.blank ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined
      
      return (
        <Link 
          href={value?.href || '#'} 
          target={target}
          rel={rel}
          className="text-pink-600 hover:text-pink-800 underline"
        >
          {children}
        </Link>
      )
    },
  },
  block: {
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-semibold mb-4 mt-6">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-semibold mb-3 mt-5">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-semibold mb-2 mt-4">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-pink-500 pl-6 py-2 my-6 bg-gray-50 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc ml-6 mb-4 space-y-1">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal ml-6 mb-4 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
}

interface PortableTextProps {
  content: any
  className?: string
}

export function PortableText({ content, className = '' }: PortableTextProps) {
  if (!content) return null
  
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <BasePortableText value={content} components={components} />
    </div>
  )
}