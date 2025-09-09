import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    
    if (!tag) {
      return NextResponse.json(
        { error: 'Tag parameter is required' },
        { status: 400 }
      );
    }
    
    // Revalidate the specific tag
    revalidateTag(tag);
    
    return NextResponse.json({
      success: true,
      message: `Successfully revalidated tag: ${tag}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error revalidating tag:', error);
    return NextResponse.json(
      { 
        error: 'Failed to revalidate tag',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}
