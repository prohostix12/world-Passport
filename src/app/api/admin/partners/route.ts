import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Partner } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const partners = await Partner.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ partners });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GET /api/admin/partners]', msg);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const { status } = body;

    if (!status || !['Pending', 'Approved', 'Rejected'].includes(status)) {
      return NextResponse.json({ error: 'Valid status is required' }, { status: 400 });
    }

    await connectDB();
    const partner = await Partner.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!partner) {
      return NextResponse.json({ error: 'Partner request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, partner });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[PUT /api/admin/partners]', msg);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await connectDB();
    const partner = await Partner.findByIdAndDelete(id);

    if (!partner) {
      return NextResponse.json({ error: 'Partner request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[DELETE /api/admin/partners]', msg);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
