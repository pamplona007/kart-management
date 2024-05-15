import dbConnect from '@/lib/dbConnect';
import Pilot, { IPilot } from '@/models/Pilot';

export async function GET() {
    await dbConnect();

    const pilots = await Pilot.find(
        {
            rating: { $gte: 1 },
            confirmed: true,
        },
        'firstName lastName nickName age rating',
    );

    return Response.json(pilots);
}

export async function POST(request: Request) {
    await dbConnect();

    const body: IPilot = await request.json();

    try {
        const newPilot = await Pilot.create({
            firstName: body.firstName.trim(),
            lastName: body.lastName.trim(),
            nickName: body.nickName.trim(),
            age: body.age,
            rating: body.rating,
            confirmed: false,
            paidAmount: 0,
        });

        return Response.json(newPilot);
    } catch (error) {
        return Response.json(error, { status: 400 });
    }
}
