import dbConnect from '@/lib/dbConnect';
import Pilot from '@/models/Pilot';

export async function GET() {
    await dbConnect();

    const pilots = await Pilot.find();

    return Response.json(pilots);
}

export const revalidate = 600;
