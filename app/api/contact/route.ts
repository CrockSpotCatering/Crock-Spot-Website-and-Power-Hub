import { NextRequest, NextResponse } from 'next/server';

const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/z8YptnIlol2ryLihGK7z/webhook-trigger/72f29b9b-4952-4dde-84d5-8e99f641828d';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Send to GoHighLevel webhook (server-side, no CORS issues)
    const response = await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.eventDate,
        guestCount: formData.guestCount,
        eventType: formData.eventType,
        message: formData.message,
        source: 'Crock Spot Website',
      }),
    });

    const responseText = await response.text();
    console.log('GHL Response Status:', response.status);
    console.log('GHL Response Body:', responseText);

    // GHL webhooks often return empty responses, so we just check for non-error status
    if (!response.ok && response.status >= 400) {
      console.error('GHL webhook error:', response.status, responseText);
      return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
    }

    return NextResponse.json({ success: true, ghlResponse: responseText });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
