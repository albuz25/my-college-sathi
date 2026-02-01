import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

function isUuid(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  // RFC 4122-ish UUID v1-v5 check
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      currentQualification,
      interestedDegreeName,
      interestedDegreeId,
      source,
      pageUrl,
    } = body;

    // Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit phone number' },
        { status: 400 }
      );
    }

    // Persist lead in Supabase (server-side)
    const supabase = createAdminClient();
    const insertPayload = {
      name,
      phone,
      email: email || null,
      current_qualification: currentQualification || null,
      // Your UI currently uses mock IDs that are NOT UUIDs.
      // Only persist the FK when the provided id is a valid UUID.
      interested_degree_id: isUuid(interestedDegreeId) ? interestedDegreeId : null,
      interested_degree_name: interestedDegreeName || null,
      source: source || 'website',
      page_url: pageUrl || null,
      status: 'new',
    };

    const { data, error } = await supabase
      .from('leads')
      .insert(insertPayload)
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === 'production'
              ? 'Failed to submit enquiry. Please try again.'
              : `Supabase error: ${error.message}`,
        },
        { status: 500 }
      );
    }

    // Return success with brochure URL if applicable
    return NextResponse.json({
      success: true,
      leadId: data.id,
      message: 'Lead captured successfully',
      // Include brochure URL for brochure downloads
      brochureUrl: source === 'brochure_download' ? '/brochures/general-brochure.pdf' : undefined,
    });
  } catch (error) {
    console.error('Error capturing lead:', error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === 'production'
            ? 'Failed to submit enquiry. Please try again.'
            : `Server error: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Minimal health check (avoid exposing lead data publicly)
  return NextResponse.json({ message: 'Leads API is working' });
}
