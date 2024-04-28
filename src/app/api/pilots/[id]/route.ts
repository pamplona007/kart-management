import dbConnect from '@/lib/dbConnect';
import Pilot from '@/models/Pilot';

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    await dbConnect();

    const pilot = await Pilot.findById(params.id);

    return Response.json(pilot);
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } },
) {
    await dbConnect();

    const body = await request.json();

    const pilot = await Pilot.findByIdAndUpdate(
        params.id,
        body,
    );

    return Response.json(pilot);
}
