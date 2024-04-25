import dbConnect from '@/lib/dbConnect';
import Pilot from '@/models/Pilot';

export async function GET() {
    await dbConnect();

    const pilots = await Pilot.find({});

    return Response.json(pilots);
}

export async function POST(request: Request) {
    await dbConnect();

    const body = await request.json();

    const newPilot = await Pilot.create(body);

    return Response.json(newPilot);
}
