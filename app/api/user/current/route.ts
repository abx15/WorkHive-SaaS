import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/middleware';
import db from '@/lib/db';

async function handleGetCurrentUser(user: any, request: NextRequest) {
  try {
    const userWithMembership = await db.user.findUnique({
      where: { id: user.id },
      include: {
        memberships: {
          include: {
            workspace: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
          take: 1, // Get the first workspace for now
        },
      },
    });

    if (!userWithMembership) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const membership = userWithMembership.memberships[0];
    
    return NextResponse.json({
      id: userWithMembership.id,
      email: userWithMembership.email,
      name: userWithMembership.name,
      role: membership?.role,
      workspaceId: membership?.workspaceId,
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch current user' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handleGetCurrentUser);
