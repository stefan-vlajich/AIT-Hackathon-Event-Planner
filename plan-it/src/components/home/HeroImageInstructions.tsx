// Demo component showing how to use the hero image once you add it

// 1. Add your hero.png file to: src/assets/images/home/hero.png
// 2. Uncomment the import line in Hero.tsx:
//    import heroImage from '@/assets/images/home/hero.png'
// 3. Replace the temporary gradient background with:
//    backgroundImage: `url(${heroImage})`,

export function HeroImageInstructions() {
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 m-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Hero Image Setup:</strong> Add your hero.png file to src/assets/images/home/ and uncomment the import in Hero.tsx
          </p>
        </div>
      </div>
    </div>
  )
}
