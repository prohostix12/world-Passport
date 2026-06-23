import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { University } from '@/lib/models';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await connectDB();
    
    if (id) {
      const university = await University.findById(id);
      if (!university) {
        return NextResponse.json({ error: 'University not found' }, { status: 404 });
      }
      return NextResponse.json({ university });
    }

    const universities = await University.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ universities });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GET /api/admin/universities]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, country, city, type, description, availableCourses } = body;
    if (!name || !country || !city || !type || !description || !availableCourses) {
      return NextResponse.json({ error: 'Name, country, city, type, description, and availableCourses are required' }, { status: 400 });
    }
    await connectDB();
    const safe = {
      name: body.name,
      image: body.image || undefined,
      country: body.country,
      city: body.city,
      type: body.type,
      description: body.description,
      establishedYear: body.establishedYear || undefined,
      campusLocation: body.campusLocation || undefined,
      website: body.website || undefined,
      ranking: body.ranking || undefined,
      availableCourses: body.availableCourses,
      degreeLevels: body.degreeLevels || [],
      studyFields: body.studyFields || [],
      intakeMonths: body.intakeMonths || undefined,
      applicationDeadline: body.applicationDeadline || undefined,
      minAcademicRequirement: body.minAcademicRequirement || undefined,
      englishRequirement: body.englishRequirement || undefined,
      tuitionFee: body.tuitionFee || undefined,
      applicationFee: body.applicationFee || undefined,
      scholarshipAvailable: body.scholarshipAvailable || false,
      scholarshipDetails: body.scholarshipDetails || undefined,
      internationalStudentsAccepted: body.internationalStudentsAccepted || false,
      accommodationAvailable: body.accommodationAvailable || false,
      accommodationDetails: body.accommodationDetails || undefined,
      universityImages: body.universityImages || [],
      campusVideoUrl: body.campusVideoUrl || undefined,
      emailAddress: body.emailAddress || undefined,
      phoneNumber: body.phoneNumber || undefined,
      address: body.address || undefined,
      featuredUniversity: body.featuredUniversity || false,
      activeStatus: body.activeStatus !== undefined ? body.activeStatus : true,
    };
    const university = await University.create(safe);
    return NextResponse.json({ success: true, university }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[POST /api/admin/universities]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const body = await req.json();
    const safe = {
      name: body.name,
      image: body.image !== undefined ? body.image : undefined,
      country: body.country,
      city: body.city,
      type: body.type,
      description: body.description,
      establishedYear: body.establishedYear !== undefined ? body.establishedYear : undefined,
      campusLocation: body.campusLocation !== undefined ? body.campusLocation : undefined,
      website: body.website !== undefined ? body.website : undefined,
      ranking: body.ranking !== undefined ? body.ranking : undefined,
      availableCourses: body.availableCourses,
      degreeLevels: body.degreeLevels !== undefined ? body.degreeLevels : [],
      studyFields: body.studyFields !== undefined ? body.studyFields : [],
      intakeMonths: body.intakeMonths !== undefined ? body.intakeMonths : undefined,
      applicationDeadline: body.applicationDeadline !== undefined ? body.applicationDeadline : undefined,
      minAcademicRequirement: body.minAcademicRequirement !== undefined ? body.minAcademicRequirement : undefined,
      englishRequirement: body.englishRequirement !== undefined ? body.englishRequirement : undefined,
      tuitionFee: body.tuitionFee !== undefined ? body.tuitionFee : undefined,
      applicationFee: body.applicationFee !== undefined ? body.applicationFee : undefined,
      scholarshipAvailable: body.scholarshipAvailable !== undefined ? body.scholarshipAvailable : false,
      scholarshipDetails: body.scholarshipDetails !== undefined ? body.scholarshipDetails : undefined,
      internationalStudentsAccepted: body.internationalStudentsAccepted !== undefined ? body.internationalStudentsAccepted : false,
      accommodationAvailable: body.accommodationAvailable !== undefined ? body.accommodationAvailable : false,
      accommodationDetails: body.accommodationDetails !== undefined ? body.accommodationDetails : undefined,
      universityImages: body.universityImages !== undefined ? body.universityImages : [],
      campusVideoUrl: body.campusVideoUrl !== undefined ? body.campusVideoUrl : undefined,
      emailAddress: body.emailAddress !== undefined ? body.emailAddress : undefined,
      phoneNumber: body.phoneNumber !== undefined ? body.phoneNumber : undefined,
      address: body.address !== undefined ? body.address : undefined,
      featuredUniversity: body.featuredUniversity !== undefined ? body.featuredUniversity : false,
      activeStatus: body.activeStatus !== undefined ? body.activeStatus : true,
    };
    await connectDB();
    const university = await University.findByIdAndUpdate(id, safe, { new: true, runValidators: true });
    if (!university) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, university });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[PUT /api/admin/universities]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await connectDB();
    await University.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[DELETE /api/admin/universities]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
