import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      degreeId,
      degreeName,
      lead,
    } = body;

    // Validation
    if (!lead?.name || !lead?.phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // In production, save lead to Supabase
    // const { data: savedLead, error } = await supabase
    //   .from('leads')
    //   .insert({
    //     name: lead.name,
    //     phone: lead.phone,
    //     email: lead.email,
    //     current_qualification: lead.qualification,
    //     interested_degree_id: degreeId,
    //     interested_degree_name: degreeName,
    //     source: 'brochure_download',
    //     page_url: lead.pageUrl,
    //   })
    //   .select()
    //   .single();

    // In production, fetch degree brochure URL from Supabase
    // const { data: degree } = await supabase
    //   .from('degrees')
    //   .select('brochure_url')
    //   .eq('id', degreeId)
    //   .single();

    // For demo, return a mock brochure URL
    const brochureUrl = degreeId 
      ? `/brochures/${degreeName?.toLowerCase() || 'degree'}-brochure.pdf`
      : '/brochures/general-brochure.pdf';

    console.log('Brochure download request:', {
      degreeId,
      degreeName,
      leadName: lead.name,
      leadPhone: lead.phone,
    });

    return NextResponse.json({
      success: true,
      brochureUrl,
      message: 'Brochure ready for download',
    });
  } catch (error) {
    console.error('Error processing brochure request:', error);
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
