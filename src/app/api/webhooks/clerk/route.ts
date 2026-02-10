import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import db from '@/db';
import { UserTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);
    const eventType = event.type;

    switch (eventType) {
      case 'user.created': {
        const email = event.data.email_addresses.find(
          (e) => e.id === event.data.primary_email_address_id,
        )?.email_address;

        if (!email) {
          return NextResponse.json(
            { message: 'Email Not Found' },
            { status: 400 },
          );
        }

        await db
          .insert(UserTable)
          .values({
            clerkUserId: event.data.id,
            name: `${event.data.first_name} ${event.data.last_name}`,
            email,
            imageUrl: event.data.image_url as string,
          })
          .onConflictDoNothing({ target: UserTable.clerkUserId });

        break;
      }

      case 'user.updated': {
        const email = event.data.email_addresses.find(
          (e) => e.id === event.data.primary_email_address_id,
        )?.email_address;

        if (!email) {
          return NextResponse.json(
            { message: 'Email Not Found' },
            { status: 400 },
          );
        }
        await db
          .update(UserTable)
          .set({
            name: `${event.data.first_name} ${event.data.last_name}`,
            email,
            imageUrl: event.data.image_url as string,
          })
          .where(eq(UserTable.clerkUserId, event.data.id));

        break;
      }

      case 'user.deleted': {
        if (event.data.id != null) {
          await db
            .update(UserTable)
            .set({
              isActive: false,
            })
            .where(eq(UserTable.clerkUserId, event.data.id));
        }
      }
    }

    return NextResponse.json({ message: 'Webhook Received' }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: 'Error verifying webhook' },
      { status: 200 },
    );
  }
}
