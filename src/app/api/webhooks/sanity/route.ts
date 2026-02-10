import { env } from '@/lib/env/server';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type webhookPayload = {
  _id: string;
  name: string;
  pricePerDay: string;
  slug: string;
};

export async function POST(req: NextRequest) {
  try {
    const operation = req.headers.get('sanity-operation');

    if (env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json(
        { message: 'Missing SANITY WEBHOOK SECRET' },
        { status: 400 },
      );
    }

    const { isValidSignature, body } = await parseBody<webhookPayload>(
      req,
      env.SANITY_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid Signature' },
        { status: 400 },
      );
    }

    if (!body || !body._id) {
      return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
    }
  } catch (error) {}
}
