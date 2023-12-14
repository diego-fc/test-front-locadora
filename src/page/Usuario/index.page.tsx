"use client"
import { useRouter } from 'next/navigation'

export const Home: React.FC = () => {
  const router = useRouter()

  function fnOnClickGuide() {
    router.push('/Guide')
  }

  function fnOnClickStart() {
    router.push('/RecipeFilter')
  }

  return (
    <div>testando</div>
  )
}
