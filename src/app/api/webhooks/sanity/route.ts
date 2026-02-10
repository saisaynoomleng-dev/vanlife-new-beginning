import { env } from '@/lib/env/server';
import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import db from '@/db';
import { VanTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

type webhookPayload = {
  _id: string;
  name: string;
  pricePerDay: string;
  slug: {
    current: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const operation = req.headers.get('sanity-operation');

    if (!env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json(
        { message: 'Server Configuration Error' },
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<webhookPayload>(
      req,
      env.SANITY_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid Signature' },
        { status: 401 },
      );
    }

    if (!body?._id) {
      return NextResponse.json({ message: 'Bad Request' }, { status: 400 });
    }

    if (operation === 'delete') {
      await db
        .update(VanTable)
        .set({
          isDeleted: true,
        })
        .where(eq(VanTable.sanityId, body._id));

      return NextResponse.json({ message: 'Van marked deleted' });
    }

    await db
      .insert(VanTable)
      .values({
        name: body.name,
        sanityId: body._id,
        sanitySlug: body.slug.current,
        pricePerDayInCents: Math.round(Number(body.pricePerDay) * 100),
      })
      .onConflictDoUpdate({
        target: VanTable.sanityId,
        set: {
          name: body.name,
          sanitySlug: body.slug.current,
          pricePerDayInCents: Math.round(Number(body.pricePerDay) * 100),
        },
      });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ message: 'Internal Error' }, { status: 500 });
  }
}
