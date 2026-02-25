import { NextRequest, NextResponse } from 'next/server'
import { getRandomVerbs, getAllVerbs, type VerbCategory } from '@/lib/verbs'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const count = parseInt(searchParams.get('count') || '10')
    const excludeParam = searchParams.get('exclude')
    const category = searchParams.get('category') as VerbCategory | null
    
    // Parser les IDs à exclure
    const excludeIds = excludeParam 
      ? excludeParam.split(',').map(id => parseInt(id)).filter(id => !isNaN(id))
      : []
    
    // Obtenir les verbes aléatoires
    const verbs = getRandomVerbs(count, excludeIds, category || undefined)
    
    return NextResponse.json(verbs, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    console.error('Error in verbs API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch verbs' },
      { status: 500 }
    )
  }
}

// Endpoint pour obtenir tous les verbes (optionnel)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body
    
    if (action === 'getAll') {
      const allVerbs = getAllVerbs()
      return NextResponse.json(allVerbs)
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error in verbs API:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
