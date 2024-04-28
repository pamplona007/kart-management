import dbConnect from '@/lib/dbConnect';
import Pilot from '@/models/Pilot';

export async function GET() {
    await dbConnect();

    const pilots = await Pilot.find({
        rating: { $gte: 1 },
        confirmed: true,
    });

    return Response.json(pilots);
}

export async function POST(request: Request) {
    await dbConnect();

    const body = await request.json();

    try {
        const newPilot = await Pilot.create(body);

        return Response.json(newPilot);
    } catch (error) {
        return Response.json(error, { status: 400 });
    }
}
