import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Partner } from '@/lib/models';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { organizationName, contactPerson, email, phone, country, interest, message } = body;

    if (!organizationName || !contactPerson || !email || !phone || !country || !interest) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const partnerReq = await Partner.create({
      organizationName,
      contactPerson,
      email,
      phone,
      country,
      interest,
      message,
    });

    return NextResponse.json({ success: true, data: partnerReq }, { status: 201 });
  } catch (error) {
    console.error('Partner submission error:', error);
    return NextResponse.json({ error: 'Failed to submit partnership request' }, { status: 500 });
  }
}
